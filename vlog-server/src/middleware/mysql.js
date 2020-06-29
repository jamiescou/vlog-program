var mysql = require('mysql');
const config = require('../../config')
var pool  = mysql.createPool(config.mysqlCfg);
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            console.log('数据库池链接有效')
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}
module.exports = query
