const mariadb = require('mariadb');

const credentials = {
  host:'database',
  user: 'manager',
  password: 'managerpassword',
  database: 'cinemas'
};

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

async function allDisplays(cinema) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "select id, film.title, start_time from display join room on display.room=room.id join film on display.film=film.id where room.cinema="+cinema; 
  const result =  await connection.query(query);
  connection.end();
  return result;
}

async function addDisplay(film, room, start_time){
	const connection = await mariadb.createConnection(credentials);
  const query = "insert into display (film, room, start_time) values ((select film.id from film where film.title="+film
	+"), " + room + "," + start_time+")"; 
  const result =  await connection.query(query);
  connection.end();
  return result;
}

async function updateDisplay(id, room, start_time){
  const connection = await mariadb.createConnection(credentials);
  const query = "update display set room = " + room +" and start_time="+start_time+"where id="+id; 
  const result =  await connection.query(query);
  connection.end();
  return result;
}

async function deleteRoom (room) {
  const connection = await.mariadb.createConnection(credentials);
  const query = "delete from room where id="+room;
  const result = await.connection.query(query);
  connection.end();
  return result;
}	
async function addRoom (row_num, column_num,cinema) {
  const connection = await.mariadb.createConnection(credentials);
  const query = "insert into room (rows_number, column_number, cinema) values ("+row_num + "," + column_num + "," + cinema + ")";
  const result = await.connection.query(query);
  connection.end();
  return result;
}	

module.exports = {filmsOnDay, allDisplaysOfFilm, allDisplays, addDisplay, updateDisplay, deleteRoom, addRoom};
