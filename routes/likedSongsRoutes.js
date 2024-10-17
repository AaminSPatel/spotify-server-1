import express from 'express';
import Liked from '../models/likedSongs.js';

const router = express.Router();
// Backend - Fetch liked songs by userId
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
   // console.log('Fetching liked songs for user:', userId);

    // Find all liked songs for the user and populate song details
    const likedSongs = await Liked.find({ userId }).populate('song_id');
    
    res.json(likedSongs);
  } catch (err) {
    console.error('Error fetching liked songs:', err);
    res.status(500).json({ message: err.message });
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

router.post('/add', async (req, res) => {
  const { userId, song_id } = req.body;

  try {
    // Check if the liked song already exists
    const existingLikedSong = await Liked.findOne({ userId, song_id });
    
    if (existingLikedSong) {
      // Log the song details to confirm it was found
      console.log('Song found, attempting to remove:', existingLikedSong);

      // Use deleteOne() to remove the liked song
      await Liked.deleteOne({ userId, song_id });
      
      console.log('Song removed successfully');
      return res.status(200).json({ message: 'Song disliked successfully.' });
    } else {
      // If the song is not found in the liked list, add it
      console.log('Song not found, adding to liked songs');
      
      const likedSong = new Liked({ userId, song_id });
      const newLikedSong = await likedSong.save();
      
      return res.status(201).json(newLikedSong);
    }
  } catch (err) {
    console.error('Error during like/dislike operation:', err);
    return res.status(500).json({ message: 'An error occurred', error: err.message });
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