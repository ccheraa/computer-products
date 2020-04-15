const jwt = require('jsonwebtoken');

var decodedToken = '';

function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata) {
    if (err) {
      return res.status(400).json({
        message: 'Unauthorized request'
      });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  });
}

function verifyTokenTest(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');  
  }

  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

module.exports = verifyToken;
