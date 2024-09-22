import express from 'express';

import Playlist from '../models/playlist.js';
const router = express.Router();

router.get('/open/:id', async (req, res) => {
    //console.log(req.params.id);
    
    try {
        
        const playlist = await Playlist.findById(req.params.id)
            .populate('songs')  // Populate with song data
            //.populate('createdBy', 'username');  // Optionally populate user data (e.g., username)
        if(!playlist) {
            console.log('not found');
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Add a song to a specific playlist
router.post('/add-song/:id', async (req, res) => {
    const playlistId = req.params.id;
    const { songId } = req.body; // Assuming you're passing the songId in the request body
    
    try {
      // Find the playlist and add the song's ObjectId to the 'songs' array
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $addToSet: { songs: songId } }, // Add the song only if it's not already present
        { new: true, useFindAndModify: false } // Return the updated document
      ).populate('songs'); // Optionally populate the song data after updating
  
      if (!updatedPlaylist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
      res.json(updatedPlaylist); // Return the updated playlist
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const UserId = req.params.id;
     // console.log(UserId);
  
      // Await the result of the find operation
      const playlistById = await Playlist.find({ createdBy: UserId });
  
      // Check if the playlist array is empty
      if (!playlistById || playlistById.length === 0) {
        //console.log('Playlist not found');
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
     // console.log('Playlist found');
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