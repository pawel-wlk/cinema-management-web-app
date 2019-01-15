const mariadb = require('mariadb');

const credentials = {
  host:'database',
  user: 'admin',
  password: 'adminpassword',
  database: 'cinemas'
};

async function addFilm(title, duration, category, genre) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "insert into film (title, duration, category, genre) values ("+title+","+duration+","+category+","+genre+")"
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

async function addCinema(cinema, address) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "insert into cinema (name, address) values("+cinema+","+address+")";
  const result =  await connection.query(query);
  connection.end();
  return result;
}

async function updateCinema(oldName, newName) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "update cinema set name="+newName +"where name="+oldName;
  const result =  await connection.query(query);
  connection.end();
  return result;
}

async function deleteCinema(name) {	
  const connection = await mariadb.createConnection(credentials);
  const query = "delete from cinema where name="+name;
  const result =  await connection.query(query);
  connection.end();
  return result;
}

module.exports = {addFilm, allDisplays, addCinema, updateCinema, deleteCinema};