// userSchema.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },         // Email of the user
  password: { type: String, required: true },                    // Password of the user
  mobile: { type: String, required: false },                     // Mobile number of the user
  full_name: { type: String, required: false },                  // Full name of the user
  profile_pic: { type: String, required: false },                // Profile picture URL or path
}, { collection: 'users_data' }); // Optional: Explicitly set collection name

const User = mongoose.model('Users_data', userSchema);

export default User;
