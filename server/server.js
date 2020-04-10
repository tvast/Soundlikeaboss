const express = require("express");
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

// const bodyParser = require("body-parser");
var session = require('express-session')
const app = express();

const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

var http = require("http").createServer(app);
app.use((err, req, res, next) => {
  res.json({
    success: false,
    message: 'fail: email already exists'
  });
});
//get database input
const sqliteJson = require('sqlite-json');
// var db = new sqlite3.Database('./mydb.sqlite3');
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password' })
      }
    }
  )
)

let users = [
  {
    id: 1,
    name: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.post("/api/login", (req, res) => {
  // console.log(JSON.stringify(req.body.email))
  console.log(req.body)
  // res.send(JSON.stringify("s"));
  return res.status(200).send('User logged in');
  // if (req.body) {
  //   if (req.body.email = users[0].email) {
  // res.send(JSON.stringify(req.body.email))
  // res.json(JSON.parse(req.body.email))
  //   }
  //   else {
  //     res.send("not login")
  //   }

  // } else {
  //   res.send("not login")
  //   console.log("err")
  // }

})
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: { secure: true }
// }))
// app.post('/login', function (req, res) {
//   if (req.body.email === 'user@email.com' && req.body.password === 'password') {
//     req.session.user_id = 0;
//     res.status(200).json('User logged in');
//     console.log('test1')
//   } else {
//     res.status(401).json('Bad user/pass');
//     console.log('test2')
//   }
// });

app.post('/login', function (req, res) {
  res.send('POST request to the homepage');
});




app.get(`/athlete`, async (req, res) => {
  exporter.json('SELECT * FROM Athlete INNER JOIN Game ON Game.game_id = AthleteResult.game_id INNER JOIN AthleteResult ON AthleteResult.athlete_id = Athlete.athlete_id INNER JOIN AthletePhoto ON Athlete.photo_id = AthletePhoto.photo_id ORDER BY AthleteResult.gold ASC, AthleteResult.silver ASC, AthleteResult.bronze ASC;', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    console.log(JSON.parse(json))
  });

});

app.get(`/athleteID`, async (req, res) => {

  exporter.json('SELECT * FROM Athlete INNER JOIN AthleteResult ON AthleteResult.athlete_id = Athlete.athlete_id INNER JOIN AthletePhoto ON Athlete.photo_id = AthletePhoto.photo_id WHERE Athlete.athlete_id =' + req.query.keywords + ' LIMIT 1', async function (err, idathlete) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(idathlete));
    } catch (err) {
      await res.json(err);
    }
    console.log(req.query.keywords)
    console.log(JSON.parse(idathlete))
  })

});

app.get(`/game`, async (req, res) => {
  exporter.json('select * FROM Game', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    // console.log(JSON.stringify(json))
  });

});

app.get(`/photo`, async (req, res) => {
  exporter.json('select * FROM AthletePhoto', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    // console.log(JSON.stringify(json))
  });

});

app.get(`/getDatasql`, async (req, res) => {
  let db = new sqlite3.Database('slab.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the ocs database.');
  });

  exporter = sqliteJson(db);

  exporter.tables(function (err, tables) {

    console.log(tables)
    // tables === ['foo', 'bar', 'baz']
  });

  exporter.json('select * FROM Main', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    console.log(JSON.stringify(json))
  });

});
app.post("/addArticle", async function (req, res) {
  console.log(req.body.title);
  var foo = req.body
  let db = new sqlite3.Database('slab.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the ocs database.');
  });
  db.serialize(function () {

    var stmt = db.prepare("INSERT INTO main (title,content) VALUES (" + JSON.stringify(req.body.title) + "," + JSON.stringify(req.body.content) + ")");
    stmt.run();

    stmt.finalize();
  });


  // db.close()
  res.send(JSON.stringify(foo))
})
var server = app.listen(process.env.PORT || 2800, () => {
  console.log("Howdy, I am running at PORT 2800");
});

