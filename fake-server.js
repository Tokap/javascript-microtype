const R                  = require('ramda')
const express            = require('express')
const app                = express()
// const ZmqRequest         = require('./zmq-req.js')
const PriceChange        = require('./Seneca/Promises/advanced.js')

const PORT = 4000

let products = [
  {name: 'Product A', price: 9.99},
  {name: 'Product B', price: 23.99},
  {name: 'Product C', price: 10.00},
  {name: 'Product D', price: 100.99},
  {name: 'Product E', price: 0.99}
];


app.get('/', function (req, res) {
  PriceChange.convertPrices(products)
  .then( (results) => res.send(results) )
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
