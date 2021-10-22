import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Order from './Order.js'


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

Sucursal.hasMany(Order,{foreignKey:'id_store',sourceKey:'id'})
Order.belongsTo(Sucursal,{foreignKey:'id_store',sourceKey:'id'})
export default Sucursal