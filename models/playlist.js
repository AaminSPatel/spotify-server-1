import mongoose from 'mongoose';

// Define the playlist schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name of the playlist
  description: { type: String, required: false },  // Description of the playlist
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User who created the playlist
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song',required: false }],  // Array of references to songs
  created_at: { type: Date, default: Date.now },  // Timestamp for when the playlist was created
  updated_at: { type: Date, default: Date.now },  // Timestamp for the last update
}, { collection: 'playlist' });

// Pre-save middleware to update the updated_at field before each save operation
playlistSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the Playlist model
const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;
