'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.get('/', catController.getCatList);
router.get('/:catId', catController.getCat);

//TODO: move functions below to controller
router.post('/', (req, res) => {
    res.send('With this endpoint you can add cats.');
});
router.put('/', (req, res) => {
    res.send('With this endpoint you can modify cats.');
});
router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete cats.');
});

module.exports = router;
