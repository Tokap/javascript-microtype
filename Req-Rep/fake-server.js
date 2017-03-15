const R                  = require('ramda')
const express            = require('express')
const app                = express()
const ZmqRequest         = require('./zmq-req.js')

const PORT = 3000

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/testrun/:id', function (req, res) {
  const id = req.params.id
  ZmqRequest.connectAndRequest(id)
  res.send(`Processing Request for id: ${id}. Check 0MQ Terminal for details.`)
})

const startServer = () => {
  console.log("Listening on Port: " + PORT)
  app.listen(PORT)
}

startServer();
