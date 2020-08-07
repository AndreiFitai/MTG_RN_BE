const { Sequelize, Model, DataTypes } = require('sequelize');

async function main() {
  const sequelize = new Sequelize({
    database: 'mtg',
    username: 'postgres',
    password: 'postgres',
    dialect: 'postgres',
  });

  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    { sequelize, modelName: 'user' },
  );

  (async () => {
    await sequelize.sync();
    const jane = await User.create({
      email: 'janedoe@email.com',
      password: 'password123SoOriginal',
    });
    console.log(jane.toJSON());
  })();

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
