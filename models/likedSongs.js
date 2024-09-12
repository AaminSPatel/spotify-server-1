import mongoose from "mongoose";

const likedSchema =new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'Users_data',required: true },
    song_id:{type:mongoose.Schema.Types.ObjectId,ref:'Songs',required: true }
},{ collection: 'liked_songs' });

const Liked = mongoose.model('liked_songs',likedSchema);

export default Liked;