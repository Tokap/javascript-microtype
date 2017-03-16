const { myDb }   = require('../Mysql/core.js')

const CREATE_HOBO_SPIDER_TABLE = "CREATE TABLE IF NOT EXISTS `hobo_spider_registrations` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `service_name` varchar(140) NOT NULL,\
  `address` varchar(140) NOT NULL,\
  `port` varchar(140) NOT NULL,\
  `active` int(1) NOT NULL,\
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4; "


myDb.queryAsync(CREATE_HOBO_SPIDER_TABLE)
.then( (rez)  => console.log('A proper Response: ', rez) )
.then( ()     => process.exit(0) )
.catch( (err) => console.error('Failure: ', err) )
