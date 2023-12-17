import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone : {
      type : String,
    },

    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },

    
    
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);