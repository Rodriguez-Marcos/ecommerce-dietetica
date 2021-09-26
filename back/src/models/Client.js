import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'

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
}, {
    timestamps: false
})

export default Client