const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require('apollo-server-express');
const { users } = require('./dummyData');
const { typeDefs, resolvers } = require('./typesAndDefs');
const {
  authenticateRoute,
  createAuthToken,
  apolloContext,
  getExpDate,
} = require('./authHelpers');

const { PORT, CORS_CONFIG, COOKIE_CONFIG } = require('./config');

app.use(cors(CORS_CONFIG));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyparser.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  apolloContext,
});

server.applyMiddleware({ app, cors: false });

app.post('/register', async (req, res) => {
  const { device, userAgent, email, password } = req.body;
  const encryptedPass = await bcrypt.hash(password, 10);
  // save to db - get user id
  const token = createAuthToken(
    email,
    device,
    userAgent,
    1, //! "add id from db here"
  );
  res.cookie('jwt', token, COOKIE_CONFIG(getExpDate()));
  res.send({
    success: true,
  });
});

app.get('/home', authenticateRoute, (req, res) => {
  res.send('You are home!');
});

app.get('/hello', (req, res) => {
  res.send('Hello ( no auth needed) !');
});

app.post('/login', async (req, res) => {
  const { device, userAgent, email, password } = req.body;
  const theUser = users.find((user) => user.email === email);

  if (!theUser) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`,
    });
    return;
  }

  const match = await bcrypt.compare(password, theUser.password);
  if (!match) {
    res.status(401).send({
      success: false,
      message: 'Incorrect credentials',
    });
    return;
  }

  var token = createAuthToken(email, device, userAgent, theUser.id);
  res.cookie('jwt', token, COOKIE_CONFIG(getExpDate()));
  res.send({
    success: true,
  });
});

app.listen(PORT, () =>
  console.log(`Server listening on  http://localhost:${PORT}`),
);
