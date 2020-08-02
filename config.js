module.exports = {
  PORT: 3000,
  COOKIE_CONFIG(expDate) {
    return {
      httpOnly: true,
      //secure: true, //on HTTPS
      //domain: 'example.com', //set your domain
      sameSite: true,
      maxAge: expDate,
    };
  },
  CORS_CONFIG: {
    credentials: true,
  },
};
