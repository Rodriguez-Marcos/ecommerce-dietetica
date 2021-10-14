import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'
import Client from '../models/Client.js';

const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  calification: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT, 
    allowNull: false,
  }},
 {
    timestamps: false
})
Client.hasMany(Review,{foreignKey:'id_client',sourceKey:'id'})
Review.belongsTo(Client,{foreignKey:'id_client',sourceKey:'id'})
export default Review