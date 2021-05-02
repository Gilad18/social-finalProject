const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author : {
        type : String,
        required : true,
        unique: false,
    },
    authorID : {
        type : String,
        required : true,
        unique: false,
    },
    content : {
        type : String,
        required : true,
        unique: false,
    },
    likes :   [String],
    comments :[{author:String , content:String}],
    image : {
        type : Buffer,
        required : false,
        unique: false
    },
    date: {
        type : Date,
        required : false,
        unique : false,
        default : Date.now
    }
})

const userModel  = mongoose.model('posts',postSchema);
module.exports= userModel;