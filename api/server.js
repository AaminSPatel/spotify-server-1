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
app.use(cors({
  origin: 'https://aaminspatel.github.io', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
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

