'use strict';
const
  zmq = require('zmq'),
  publisher = zmq.socket('pub');

const FIVE_SECONDS = 5000
const TEN_SECONDS  = 10000


const message = {
  uuid: 1234567890
, user_id: 1
, callback_tcp: 5501
}

const msg = JSON.stringify(message)

// --------------------------------------------------------------------------
// The Process
// --------------------------------------------------------------------------

const emit_message = (msg_string) => {
  console.log('Emitting Information')
  publisher.send(msg_string); //msg could have a topic to be more general
}

// Fire message every 10 seconds
const startPublishing = setInterval( emit_message, TEN_SECONDS, msg );

// Listen on TCP port 5500.
publisher.bind('tcp://*:5500', (err) => {
  console.log('Listening for zmq subscribers...');
});

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// REQ-REP: RESPONDER -> Receives Confirmation (req) Publish has been handled
//                    -> Terminates Publishing Interval & Responds with Conf.
// --------------------------------------------------------------------------
const responder   = zmq.socket('rep');
const tcp_address = 'tcp://127.0.0.1:5501'

// When we receive a message (Req):
responder.on('message', (data) => {
  let request = JSON.parse(data);
  console.log(`Fine. Ill stop yelling about: ${request.user_id}`);

  clearInterval(startPublishing) //should use uuid to determine process name

  const reply_obj = {
    process_terminated: true
  , killed_at: Date.now()
  }
  responder.send( JSON.stringify(reply_obj) );
});

// Listen on TCP port 5501.
responder.bind(tcp_address, (err) => {
  console.log('Listening for zmq requesters...');
});
