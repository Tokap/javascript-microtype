const mysql      = require('mysql');
const Bluebird   = require('Bluebird')

let connection = mysql.createPool({
  host     : '127.0.0.1'
, user     : 'root'
, password : ''
, port     : 3306
, database : "ip_brolytics"
});

const myDb = Bluebird.promisifyAll(connection)


const QUERY_STRING = "SELECT * FROM type"

// connection.query(QUERY_STRING, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
//   return;
// });

// myDb.queryAsync(QUERY_STRING)
// .then( (rez) => console.log('A proper Response: ', rez) )
// .catch( (err) => console.error('Failure: ', err) )

module.exports = {
  myDb : myDb
}
