const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const db = require('./models/index');
const cors = require("cors");
const path = require("path")

//Router
// const apiRouter = require('./services/router.js');

// // parse application/json
// app.use(bodyParser.json());
// //parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// // parse application/json
// app.use(bodyParser.json());
// //parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());

app.use(express.static(path.join(__dirname, '/../webapp/build/')));

app.use('/api', apiRouter);


// add a basic route
// start the app
// app.get('/', function (req, res) {
//   res.json({ message: 'Express is up!' });
// });

// serve static files from the `public` folder
// app.use(express.static(__dirname + '/public'));


// app.use('*', express.static(path.join(__dirname + '/../webapp/build')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '/../webapp/build/index.html'));
});

console.log("Hihi",path.join(__dirname, '/../webapp/build'));

// const models=require("./models");

db.sequelize.sync({ force: true }).then(function () {
  console.log("Database is connected");
  // const createUser = async ({ name, password }) => { 
  //     return await User.create({ name, password });
  //   };
  //   createUser("hi","hoho");
  //console.log(db.user);

  //db.user.create({
   // username: "maytinhdibo",
  //   password: "12456"
  //  });

  //  db.user.findAll( {
  //    limit: 10,
  //    where: {
  //      //name :{$like: `%hat`} 
  //       name : "Tạ văn Nam"
  //      //email: "xuyentrinhthi@gmail.com"
  //    }
  //  }).then(users => {
  //      console.log(users);
  //  });
   db.user.findAll({attributes: ['id'],
   where: {
    //      //name :{$like: `%hat`} 
           name : "Tạ văn Nam"
    //      //email: "xuyentrinhthi@gmail.com"
       }
  }).then(users => {
    console.log(users);
});
})
app.get('/:id', function (req, res) {
    var value = req.params.id;
    db.sequelize.sync({ force: false }).then(function () {
      console.log("Database is connected");
      db.user.findAll({
        where: {
         // name :  {$like: '%hat'} ,
           //id : value
    //      //email: "xuyentrinhthi@gmail.com"
       }
      }).then(users => {
        res.json(users);
      });
    })
})

// // const saltRounds = 10;
// // bcrypt.genSalt(saltRounds, function(err, salt) {
// //   bcrypt.hash("hello", salt, function(err, hash) {
// //       // Store hash in your password DB.
// //       console.log(hash);
// //   });
// // });

console.log("34");

app.listen(3030, function () {
  console.log("Express is running on port 3030");
  //demo
});

// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "quoc_chi_test"
// });
// app.get('/:id', function (req, res) {
//     var value = req.params.id;
//     var sql = "SELECT * FROM quoc_chi_test.users";
//     con.query(sql,  function(err, rows, fields) {
//     if (err) throw err;
    
//       for (var i = 0; i < rows.length; i++) {
//         if(value == rows[i].id);{
//             res.json("Đây là người dùng cần tìm:" + rows[i].name);
//         }
//       }
//   });
// });
// app.get('/:name/:id', function (req, res) {
//   var value = req.params.id;
//   var nameid=req.params.name;
//   res.json("Đây là "+nameid+" có id là "+value);
// });
// app.get('/:name?:id', function (req, res) {
//   var value = req.params.id;
//   var nameid=req.params.name;
//   res.json("Đây là "+nameid+" có id là "+value);
// });