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

module.exports = {test};
