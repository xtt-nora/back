const mysql = require('mysql')

const db = mysql.createPool({
	host:"localhost",
	user:"root",
	password:"7307velo@",
	database:"back"
})
module.exports = db