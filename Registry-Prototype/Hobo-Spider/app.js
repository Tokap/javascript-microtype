const R                  = require('ramda')
const express            = require('express')
const bodyParser         = require('body-parser');
const app                = express()
const { myDb }           = require('../Mysql/core.js')
const { insertData }     = require('./queries.js')

const PORT = 3000


// -------------------------------------------------------------
// -------- Helper Functions
// -------------------------------------------------------------

const getService = R.pathOr("Nothing", ['body', 'service'])
const getAddress = R.pathOr("Nothing", ['body', 'address'])
const getPort    = R.pathOr("Nothing", ['body', 'port'])

// -------------------------------------------------------------
// -------- The Application Itself
// -------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/add-service', (req, res) => {

  const service_name = getService(req)
  const address      = getAddress(req)
  const port         = getPort(req)

  console.log("FULL BODY: ", req.body)
  console.log("SERVICE: ", getService(req))
  console.log("ADDRESS: ", getAddress(req))
  console.log("PORT: ",    getPort(req))

  //save details
  insertData(service_name, address, port)

  res.send("Service has been registered with the Hobo Spider. Thanks!")
})

const startServer = () => {
  console.log(`Hobo Spider Listening on Port: ${PORT}`)
  app.listen(PORT)
}

startServer();
