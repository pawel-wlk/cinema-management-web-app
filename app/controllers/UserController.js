const mariadb = require('mariadb');
const bcrypt = require('bcrypt');

const credentials = {
  host:'database',
  user: 'client',
  password: 'clientpassword',
  database: 'cinemas'
};

async function filmsOnDay(day, cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select film.title, display.start_time from display join film on display.film=film.id join room on display.room=room.id where date(display.start_time)=? and room.cinema=?" ;
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

// session: req.session
async function registerNewClient(session, email, password){
  const connection = await mariadb.createConnection(credentials);
  const hashPassword = await bcrypt.hash(password, 10);
  const query = "insert into client (email, password) values (?, ?)";
  await connection.query(query, [email, hashPassword]);
  connection.end();
  session.user = email;
  return session;
}

// session: req.session
async function login(email, password, session) {
  const connection = await mariadb.createConnection(credentials);
  const query = "select pasword from client where email=?"
  const hashPassword = await connection.query(query, [email]);
  connection.end();

  const match = await bcrypt.compare(password, hashPassword);

  if (match) {
    session.user = email;
  }
  return session;
}

async function addCredits (email, credits) {
  const connection = await mariadb.createConnection(credentials);
  const query = "update client set credits = (credits + ?) where email=?";
  await connection.query(query, [credits, email]);
  connection.end();
}	

async function myReservations (email) {
	const connection = await mariadb.createConnection(credentials);
	const query = `select film.title, display.start_time, reservation.seat_row, reservation.seat_column from display
		join film on display.film=film.id join reservation on reservation.display=display.id join mass_reservation on
		mass_reservation.id=reservation.mass_reservation where mass_reservation.client =?`;
	const result = await connection.query(query, [email]);
	connection.end();
	return result;
}

async function changePassword(email, oldPassword, newPassword) {
  const newPasswordHash = bcrypt.hash(newPassword, 10);
  const connection = await mariadb.createConnection(credentials);
  let query = "select client from manager where email=?"
  const hashPassword = await connection.query(query, [email]);

  const match = await bcrypt.compare(oldPassword, hashPassword);

  if (match) {
    query = "update client set password=? where email=?";
    await connection.query(query, [await newPasswordHash, email]);
  }

  connection.end();
}

async function getCreditsAmount(email) {
  const connection = await mariadb.createConnection(credentials);
  const query = "select credits from client where email=?";
  const result = await connection.query(query, [email]);
  connection.end();

  return result;
}
  

module.exports = {test, filmsOnDay, allDisplaysOfFilm, newClient, addCredits, myReservations, login, changePassword, getCreditsAmount};
