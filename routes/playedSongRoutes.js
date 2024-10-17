// playedRoutes.js
import express from 'express';
import PlayedSong from '../models/playedSong.js';  // Import the PlayedSong model

const router = express.Router();


// GET /playedsongs?userId=<userId> - Retrieve played songs for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.userId;  // Get the userId from query params
  try {
    // Fetch played songs filtered by userId if it exists
    let query = {};
    if (userId) {
      query.createdBy = userId;
    }
    const playedSongs = await PlayedSong.find(query);  // Fetch played songs based on the query
    res.json(playedSongs);  // Send the songs as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });  // Send error response if fetching fails
  }
});

// POST /playedsongs - Add a new played song
router.post('/add', async (req, res) => {
  const { name, song_key, song_path, song_img, artist, category,userId,song_id } = req.body;
  const newPlayedSong = new PlayedSong({ name, song_key, song_path, song_img, artist, category,createdBy: userId,song_id });
  //console.log(req.body);
  
  try {
    const savedSong = await newPlayedSong.save();  // Save the new song to the database
    res.status(201).json(savedSong);  // Send the saved song as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message });  // Send error response if saving fails
  }
});

// PUT /playedsongs/:id - Update an existing played song by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, song_key, song_path, song_img, artist, category } = req.body;

  try {
    const updatedSong = await PlayedSong.findByIdAndUpdate(
      id,
      { name, song_key, song_path, song_img, artist, category },
      { new: true }
    );
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /playedsongs/:id - Delete a played song by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await PlayedSong.findByIdAndDelete(id);  // Delete the song from the database
    res.json({ message: 'Played song deleted successfully.' });  // Send a success message
  } catch (err) {
    res.status(500).json({ message: err.message });  // Send error response if deletion fails
  }
});

export default router;
