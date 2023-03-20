'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;
const getCatList = (req, res) => {
    res.json(cats);
};
const getCat = (req, res) => {
    //console.log(req.params);
    const id = req.params.catId;
    //TODO: filter matching cat based on id
    // TODO: response 404 if id not found in array (res.status(404))
    const cat = cats[0];
    res.json(cat);
}

const catController = {getCatList, getCat};
module.exports = catController;