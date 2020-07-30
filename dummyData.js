const users = [
  {
    id: 1,
    name: 'Test user',
    email: 'your@email.com',
    password:
      '$2b$10$ahs7h0hNH8ffAVg6PwgovO3AVzn1izNFHn.su9gcJnUWUzb2Rcb2W', // = ssseeeecrreeet
  },
  {
    id: 2,
    name: 'Andrei',
    email: 'andrei@email.com',
    password:
      '$2b$10$xCOcluiegEgidZbyP.QFp.wcglRY8wWuwg4W9By4c6Ig9qHTKmBAi',
  },
];

const todos = [
  {
    id: 1,
    user: 1,
    name: 'Do something',
  },
  {
    id: 2,
    user: 1,
    name: 'Do something else',
  },
  {
    id: 3,
    user: 2,
    name: 'Remember the milk',
  },
];

module.exports = {
  users,
  todos,
};
