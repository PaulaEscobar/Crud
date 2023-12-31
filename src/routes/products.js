// ************ Require's ************
const express = require('express');
const multer = require('multer')
const path = require('path');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');


const storage = multer.diskStorage ({
    destination: function(req, file, cb){
        cb(null, './public/images/products')
    },
    
    filename: function(req, file, cb) {
        const newImage = Date.now() + path.extname(file.originalname)
        cb(null, newImage)
    }

});

const upload = multer ({ storage })




/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/store', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id',upload.single('image') ,productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
