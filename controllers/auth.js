const mysql = require("mysql"); 
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection ({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});



//register
exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async  (error, results) => {
        if (error){
            console.log(error);
        }

        if ( results.length > 0 ){
            return res.render('register', {
                message: 'Email telah siap digunakan'
            })
        }else if (password !== passwordConfirm){
            return res.render('register', {
                message: 'Password tidak cocok'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword,  }, (error, results) => {
            if (error){
                console.log(error);
            } else {
                return res.render('register', {
                    message: 'Berhasil daftar'
                });
            }
        })
    });
}

//login
exports.login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (error, results, fields ) => {

        if (error){
            console.log(error);
        }

        if (results.length > 0){
            res.render("/dashboard");
            
        } else if (password != password) {
            return res.render('login', {
                message: 'Password atau email anda salah'
            });
        }
        res.end();
    })
}


// //login
// app.post("/",encoder, function(req, res){
//     var email = req.body.email;
//     var password = req.body.password;

//     connection.query("SELECT * FROM user WHERE email = ? AND password = ?", [username, password], function (error, results, fields ){
//         if (results.length > 0){
//             res.redirect("/dashboard");
//         } else {
//             res.redirect("/");
//         }

//         res.end();
//     })
// })

// //when login success
 
// app.get("/dashboard", function(req, res){
//     res.sendFile(__dirname + "/dashboard.hbs");
// })



 
