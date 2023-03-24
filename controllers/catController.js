'use strict';
// catController
const catModel = require('../models/catModel');

const getCatList = async (req, res) => {
    try {
        const cats = await catModel.getAllCats();
        //console.log(cats);
        res.json(cats);
    }
    catch (error) {
            res.status(500).json({error: 500, message: error.message});
        }
};
const getCat = async (req, res) => {
    //console.log(req.params);
    //convert id value to number
    const catId = Number(req.params.catId);
    // check if number is not an integer
    if (!Number.isInteger(catId)) {
        res.status(400).json({error: 500, message: "invalid id"});
        return;
    }
    // TODO: wrap to try-catch
    const [cat] = await catModel.getCatById(catId);
    console.log("get cat", cat);
    //TODO: filter matching cat based on id
    // TODO: response 404 if id not found in array (res.status(404))
    if (cat) {
        res.json(cat);
    } else
        {
            //res.status(404).send("Cat not found");
            res.status(404).json({message: 'cat not found'})
        }
};

const postCat = async (req, res) => {
    console.log('posting a cat', req.body, req.file);
    // add cat details to cats array
    const newCat = req.body;
    newCat.filename = req.file.path;
   const result = await catModel.insertCat(newCat);
    // send correct response if upload successful
    res.status(201).send('new cat added!');
};
const putCat = async (req, res) => {
        console.log('modify a cat', req.body);
        //TODO: add try-catch
    const cat = req.body;
        const result = await catModel.modifyCat(req.body);
        // send correct response if upload successful
        res.status(200).send('Cat modified');
    };
const deleteCat = async (req, res) => {
    console.log('deleting a cat', req.params.catId);
    const result = await catModel.deleteCat(req.params.catId);
    res.status(200).send('Cat deleted');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;