import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'

const Diet = sequelize.define('diet', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
}, {
    timestamps: false
})

export default Diet