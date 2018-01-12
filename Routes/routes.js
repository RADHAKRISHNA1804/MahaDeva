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
  getHoroscopes.findOne({horoscope: req.params.sign}, function(err, details) {
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
app.post("/sudo-login", function(req, res) {
  console.log(req.body.email);
  // console.log(getSudos.findOne({name: 'Test'}));
  getSudos.findOne({email: 'sy@gmail.com' }, function(err, sudo) {
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
