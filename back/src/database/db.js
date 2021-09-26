import { Sequelize } from 'sequelize';
import { Product } from '../models/Product.js';
//import {Client} from '../models/Client.js';
//import {Admin} from '../models/Admin.js';

export const sequelize = new Sequelize(
    // 'brxklsvjharos0qnyuiz',    // DBname
    // 'ulvkmebtpkm3rfqx1uak',    // User
    // 'CTzddK5lec538YZL0MUq',    // Password
    // {
    //   host:'brxklsvjharos0qnyuiz-postgresql.services.clever-cloud.com',
    //   dialect:'postgres',
    //   pool:{
    //     max:5,
    //     min:0,
    //     require:30000,
    //     idle:10000
    //   },
    //   logging:false,
    // }
    'postgres://ulvkmebtpkm3rfqx1uak:CTzddK5lec538YZL0MUq@brxklsvjharos0qnyuiz-postgresql.services.clever-cloud.com/brxklsvjharos0qnyuiz', {
    logging: false, // set to console.log to see the raw SQL queries

}
)