import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Client from './Client.js'
import Order from './Order.js'


const Address = sequelize.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    others: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    province: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    
}, {
    timestamps: false
})


Client.hasMany(Address,{foreignKey:'id_client',sourceKey:'id'})
Address.belongsTo(Client,{foreignKey:'id_client',sourceKey:'id'})
Order.hasOne(Address,{foreignKey:'id_order',sourceKey:'id'})
Address.belongsToMany(Order,{foreignKey:'id_address',sourceKey:'id'})
export default Address