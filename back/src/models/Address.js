import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Client from './Client.js'
import Order from './Order.js'
import Cart from './Cart.js'


const Address = sequelize.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    calle: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    altura: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    barrio: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    otros: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    codigo: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
}, {
    timestamps: false
})


Client.hasMany(Address,{foreignKey:'id_client',sourceKey:'id'})
Address.belongsTo(Client,{foreignKey:'id_client',sourceKey:'id'})
Address.hasMany(Cart,{foreignKey:'id_address',sourceKey:'id'})
Cart.belongsTo(Address,{foreignKey:'id_address',sourceKey:'id'})
Address.hasMany(Order,{foreignKey:'shippingAddress',sourceKey:'id'})
Order.belongsTo(Address,{foreignKey:'shippingAddress',sourceKey:'id'})
export default Address