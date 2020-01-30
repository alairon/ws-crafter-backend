/* eslint no-console: 0 */

function openConnection(connection) {
  connection.connect((err) => {
    if (err) console.error(err.errno);
  });
}

function closeConnection(connection) {
  connection.end((err) => {
    if (err) console.error(err.sqlMessage);
    return (0);
  });
}

exports.openConnection = openConnection;
exports.closeConnection = closeConnection;
