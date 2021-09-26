import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ammount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    shippingAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    createDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    },
}, {
    timestamps: false
})

export default Order