import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'


const Sucursal = sequelize.define('sucursal', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    src: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

}, {
    timestamps: false
})


export default Sucursal