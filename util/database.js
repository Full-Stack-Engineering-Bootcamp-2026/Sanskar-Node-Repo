const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    database: 'node_schema',
    password: 'Admin@1234'
});

module.exports = pool.promise();