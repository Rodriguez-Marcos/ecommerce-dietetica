import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Order from './Order.js'
const Clientbygoogle = sequelize.define('clientbygoogle', {
    googleId: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    givenName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    familyName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false
})

Clientbygoogle.hasMany(Order,{foreignKey:'googleId_client',sourceKey:'googleId'})
Order.belongsTo(Clientbygoogle,{foreignKey:'googleId_client',sourceKey:'googleId'})

export default Clientbygoogle