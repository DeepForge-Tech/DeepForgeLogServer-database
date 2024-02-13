const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.POSTGRESQL_DB,
    process.env.POSTGRESQL_USER,
    process.env.POSTGRESQL_PASSWORD,
    {
        logging: false,
        host: process.env.POSTGRESQL_HOST,
        dialectOptions: {
            ssl: {
                require: true
            }
        },
        dialect: 'postgres',
    }
);
sequelize.authenticate().then(() =>
    console.log('Database successfully connected'))
    .catch((err) => console.error('Database connection error: ', err)
);

module.exports = sequelize;