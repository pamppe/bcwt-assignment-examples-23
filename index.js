'use strict'

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const username = 'Aku Ankka';
    const description = 'Ankkalinna asukas.';
    const content = {title: username, description};
    res.render('index', content);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/catinfo", (req, res) => {
    const cat = {
      name: "Frank",
      birthdate: "2010-12-25",
      weight: 5,
    };
    res.json(cat);
  });