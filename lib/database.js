const Sequelize = require('sequelize');

class DatabaseManager {
    static instance = null;

    static getInstance() {
        if (!DatabaseManager.instance) {
            const DATABASE_URL = process.env.DATABASE_URL || './postgresql://kingdom_v839_user:BAUC1AWhBgCb4YLkG6RXhr7yAgOovqnt@dpg-d11qnb49c44c73fkk8gg-a.oregon-postgres.render.com/kingdom_v839';

            DatabaseManager.instance =
                DATABASE_URL === './postgresql://kingdom_v839_user:BAUC1AWhBgCb4YLkG6RXhr7yAgOovqnt@dpg-d11qnb49c44c73fkk8gg-a.oregon-postgres.render.com/kingdom_v839'
                    ? new Sequelize({
                            dialect: 'sqlite',
                            storage: DATABASE_URL,
                            logging: false,
                      })
                    : new Sequelize(DATABASE_URL, {
                            dialect: 'postgres',
                            ssl: true,
                            protocol: 'postgres',
                            dialectOptions: {
                                native: true,
                                ssl: { require: true, rejectUnauthorized: false },
                            },
                            logging: false,
                      });
        }
        return DatabaseManager.instance;
    }
}

const DATABASE = DatabaseManager.getInstance();

DATABASE.sync()
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

module.exports = { DATABASE };

// code by prince tech
