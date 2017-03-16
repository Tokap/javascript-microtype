const R          = require('ramda')
const Http       = require('request')
const Bluebird   = require('bluebird')

const createRegDetails = (name, address, port) => JSON.stringify({
  service : name
, address : address
, port    : port
})

const createHeader = (body_json) => {
  return {
    url: 'http://localhost:3000/add-service'
  , method: 'POST'
  , body: body_json
  , headers: {'content-type' : 'application/json'}
  }
}

const makeFullHeader = (name, address, port) =>
  createHeader( createRegDetails(name, address, port) )

const postWithHeader = (name, address, port) => {
  const header = makeFullHeader(name, address, port)
  return promisePost( header )
}

const promiseGet = Bluebird.promisify(Http.get)
const promisePost = Bluebird.promisify(Http.post)

// const my_header = makeFullHeader("trial-name", "localhost", 3030)
//
// promisePost( my_header )
// .then( (results) => console.log("HTTP REPLY: ", results.body) )
// .catch( (err) => console.error(err) )

module.exports = {
  postWithHeader : postWithHeader
}
