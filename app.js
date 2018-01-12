var express =  require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

//Bring in Models
mongoose.connect('mongodb://localhost/mahadeva');
let db = mongoose.connection;
let dbHoroscopes = require("./modal/horoscopes");
let getSudos = require("./modal/getsudos");

//Declarations for multiple use
var zodiacs = ["Aries", 'Taurus', "aries", 'taurus', "aries", 'taurus', "aries", 'taurus', "aries", 'taurus', "aries", 'taurus'];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//check for DB Error
db.on('error', function(error) {
  console.log(error);
});
db.once("open", function() {
  console.log("conneted to Mongodb");
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.get("/", function (req, res) {
  res.render('index', {
    title: ""
  });
});

app.get("/horoscopes", function (req, res) {
  res.render('horoscopes_list', {
    title: "Mahadeva",
    list: zodiacs
  });
});

app.get("/horoscopes/zodiac_sign/:sign", function(req, res) {
  console.log(req.params.sign);
  dbHoroscopes.findOne({horoscope: req.params.sign}, function(err, details) {
    if(err) {
      console.log(err);
      // need to render a something went wrong template with message
    } else {
      console.log("Details" + details);
      res.render('zodiac_info', {
        title: "Mahadeva",
        details: details
      });
    }
  })
});


app.get("/sudo", function(req, res) {
    res.render('sudo/sudo_login', {
      title: 'Mahadeva'
    });
});
app.post("/sudo/login", function(req, res) {
  console.log(req.body.email);
  // console.log(getSudos.findOne({name: 'Test'}));
  getSudos.findOne({email: req.body.email }, function(err, sudo) {
    if(err) {
      console.log(err);
    } else {
      if(sudo.email == req.body.email && sudo.password == req.body.password) {
        res.render('sudo/welcome_sudo_page', {
          sudo: sudo,
          list: zodiacs,
          months: months
        });
      } else {
        res.send('Error in login');
      }
    }
  });
})

app.post("/sudo/horoscopes/add", (req, res) => {
  var object = {
    author: req.body.author,
    horoscope: req.body.horoscope,
    month: req.body.month,
    year: req.body.year,
    desc: req.body.description
  }

  let query = "monthly." + "year" + object.year + "." + object.month;
  let obj = {};
  obj[query] = object.desc;
  console.log(obj);
  dbHoroscopes.update({
      horoscope:object.horoscope
    },
    {
      $set: obj
    }, {upsert: true}, (err, data) => {
      if(err) {
        res.send(err);
      }
      console.log(data);
    });
});

app.listen(3002, function() {
  console.log("Server started on port 3002");
});
