import Songs from '../models/songs.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const song = await Songs.find();
      res.json(song);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/search', async (req, res) => {
    try {
        // Extract query parameters
        const { name, artist, song_path, song_image, song_key, song_category, song_date } = req.query;

        // Create a query object based on provided parameters
        const query = {};
        if (name) query.name = name;
        if (artist) query.artist = artist;
        if (song_path) query.song_path = song_path;
        if (song_image) query.song_image = song_image;
        if (song_key) query.song_key = parseInt(song_key); // Ensure song_key is an integer
        if (song_category) query.song_category = song_category;
        if (song_date) query.song_date = new Date(song_date); // Ensure song_date is a Date object

        // Find the song based on the query object
        const song = await Songs.findOne(query);

        // Check if song was found
        if (!song) {
            return res.status(404).json({ message: 'No song found' });
        }

        res.json(song);
    } catch (err) {
        console.error('Error finding song:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


  router.post('/add', async (req, res) => {
    const { name, artist, song_path, song_image, song_key, song_category, song_date } = req.body;
    //console.log(req.body);
  
    try {
      // Basic validation
      if (!name || !artist || !song_path || !song_image || !song_key || !song_category || !song_date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create new song object
      const newSong = new Songs({
        name,
        artist,
        song_path,
        song_image,
        song_key,
        song_category,
        song_date: new Date(song_date),  // Ensure date is converted to Date object
      });
  
      // Save song to the database
      await newSong.save();
      res.status(201).json(newSong);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  export default router;