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
        allowNull: true,
        defaultValue: null
    },
    shippingAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    createDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
    },
    status: {
        type: Sequelize.TEXT,
        values:["creada","procesando","cancelada","completa"],
        defaultValue: "creada"
    },
}, {
    timestamps: false
})

export default Order