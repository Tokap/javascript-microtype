'use strict';
const
  zmq = require('zmq'),
  requester = zmq.socket('req');

requester.on("message", function(data) {
  let response = JSON.parse(data);
  console.log("Response: ", response);
});

const connectAndRequest = (id) => {
  requester.connect("tcp://localhost:5433"); // Could be variable based on type
  requester.send(JSON.stringify({
    user_id: id
  }));
}

module.exports = {
  connectAndRequest: connectAndRequest
}
