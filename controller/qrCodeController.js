const QRCode= require("qrcode");

const handleQRCodeGeneration= async (req,res)=>{
    const{qrData}= req.body;
    if(!qrData){
        return res.render("qrCode",{
            qrImage: null,
        });
    }
    try{
        const qrImage= await QRCode.toDataURL(qrData);
        res.render("qrCode",{ qrImage});
    }catch(error){
        console.error("QR generation error:",error);
        res.render("qrCode",{
            qrImage:null,
        });
    }
};

module.exports={
    handleQRCodeGeneration,
}