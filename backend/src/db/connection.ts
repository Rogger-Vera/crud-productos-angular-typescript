import { Sequelize } from "sequelize";

const sequelize = new Sequelize('tienda', 'root', '', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql'
    // logging: false
});

export default sequelize;