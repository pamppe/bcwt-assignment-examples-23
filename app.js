'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;

const user = {name: 'foo', password: 'bar'};

app.set('views', './views');
app.set('view engine', 'pug');

app.use(session({
  secret: 'sdfsgargeggwgwegwfewf',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded({extended: true}));
//parseria käytetään vaan arvojen lukemiseen
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
    res.render('form');
  });

app.get('/secret', (req, res) => {
  if (req.session.loggedIn) {
    res.send('secret');
  }else {
    res.status(403).send('you must login to see this');
  }});

app.post('/login', (req, res) => {
  console.log('trying to log in', req.body);
  // dummy login
  if (req.body.username === user.name &&
      req.body.password === user.password) {
    req.session.loggedIn = true;
    res.redirect('/secret');
  } else {
    res.status(401).send('login failed!');
  }
});
app.get('logout', (req, res) => {
  req.session.loggedIn = false;
  res.redirect('/form');
});


//Cookies
app.get('/setCookie/:color', (req,res) => {
  console.log('setting cookie', req.params.color);
  res.cookie('color', req.params.color).send('cookie set');
});

app.get('/getCookie', (req,res) => {
  console.log('Cookies: ', req.cookies);
  res.send('Color cookie value: ' + req.cookies.color);
});

app.get('/deleteCookie', (req,res) => {
  res.clearCookie('color').send('color cookie deleted');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));