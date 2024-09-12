import express from 'express';
import dotenv from 'dotenv';
//import mongoose  from 'mongoose';
import connectDB from '../db.js';
dotenv.config();
import songRoutes from '../routes/songsRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import playedSongRoutes from '../routes/playedSongRoutes.js';
import artistRoutes from '../routes/artistRoutes.js';
import likedSongsRoutes from '../routes/likedSongsRoutes.js'
import playlistRoutes from '../routes/playlistRoutes.js'
import genreRoutes from '../routes/genreRoutes.js'
import cors from 'cors';
const app = express();
app.use(express.json())
//const router = express.Router();
//app.use(express.static('public'))
const allowedOrigins = ['http://localhost:5173', 'https://aaminspatel.github.io'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

const PORT = 7000;

connectDB();
//import express from 'express'; // ES module syntax
//const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app; // ES module syntax

app.use('/api/songs',songRoutes);
app.use('/api/users', userRoutes);
app.use('/api/played',playedSongRoutes);
app.use('/api/artist',artistRoutes);
app.use('/api/liked',likedSongsRoutes);
app.use('/api/playlist',playlistRoutes);
app.use('/api/genre',genreRoutes);

app.listen(PORT,()=>{
    console.log('app Is Listining on',PORT)
})

