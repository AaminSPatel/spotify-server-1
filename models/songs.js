
import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    song_path: { type: String, required: true, unique: true },
    song_image: { type: String, required: true, unique: true },
    song_key: { type: Number, required: true, unique: true },
    song_category: { type: String, required: false },  // Category can be empty
    song_date: { type: Date, required: true },  // Corrected to use Date type
  });

const Songs = mongoose.model('Songs', songsSchema);
export default Songs;