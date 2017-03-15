var seneca = require('seneca')()

seneca.add({cmd: 'salestax'}, function (msg, done) {
  var rate  = 0.23
  var total = msg.net * (1 + rate)
  done(null, {total: total})
})

seneca.act({cmd: 'salestax', net: 100}, function (err, result) {
  console.log(result.total)
})

//  -------- More Complex Version ------------
seneca.add({cmd: 'config'}, function (msg, done) {
  var config = {rate: 0.23}
  var value = config[msg.prop]
  done(null, {value: value})
})

seneca.add({cmd: 'salestax'}, function (msg, done) {
  seneca.act({cmd: 'config', prop: 'rate'}, function (err, result) {
    var rate  = parseFloat(result.value)
    var total = msg.net * (1 + rate)
    done(null, {total: total})
  })
})

seneca.act({cmd: 'salestax', net: 100}, function (err, result) {
  console.log(result.total)
})

//  -------- Varying Ways to Make a Call ------------
seneca.act('cmd:salestax,net:100', function (err, result) {
  console.log(result.total)
})

// &&

seneca.act('cmd:salestax', {net: 100}, function (err, result) {
  console.log(result.total)
})
