'use strict';
const
  zmq = require('zmq'),
  subscriber = zmq.socket('sub');

// Subscribe to all messages - can be narrowed
subscriber.subscribe('');


// When we see a message from the publisher:
subscriber.on('message', (data) => {
  let msg = JSON.parse(data);
  console.log(`Got it! -> Not Really Fetching Data for: \nUser: ${msg.user_id} with UUID: ${msg.uuid}`)
  // Real process should update DB with an inprogress flag to prevent duplicates
  connectAndRequestKill(1, msg.callback_tcp);
});


// Connect to publisher.
const connectToPublisher = (port) => {
  subscriber.connect(`tcp://localhost:${port}`);
}

connectToPublisher(5500);

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// REQ-REP: REQUESTER -> Requests confirmation Publishing has been killed
// --------------------------------------------------------------------------
const requester   = zmq.socket('req');
const tcp_address = (port) => `tcp://localhost:${port}`


const connectAndRequestKill = (id, tcp) => {
  console.log('Sending request to kill publishing interval');

  requester.connect( tcp_address(tcp) );
  requester.send(JSON.stringify({
    save_completed: true
  , user_id: id
  }));
}

/* We receive confirmation Response that Publish Req has concluded: */
requester.on("message", (data) => {
  let response = JSON.parse(data);
  console.log("Termination Details (Response): ", response);
});
