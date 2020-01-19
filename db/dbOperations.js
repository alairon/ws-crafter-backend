function openConnection(connection) {
  connection.connect((err) => {
    if (err) return (err.errno);
    return (0);
  });
}

function closeConnection(connection) {
  connection.end((err) => {
    if (err) return (err.errno);
    return (0);
  });
}

exports.openConnection = openConnection;
exports.closeConnection = closeConnection;
