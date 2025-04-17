const express = require('express');
const router = express.Router();
const { getBarcodePage,generateBarcode}= require('../controller/barCodeController');

router.get('/', getBarcodePage );
router.post('/', generateBarcode);

module.exports = router;