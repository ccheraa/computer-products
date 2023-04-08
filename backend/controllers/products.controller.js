let Product = require('../api/models/product.model');

// GET Product List page
exports.getProducts = async (req, res) => {
  const { productCode, definition, category, quantity, price } = req.query;
  const query = {};

  if (productCode) {
    query.productCode = RegExp(productCode, 'i');
  }
  if (definition) {
    query.definition = RegExp(definition, 'i');
  }

  Product.find(query)
    .then((product) => res.json(product))
    .catch(() => res.status(501).json({
      msg: 'Products not found.'
    }));
};

// GET Product
exports.getProduct = async (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((error) => {
      return res.status(501).json({
        msg: 'Product not found.',
        error: error
      });
    })
};

// ADD Product 
exports.addProduct = (req, res) => {
  const productCode = req.body.productCode;
  const definition = req.body.definition;
  const category = req.body.category.name;
  const quantity = Number(req.body.quantity);
  const price = Number(req.body.price);
  const imageUrl = req.body.imageUrl;

  const newProduct = new Product({
    productCode,
    definition,
    category,
    quantity,
    price,
    imageUrl,
  });

  newProduct.save()
  .then(() => res.json('Product Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
}

// UPDATE Product......
exports.updateProduct = (req, res) => {
  Product.findById(req.params.id).then(
    (product) => {
      product.productCode = req.body.productCode;
      product.definition = req.body.definition;
      product.category = req.body.category;
      product.quantity = Number(req.body.quantity);
      product.price = Number(req.body.price);
      product.imageUrl = req.body.imageUrl;

      let promise = product.save();
      promise.then(
        () => {
          return res.status(200).json({
            message: 'Update product',
          })
        }
      );

      promise.catch(
        (error) => {
          return res.status(501).json({
            message: 'Error failed update product',
            error: error
          });
        }
      );
    }
  ).catch(err => res.status(400).json('Error: ' + err));
};

// DELETE Product......
exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product delete.'))
    .catch(() => res.status(501).json({
      msg: 'Product not found.'
    }));
};

// UPLOAD Photo Product......
exports.uploadFile = (req, res) => {
  if (typeof req.file !== 'undefined') {
    res.json({
      imageUrl: 'http://localhost:3000/images/' + req.file.filename
    });
  }
};
