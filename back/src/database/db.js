import { Sequelize } from 'sequelize';
require('dotenv').config()

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env;

export const sequelize = process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgresql",
        host: DB_HOST,
        port: 6013,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
    })
    : new Sequelize(
        `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:6013/bndlhxxrg7jx3ufyrw45`,
        {
            logging: false, // set to console.log to see the raw SQL queries

<<<<<<< HEAD
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
    'postgresql://ulvkmebtpkm3rfqx1uak:CTzddK5lec538YZL0MUq@bndlhxxrg7jx3ufyrw45-postgresql.services.clever-cloud.com:6013/bndlhxxrg7jx3ufyrw45', {
    logging: false, // set to console.log to see the raw SQL queries
    })
=======
        }
    )

>>>>>>> ece1a3b3970d5560cbfb74d0bc81a0f67fb241f6
   
    
// export const sequelize = new Sequelize(
//     {DB_NAME},    // DBname
//     {DB_USER},    // User
//     {DB_PASSWORD}, 
//        // Password
//     {
//       host:{DB_HOST},
//       dialect:'postgres',
//       pool:{
//         max:5,
//         min:0,
//         require:30000,
//         idle:10000
//       },
//       logging:false,
//     }
//     , {
//     logging: false, // set to console.log to see the raw SQL queries

// }
// )
