const jwt = require('jsonwebtoken');
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}

function userInformationFromToken(req, res, next){
  // decode token and get user information
  const token = req.headers['x-access-token'];
  const userInformation = jwt.decode(token);
  if(!userInformation) {
    return res.status(401).json({ auth: false, message: 'Not authenticated' });
    }
  req.userInformation = userInformation;

  next();
}

module.exports = {verifyJWT, userInformationFromToken};