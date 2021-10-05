import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js';
import Order from './Order.js';
import Diet from './Diet.js';
import Category from './Category.js'
import Review from './Review.js'
import Product_Order from './Product_Order.js'

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
})

Product.belongsToMany(Order, {through: Product_Order,
foreignKey:{
name:'id_product'
}
});
Order.belongsToMany(Product,{through: Product_Order,
  foreignKey:{
name: 'id_order' 
}
});
Product.belongsToMany(Diet, {through: 'product_diet',
foreignKey:{
name:'id_product'
}
});
Diet.belongsToMany(Product,{through: 'product_diet',
  foreignKey:{
name: 'id_diet' 
}
});
Product.belongsToMany(Category, {through: 'product_category',
foreignKey:{
name:'id_product'
}
});
Category.belongsToMany(Product,{through: 'product_category',
  foreignKey:{
name: 'id_category' 
}
});
Product.hasMany(Review,{foreignKey:'id_product',sourceKey:'id'})
Review.belongsTo(Product,{foreignKey:'id_product',sourceKey:'id'})

export default Product