// models/artistSchema.js
import mongoose from 'mongoose';
const genreSchema = new mongoose.Schema({
    genre_name: { type: String, required: true },               // genre's name
  type: { type: String, required: true },             // type of Genre they sing
},{ collection: 'genre' }
);

const Genre = mongoose.model('genre', genreSchema);

export default Genre;
