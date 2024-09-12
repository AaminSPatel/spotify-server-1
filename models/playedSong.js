// playedsongSchema.js
import mongoose from 'mongoose';

const playedsongSchema = new mongoose.Schema({
  name: { type: String, required: true },            // Name of the song
  song_key: { type: Number, required: true },        // Unique key for the song
  song_path: { type: String, required: true },       // Path to the song file
  song_img: { type: String, required: true },        // Image path for the song
  artist: { type: String, required: true },          // Name of the artist
  category: { type: String, required: true },        // Category/Genre of the song
}, { collection: 'played_song' }); // Optional: Explicitly set collection name

const PlayedSong = mongoose.model('played_song', playedsongSchema);

export default PlayedSong;
