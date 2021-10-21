import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Product from './Product.js'



const Store = sequelize.define('store', {
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
    }
}, {
    timestamps: false
})


Product.belongsToMany(Store, {
    through: 'product_store',
    foreignKey: {
        name: 'id_product'
    }
});
Store.belongsToMany(Product, {
    through: 'product_store',
    foreignKey: {
        name: 'id_store'
    }
});
export default Store