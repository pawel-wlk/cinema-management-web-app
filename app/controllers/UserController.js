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

module.exports = {test, filmsOnDay, allDisplaysOfFilm};
