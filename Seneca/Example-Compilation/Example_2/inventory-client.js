var seneca = require('seneca')();

seneca.client();

seneca.act(
  {
    role:'inventory'
  , cmd:'create_item'
  , name:'apple'
  },
  function(err, item) {
    console.log(item);
  }
  // ...
)
