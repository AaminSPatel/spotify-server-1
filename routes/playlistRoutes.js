import express from 'express';

import Playlist from '../models/playlist.js';
const router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const playlist = await Playlist.find(); // Populat with song and user data
        res.json(playlist);
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
    
})
router.get('/:id', async (req, res) => {
    try {
      const UserId = req.params.id;
      console.log(UserId);
  
      // Await the result of the find operation
      const playlistById = await Playlist.find({ createdBy: UserId });
  
      // Check if the playlist array is empty
      if (!playlistById || playlistById.length === 0) {
        console.log('Playlist not found');
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
      console.log('Playlist found');
      res.json({ data: playlistById }); // Include data key to align with the front-end expectation
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
//To Add New playlist
router.post('/add',async (req,res)=>{
    const {name,description,createdBy,songs} = req.body;
    
    let created_at = new Date();
    let updated_at = new Date();
    console.log(req.body,created_at,updated_at);
    
    try{
        const existingPlaylist = await Playlist.findOne({name});
        if(existingPlaylist){
            return res.status(400).json({message:'Playlist already present with that name'})
        }

        const playlist = new Playlist({name,description,createdBy,songs,created_at,updated_at});
        const newPlaylist = await playlist.save();
        res.status(201).json(newPlaylist);
    } catch(err){
        console.log(err,'ye ma chuda ra he');
        
        res.status(400).json({message:err.message})
    }
})

//To Update Playlist
router.patch('/:id',async (req,res)=>{
    try{
        const updatedPlaylist = Playlist.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('songs').populate('createdBy', 'email');
    res.json(updatedPlaylist);
    }
    catch (err) {
        res.status(500).json({message:err.message})
    }
})

router.delete('/id',async (req,res)=>{
    try{
        await Playlist.findByIdAndDelete(req.params.id);
        res.json({message:'Playlist Deleted Successfully'});
    } catch (err){
        res.status(500).json({message:err.message});
    }
})

export default router;