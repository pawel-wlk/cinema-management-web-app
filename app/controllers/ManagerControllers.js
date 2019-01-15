const mariadb = require('mariadb');

const credentials = {
  host:'database',
  user: 'manager',
  password: 'managerpassword',
  database: 'cinemas'
};

async function filmsOnDay(day, cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select film.title, display.start_time from display join film on display.film=film.id join room on display.room=room.id where date(display.start_time)=? and room.cinema = ?";
  const result =  await connection.query(query, [day, cinema]);
  connection.end();
  return result;
}

async function allDisplaysOfFilm(film, cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select start_time from display join room on display.room=room.id join film on display.film=film.id where room.cinema=? and film.title=?"; 
  const result =  await connection.query(query, [cinema, film]);
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

async function addDisplay(film, room, start_time){
  const connection = await mariadb.createConnection(credentials);
  const query = "insert into display (film, room, start_time) values ((select film.id from film where film.title=?), ?, ?)"; 
  await connection.query(query, [film, room, start_time]);
  connection.end();
}

async function updateDisplay(id, room, start_time){
  const connection = await mariadb.createConnection(credentials);
  const query = "update display set room=? and start_time=? where id=?"; 
  await connection.query(query, [room, start_time, id]);
  connection.end();
}

async function deleteRoom (room) {
  const connection = await mariadb.createConnection(credentials);
  const query = "delete from room where id=?";
  const result = await connection.query(query, [room]);
  connection.end();
  return result;
}	
async function addRoom (row_num, column_num, cinema) {
  const connection = await mariadb.createConnection(credentials);
  const query = "insert into room (rows_number, column_number, cinema) values (?, ?, ?)";
  await connection.query(query, [row_num, column_num, cinema]);
  connection.end();
}	

// session: req.session
// return boolean according to success status of logging in (to render proper view)
async function login(email, password, session) {
  const connection = await mariadb.createConnection(credentials);
  const query = "select pasword from manager where email=?"
  const hashPassword = await connection.query(query, [email]);
  connection.end();

  const match = await bcrypt.compare(password, hashPassword);

  if (match) {
    session.user = email;
  }
  return match;
}

module.exports = {filmsOnDay, allDisplaysOfFilm, allDisplays, addDisplay, updateDisplay, deleteRoom, addRoom, login};
