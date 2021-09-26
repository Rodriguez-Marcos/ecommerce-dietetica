import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js';
import Order from './Order.js';
import Diet from './Diet.js';
import Category from './Category.js'

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

Product.belongsToMany(Order, {through: 'product_order',
foreignKey:{
name:'id_product'
}
});
Order.belongsToMany(Product,{through: 'product_order',
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

export default Product