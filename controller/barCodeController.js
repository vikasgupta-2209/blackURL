const bwipjs = require('bwip-js');
const path = require('path');
const fs = require('fs');
const QRcode = require('../model/barcodeDB');

const getBarcodePage = (req, res) => {
    res.render("barcode", { barcodeImage: null });
};

const generateBarcode = async (req, res) => {
    const { barcodeData } = req.body;

    try {
        // Generate barcode as base64 PNG
        const pngBuffer = await bwipjs.toBuffer({
            bcid: 'code128',       // Barcode type
            text: barcodeData,     // Data to encode
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: 'center',
        });

        // Convert to base64 string
        const base64Image = `data:image/png;base64,${pngBuffer.toString('base64')}`;

        res.render("barcode", { barcodeImage: base64Image });
    } catch (error) {
        console.error("Barcode generation error:", error);
        res.status(500).send("Error generating barcode");
    }
};

module.exports={
    getBarcodePage,
    generateBarcode,
}