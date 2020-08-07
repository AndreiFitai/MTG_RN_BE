module.exports = {
  PORT: 3000,
  COOKIE_CONFIG(expDate) {
    return {
      httpOnly: true,
      sameSite: true,
      maxAge: expDate,
    };
  },
  CORS_CONFIG: {
    credentials: true,
  },
};
