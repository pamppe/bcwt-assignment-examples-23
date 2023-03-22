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
    /*const fileteredCats = cats.filter(cat => id == cat.id);
    const cat = filteredCats[0]
    res.json(cat);
    };*/
    const cat = cats.find(cat => cat.id === id);
    if (!cat) {
        //res.status(404).send("Cat not found");
        res.status(404).json({message: 'cat not found'})
        return;
    }
    res.json(cat);
};
const postCat = (req, res) => {
    console.log('posting a cat', req.body, req.file);
    // add cat details to cats array
    const newCat = req.body;
    newCat.filename = 'http://localhost:3000/' + req.file.path;
    cats.push(newCat);
    // send correct response if upload successful
    res.status(201).send('new cat added!');
};
const putCat = (req, res) => {
    const updateCat = req.params.cats;
    res.json(updateCat);
}
const deleteCat = (req, res) => {
    const delCat = req.params.cats;
    res.json(delCat);
}


const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;