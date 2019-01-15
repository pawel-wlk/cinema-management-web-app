const mariadb = require('mariadb');

const credentials = {
  host:'database',
  user: 'client',
  password: 'clientpassword',
  database: 'cinemas'
};

// can throw exception
async function test() {
  const connection = await mariadb.createConnection(credentials);
  const result =  await connection.query("select now()");
  connection.end();
  return result;
}

async function filmsOnDay(day, cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select film.title, display.start_time from display join film on display.film=film.id join room on display.room=room.id where date(display.start_time)="+day+" and room.cinema = " + cinema;
  const result =  await connection.query("");
  connection.end();
  return result;
}

async function allDisplaysOfFilm(film, cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select start_time from display join room on display.room=room.id join film on display.film=film.id where room.cinema="+cinema+" and film.title=" + film; 
  const result =  await connection.query(query);
  connection.end();
  return result;
}

//inserty coś zwracają?
async function newClient(email, password){
  const connection = await mariadb.createConnection(credentials);
	const hashPasword = bcrypt.hashSync(password, 10);
	const query = "insert into client (email, password) values ( " + email + ", " + hashPasword + ")";
	const result = await connection.query(query);
	connection.end();
	return result;
}

async function addCredits (email, credits) {
  const connection = await mariadb.createConnection(credentials);
  const query = "update client set credits = (credits + " + credits + ") where email = " + email;
  const result = await connection.query(query);
  connection.end();
  return result;
}	

async function myReservations (email) {
	const connection = await mariadb.createConnection(credentials);
	const query = "select film.title, display.start_time, reservation.seat_row, reservation.seat_column from display
		join film on display.film=film.id join reservation on reservation.display=display.id join mass_reservation on
		mass_reservation.id=reservation.mass_reservation where mass_reservation.client = " + email;
	const result = await connection.query(query);
	connection.end();
	return result;
}

module.exports = {test, filmsOnDay, allDisplaysOfFilm, newClient, addCredits, myReservations};
