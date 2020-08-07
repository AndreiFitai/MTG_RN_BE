const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret!'; // temporary of course

function authenticateRoute(req, res, next) {
  var token = req.cookies['jwt'];

  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err || !decoded) {
      res.status(403).send('invalid token');
    } else if (
      decoded &&
      (!decoded.access || decoded.access == 'unauthenticated')
    ) {
      res.status(403).send('unauthenticated token');
    } else if (decoded && decoded.access == 'authenticated') {
      next();
    } else {
      res.status(403).send('something suspicious');
    }
  });
}

function createAuthToken(email, device, userAgent, id) {
  var tokenData = {
    device: device,
    access: 'authenticated',
    agent: userAgent,
    email: email,
    id: id,
  };
  return jwt.sign(tokenData, SECRET_KEY, { expiresIn: '90 days' });
}

function apolloContext({ req }) {
  const token = req.cookies['jwt'] || '';

  try {
    return ({ id, email } = jwt.verify(
      token.split(' ')[1],
      SECRET_KEY,
    ));
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in',
    );
  }
}

function getExpDate() {
  var newDate = new Date();
  return newDate.setMonth(newDate.getMonth() + 3);
}

module.exports = {
  authenticateRoute,
  createAuthToken,
  apolloContext,
  getExpDate,
};
