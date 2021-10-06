import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Order from './Order.js'
const Client = sequelize.define('client', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false
})

Client.hasMany(Order,{foreignKey:'id_client',sourceKey:'id'})
Order.belongsTo(Client,{foreignKey:'id_client',sourceKey:'id'})

export default Client