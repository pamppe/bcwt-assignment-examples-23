'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');

const getCatList = async (req, res) => {
    try {
        let cats = await catModel.getAllCats();
        // convert ISO date to date only
        // should this be done on the front-end side??
        console.log('cats',cats)
        cats.map(cat => {
            cat.birthdate = cat.birthdate.toISOString().split('T')[0];
            return cat;
        });
        res.json(cats);
    }
    catch (error) {
            res.status(500).json({error: 500, message: error.message});
        }
};
const getCat = async (req, res) => {
    //console.log(req.params);
    //convert id value to number
    const catId = Number(req.params.id);
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
    if (!req.file) {
        res.status(400).json({status: 400,
            message: 'Invalid or missing image file'});
        return;
    }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({status: 400,
            errors: validationErrors.array(),
            message: 'Invalid data'});
        return;
    }
    // add cat details to cats array
    const newCat = req.body;
    newCat.filename = req.file.filename;
    try {
        const result = await catModel.insertCat(newCat);
        // send correct response if upload successful
        res.status(201).json({message: 'new cat added!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};
const putCat = async (req, res) => {
    console.log('modify a cat', req.body);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({status: 400,
            errors: validationErrors.array(),
            message: 'Invalid data'});
        return;
    }
    const cat = req.body;
    try {
        const result = await catModel.modifyCat(req.body);
        // send correct response if upload successful
        res.status(200).json('Cat modified');
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
    };
const deleteCat = async (req, res) => {
    console.log('deleting a cat', req.params.id);
    try {
        const result = await catModel.deleteCat(req.params.id);
        res.status(200).json('Cat deleted');
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;