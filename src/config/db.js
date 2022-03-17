const mysql = require("mysql")
const conn = mysql.createPool({
    database: 'notes',
    user: 'root',
    host: 'localhost',
    password: '',
})

module.exports = conn