const { myDb }   = require('../Mysql/core.js')
const R          = require('ramda')

const QUERY_STRING = "INSERT INTO `network_data_archive`\
                      (network, version, archive_id, type_id) VALUES (?,?,?,?)"

const insertData = R.curry( (network, version, archive_id, type_id) =>
  myDb.queryAsync(QUERY_STRING, [network, version, archive_id, type_id])
)

module.exports = {
  insertData : insertData
}
