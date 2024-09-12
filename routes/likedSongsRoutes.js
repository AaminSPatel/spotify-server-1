import express from 'express';
import Liked from '../models/likedSongs.js';

const router = express.Router();

router.get('/:userId',async (req,res)=>{
    try{
        const userId = req.params.userId;
        console.log(req.params.userId);
        const likedsongs = await Liked.find({userId}).populate('song_id'); //Populate to get song details
        res.json(likedsongs);
    } catch (err){
        res.status(500).json({message:err.message});
    }
});

router.get('/',async (req,res)=>{
    try {
        const liked = await Liked.find();
        res.json(liked);
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

router.post('/', async (req, res) => {
    const { userId, song_id } = req.body;
    
    try {
      // Check if the liked song already exists
      const existingLikedSong = await Liked.findOne({ userId, song_id });
      
      if (existingLikedSong) {
        return res.status(400).json({ message: 'Song already liked by this user.' });
      }
  
      const likedSong = new Liked({ userId, song_id });
      const newLikedSong = await likedSong.save();
      
      res.status(201).json(newLikedSong);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Remove a liked song for a user
  router.delete('/:id', async (req, res) => {
    try {
      const likedSong = await Liked.findById(req.params.id);
      
      if (!likedSong) {
        return res.status(404).json({ message: 'Liked song not found.' });
      }
  
      await likedSong.remove();
      res.json({ message: 'Liked song removed.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  export default router;