const mongoose = require("mongoose");

const barcodeSchema = new mongoose.Schema({
  barcodeData: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  /*history: [{
    time: {
      type: Date,
      default: Date.now
    }
  }]*/
}, { timestamps: true });

const Barcode = mongoose.model("Barcode", barcodeSchema);
module.exports = Barcode;