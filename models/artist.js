// models/artistSchema.js
import mongoose from 'mongoose';
const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },               // Artist's name
  genre: { type: String, required: false },             // Genre they sing
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Songs' }],
  image: { type: String, required: false },  // Array of Song IDs referencing the 'songs' collection
},{ collection: 'artist' }
);

const Artist = mongoose.model('artist', artistSchema);

export default Artist;
