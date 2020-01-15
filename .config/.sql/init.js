const mysql = reqire(mysql);
const mysqlConfig = require(credentials.json);
const mysqlConnection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password
});

const init = () => {
  mysqlConnection.connect((error) => {
    if (err) {
      console.error(`Error: ${err.stack}`);
      return;
    }
  });
};