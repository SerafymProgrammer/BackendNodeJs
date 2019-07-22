
// const http = require("http");
// http.createServer(function(request,response){
     
//     response.end("Hello NodeJS!");
     
// }).listen(3000, "127.0.0.1",function(){
//     console.log("Сервер начал прослушивание запросов на порту 3000");
// });

// let a;
// const mysql = require("mysql2");
  
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "user-schema",
//   password: "MySQLSerafym19"
// });

// connection.connect(function(err){
//     if (err) {
//       return console.error("Ошибка: " + err.message);
//     }
//     else{
//       console.log("Подключение к серверу MySQL успешно установлено");
//     }
//  });

//  connection.query("SELECT * FROM user",
//   function(err, results, fields) {
//     console.log(err);
//     console.log(results); // собственно данные
//     console.log(fields); // мета-данные полей 
//     a = results; 
// });


// console.log(a);


// const user = ["Tom@s.s", "dfgsds", "iii"];
// const sql = "INSERT INTO user(userEmail, userPassword, Usercol) VALUES(?, ?, ?)";


 
// connection.query(sql, user, function(err, results) {
//     if(err) console.log(err);
//     else console.log("Данные добавлены");
// });
 

// const sqldd = "SELECT * FROM user";
// connection.query(sqldd,  function(err, results) {
//     if(err) console.log(err);
//     const users = results;
    
//       console.log(users);
    
// });
// connection.end();