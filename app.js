const express = require ("express");
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection ({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

app.set('view engine', 'hbs');

db.connect ((error) => {
    if (error){
        console.log(error)
    }else {
        console.log("Mysql connected")
    }
})

app.get ('/', (req, res) => {
    res.send("<h1> Home page</h>")
});

app.listen(5001, () => {
    console.log("server started on port 5001");
});