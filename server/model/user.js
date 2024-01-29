import mongoose from "mongoose";

const Schema = mongoose.Schema({
    fullname:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
})

const User = new mongoose.model('user', Schema)

export default User