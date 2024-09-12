// routes/artistRoutes.js
import express from 'express';
import Artist from '../models/artist.js';
//import Songs from '../models/songs.js';

const router = express.Router();
/* 
// POST /artists - Add a new artist
router.post('/ghg', async (req, res) => {
  const { name, genre, songs } = req.body;
  const newArtist = new Artist({ name, genre, songs });

  try {
    const savedArtist = await newArtist.save();
    res.status(201).json(savedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /artists/:id/songs - Add a song to an artist
router.post('/:id/songs', async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;

  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    // Check if song exists in the Song collection
    const song = await Songs.findById(songId);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Add song to the artist's songs array
    artist.songs.push(songId);
    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 */
// GET /artists - Retrieve all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().populate('songs');  // Populate song details
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
