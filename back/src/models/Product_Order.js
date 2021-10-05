import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'

const Product_Order = sequelize.define('products_order', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

export default Product_Order