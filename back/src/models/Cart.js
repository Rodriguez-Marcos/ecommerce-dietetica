import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Product from './Product.js'
import Client from './Client.js'


const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null}
}, {
    timestamps: false
})


Client.hasOne(Cart,{foreignKey:'id_client',sourceKey:'id'})
Cart.belongsTo(Client,{foreignKey:'id_client',sourceKey:'id'})
export default Cart