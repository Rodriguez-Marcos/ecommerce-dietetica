import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'

const Product_Cart = sequelize.define('products_cart', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
})

export default Product_Cart