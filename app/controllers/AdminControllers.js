const mariadb = require('mariadb');

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



// session: req.session
// return boolean according to success status of logging in (to render proper view)
async function login(email, password, session) {
  const connection = await mariadb.createConnection(credentials);
  const query = "select pasword from admin where email=?"
  const hashPassword = await connection.query(query, [email]);
  connection.end();

  const match = await bcrypt.compare(password, hashPassword);

  if (match) {
    session.user = email;
  }
  return match;
}


module.exports = {addFilm, allDisplays, addCinema, updateCinema, deleteCinema, login};
