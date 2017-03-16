const R                  = require('ramda')
const express            = require('express')
const bodyParser         = require('body-parser');
const app                = express()
const Connect            = require('../Http/register.js')

const NAME    = 'Initialization-API'
const PORT    = 4000
const ADDRESS = "localhost"
const PATH    = "/social-account/:id"

// -------------------------------------------------------------
// -------- The Application Itself
// -------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/social-account/:id', (req, res) => {
  const id = req.param('id', 0);

  res.send('Hello World ' + id)
})

const startServer = () => {
  console.log(`REST API Listening on Port: ${PORT}`)

  // Fire off registration process here
  Connect.postWithHeader(NAME, ADDRESS, PORT)
  .then( (results) => console.log(results.body) )

  app.listen(PORT)
}

startServer();
