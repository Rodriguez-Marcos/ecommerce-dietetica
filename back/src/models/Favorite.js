import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Product from './Product.js'
import Client from './Client.js'
import Clientbygoogle from './Clientbygoogle.js'

const Favorite = sequelize.define('favorite', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false
})

Product.belongsToMany(Favorite, {through: 'product_favorite',
foreignKey:{
name:'id_product'
}
});
Favorite.belongsToMany(Product,{through: 'product_favorite',
  foreignKey:{
name: 'id_favorite' 
}
});
Client.hasOne(Favorite,{foreignKey:'id_client',sourceKey:'id'})
Favorite.belongsTo(Client,{foreignKey:'id_client',sourceKey:'id'})
Clientbygoogle.hasOne(Favorite,{foreignKey:'id_clientGoogle',sourceKey:'googleId'})
Favorite.belongsTo(Clientbygoogle,{foreignKey:'id_clientGoogle',sourceKey:'googleId'})
export default Favorite