var express = require('express');
var router = express.Router();

const upload = require('../middlewares/uploads.middleware');
const productController = require('../controllers/products.controller');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

router.post('/add', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/upload', [upload.single('file'),productController.uploadFile]);

module.exports = router;
