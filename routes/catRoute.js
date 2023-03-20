'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/catController');

const upload = multer({dest: 'uploads/'});

router.get('/', catController.getCatList);
router.get('/:catId', catController.getCat);
router.post('/', upload.single('cat'), catController.postCat);
router.put('/', catController.putCat);
router.delete('/', catController.deleteCat)


// TODO: ADD USER

module.exports = router;
