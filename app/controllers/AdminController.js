const mariadb = require('mariadb');
const bcrypt = require('bcrypt');
const { exec } = require('child_process');
const fs = require('fs');

const credentials = {
  host:'database',
  user: 'admin',
  password: 'adminpassword',
  database: 'cinemas'
};

async function addFilm(title, duration, category, genre) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "insert into film (title, duration, category, genre) values (?, ?, ?, ?)"
  const result =  await connection.query(query, [title, duration, category, genre]);
  connection.end();
  return result;
}

async function allDisplays(cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select id, film.title, start_time from display join room on display.room=room.id join film on display.film=film.id where room.cinema=?"; 
  const result =  await connection.query(query, [cinema]);
  connection.end();
  return result;
}

async function addCinema(cinema, address) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "insert into cinema (name, address) values(?, ?)";
  const result =  await connection.query(query, [cinema, adress]);
  connection.end();
  return result;
}

async function updateCinema(oldName, newName) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "update cinema set name=? where name=?";
  await connection.query(query, [newName, oldName]);
  connection.end();
}

async function deleteCinema(name) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "delete from cinema where name=?";
  await connection.query(query, [name]);
  return result;
}

async function registerNewAdmin(email, password){
  const connection = await mariadb.createConnection(credentials);
  const hashPassword = await bcrypt.hash(password, 10);
  const query = "insert into admin (email, password) values (?, ?)";
  await connection.query(query, [email, hashPassword]);
  connection.end();
}

async function registerNewManager(email, password){
  const connection = await mariadb.createConnection(credentials);
  const hashPassword = await bcrypt.hash(password, 10);
  const query = "insert into manager (email, password) values (?, ?)";
  await connection.query(query, [email, hashPassword]);
  connection.end();
}

async function changePassword(email, oldPassword, newPassword) {
  const newPasswordHash = bcrypt.hash(newPassword, 10);
  const connection = await mariadb.createConnection(credentials);
  let query = "select password from admin where email=?"
  const hashPassword = await connection.query(query, [email]);

  const match = await bcrypt.compare(oldPassword, hashPassword);

  if (match) {
    query = "update admin set password=? where email=?";
    await connection.query(query, [await newPasswordHash, email]);
  }

  connection.end();
}
  

// session: req.session
async function login(session, email, password) {
  const connection = await mariadb.createConnection(credentials);
  const query = "select password from admin where email=?"
  const hashPassword = await connection.query(query, [email]);
  connection.end();

  const match = await bcrypt.compare(password, hashPassword[0].password);

  if (match) {
    session.email = email;
  }
  else {
    throw "Wrong credentials";
  }
  return session;
}

function makeBackup() {
  const date = new Date();
  exec(`mysqldump -u admin -padminpassword -h database cinemas `, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    fs.writeFile(`/backups/${date.getTime()}`, stdout, (err) => {
      if (err) throw err;
    });

  });
}

function loadBackup(backupName) {
  exec(`mysql -u admin -padminpassword -h database < /backups/${backupName}`,
    (err, stdout, stderr) => {
    if (err) throw err;
  });
}

function getBackupNames() {
  const result = fs.readdirSync('/backups') || [];
  console.log(result);
  return result;
}


module.exports = {addFilm, allDisplays, addCinema, updateCinema, deleteCinema, login, registerNewAdmin, registerNewManager, changePassword,makeBackup, loadBackup, getBackupNames};
