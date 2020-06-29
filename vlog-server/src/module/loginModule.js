const query = require('../middleware/mysql')

const findUser = (val) => { // 查找所有User
  let _sql = `SELECT * FROM user WHERE usename = '${val}'`
  return query(_sql)
}
const findAllUser = (val) => { // 查找所有User
  let _sql = `SELECT * FROM user`
  return query(_sql)
}
const deteleAdmin = function( value ) {
  let _sql = `DELETE FROM user WHERE id = '${value}'`
  return query( _sql )
}

const insertAdmin = function( value ) {
  let _sql = "insert into user set usename=?, password=?;"
  return query( _sql, value )
}
const updateAdmin = function( value ) {
  let _sql = "update user set usename=?, password=? where id=?"
  return query( _sql, value )
}


module.exports = {
  findUser,
  findAllUser,
  insertAdmin,
  deteleAdmin,
  updateAdmin
}