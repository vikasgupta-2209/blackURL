const mongoose= require("mongoose");

const shortURLSchema= new mongoose.Schema({
    shortURL:{
        type: String,
        unique: true,
        required:true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    searchHistory:[{
        time:{
            type: Date,
            default: Date.now
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const ShortURL=mongoose.model("ShortURL",shortURLSchema);

module.exports=ShortURL;