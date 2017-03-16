const R                  = require('ramda')
const express            = require('express')
const bodyParser         = require('body-parser');
const app                = express()
const Connect            = require('../Http/register.js')
const Query              = require('./queries.js')

const NAME    = 'MySQL-API'
const PORT    = 5000
const ADDRESS = "localhost"
const PATH    = "/insert/mysql"

// -------------------------------------------------------------
// -------- Helper Alias
// -------------------------------------------------------------
const _log = console.log
const _exit = process.exit

// -------------------------------------------------------------
// -------- The Application Itself
// -------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/insert/mysql', (req, res) => {
  Query.insertData(network, version, archive_id, type_id)
  .then( (confirmation) => res.send(confirmation.body) )
  .catch( (err) => res.send('ERROR: ' + err))
})

const startServer = () => {
  _log(`MySQL Listening on Port: ${PORT}`)

  // Fire off registration process here
  Connect.postWithHeader( NAME, ADDRESS, PORT )
  .then( (results) => {
    _log(results.body);
    app.listen(PORT);
  })
  .catch( (err) => {
    console.error(err)
    _exit(0)
  })


}

startServer();
