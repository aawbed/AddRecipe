let mysql = require('mysql');
let con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "your_password"
    }
);

con.connect(function(err){
    if (err) {throw err}
    console.log("Connected");
    con.query("CREATE DATABASE addrecipe", function(err, result){
        if (err) {throw err;}
        console.log("Database Created");
    })
});