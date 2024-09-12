import express from 'express';
import Genre from '../models/genre.js';

const router = express.Router();

router.get('/:genreName',async (req,res)=>{
    try{
        const genreName = req.params.genreName;
        console.log(req.params.genreName);
        const genre = await Genre.find({genreName}).populate('genre_name'); //Populate to get song details
        res.json(genre);
    } catch (err){
        res.status(500).json({message:err.message});
    }
});

router.get('/',async (req,res)=>{
    try {
        const genre = await Genre.find();
        res.json(genre);
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

  export default router;