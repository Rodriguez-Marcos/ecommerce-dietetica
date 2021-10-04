import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js'

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

export default Review