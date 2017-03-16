const { myDb }   = require('../Mysql/core.js')
const R          = require('ramda')

const QUERY_STRING = "INSERT INTO `hobo_spider_registrations`\
                      (service_name, address, port, active) VALUES (?,?,?,?)"

const insertData = R.curry( (name, address, port) =>
  myDb.queryAsync(QUERY_STRING, [name, address, port, 1])
)

module.exports = {
  insertData : insertData
}
