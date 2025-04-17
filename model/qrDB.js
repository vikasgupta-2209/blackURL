const mongoose= require("mongoose");

const qrCodeSchema= new mongoose.Schema({
    qrData:{
        type:String,
        required: true,
    },
    imageURL:{
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    /*history:[{
        time:{
            type:Date,
            default: Date.now()
        }
    }]*/
},{timestamps:true});

const QRcode=mongoose.model("QRCode",qrCodeSchema);
module.exports= QRcode;