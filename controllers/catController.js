'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/image');

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
    // console.log('posting a cat', req.body, req.file);
    if (!req.file) {
        res.status(400).json({
            status: 400,
            message: 'Invalid or missing image file'
        });
        return;
    }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid post data'
        });
        return;
    }
    const newCat = req.body;
    newCat.filename = req.file.filename;
    // use req.user (extracted from token by passport) to add correct owner id
    // NOTE: owner field must not be validated anymore in cat route when uploading cats
    newCat.owner = req.user.user_id;
    await makeThumbnail(req.file.path, newCat.filename);
    try {
        const result = await catModel.insertCat(newCat);
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
    // for now owner is always the logged in user (read from token)
    cat.owner = req.user.user_id;
    // Note the two alternatives for passing the cat id in router
    if (req.params.id) {
        cat.id = parseInt(req.params.id);
    }
    try {
        console.log('updating a cat', req.body);
        // only owner of the cat can update it's data (req.user.user_id == cat.owner)
        // checked in catModel with sql query
        const result = await catModel.modifyCat(cat, req.user.user_id);
        res.status(200).json({message: 'cat modified!'});
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