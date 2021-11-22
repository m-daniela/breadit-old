const mysql = require("mysql");

// connect to the database

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


const connectToDB = async () => {
    connection.connect((err) => {
        if (err) throw(err);
        else console.log("DB connection successful");
    })
}


module.exports = {
    connection,
    connectToDB
}