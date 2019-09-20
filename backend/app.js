const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models/index');
const cors = require("cors");

//Router
const apiRouter = require('./services/router.js');

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', apiRouter);


// add a basic route
// start the app
app.get('/', function (req, res) {
  res.json({ message: 'Express is up!' });
});

// const models=require("./models");

db.sequelize.sync({ force: false }).then(function () {
  console.log("Database is connected");
  // const createUser = async ({ name, password }) => { 
  //     return await User.create({ name, password });
  //   };
  //   createUser("hi","hoho");
  console.log(db.user);

  // db.user.create({
  //   username: "maytinhdibo",
  //   password: "12456"
  // });

  // db.user.findAll().then(users => {
  //     console.log(users);
  // });
})

// const saltRounds = 10;
// bcrypt.genSalt(saltRounds, function(err, salt) {
//   bcrypt.hash("hello", salt, function(err, hash) {
//       // Store hash in your password DB.
//       console.log(hash);
//   });
// });


app.listen(3030, function () {
  console.log("Express is running on port 3030");
  //demo
});