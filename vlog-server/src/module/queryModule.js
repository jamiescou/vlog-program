const query = require('../middleware/mysql')
const insertTag = function( value ) {
  let _sql = "insert into youhui set title=?, description=?, link=?, hours=?, startTime=?, endTime=?, activityStatus=?, tagName=?, tagImg=?, userId=?, type=?, videoUrl=?;"
  return query( _sql, value )
}
const updateTag = function( value ) {
  let _sql = `update youhui set title=?,description=?,link=?, hours=?,startTime=?,endTime=?,activityStatus=?,tagName=?,tagImg=?,userId=?,type=?,videoUrl=? where id=?`
  return query( _sql, value )
}
const findTag = function( value ) {
  let _sql = `SELECT * FROM youhui WHERE id = '${value}'`
  return query( _sql )
}
const tagList = (val) => { // 获取列表
  let _sql = `SELECT * FROM youhui ORDER BY startTime DESC`
  return query(_sql)
}
const findAllTag = function( value ) {
  console.log('value', value)
  const _sql = `SELECT * FROM youhui WHERE type = '${value.type}' or description like '%${value.search}%'`;
  return query( _sql )
}
const deteleTag = function( value ) {
  let _sql = `DELETE FROM youhui WHERE id = '${value}'`
  return query( _sql )
}
const deteleAllTag = function( value ) {
  let _sql = `DELETE FROM youhui`
  return query( _sql, value )
}
module.exports = {
  insertTag,
  updateTag,
  tagList,
  findTag,
  findAllTag,
  deteleTag,
  deteleAllTag
}