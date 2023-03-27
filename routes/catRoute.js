'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/catController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg']
    if (allowedTypes.includes(file.mimetype)) {
        // accept file
        cb(null, true);
    }else {
        // reject file
        cb(null, false);
    }
};

const upload = multer({dest: 'uploads/', fileFilter});

// Root of cat endpoint (e.g http://localhost:3000/cat)
router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat'),
        body('name').isAlphanumeric().isLength({min: 1, max: 200}).escape().trim(),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1}),
        catController.postCat)

    .put( body('name').isAlphanumeric().isLength({min: 1, max: 200}),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1}),
        catController.putCat)


// All /cat/:id endpoints
    router.route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat);

// TODO: ADD USER
module.exports = router;
