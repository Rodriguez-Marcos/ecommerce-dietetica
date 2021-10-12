import app from './app.js';
import { sequelize } from './database/db.js'
// import '@babel/polyfill'
// require("babel/polyfill");
import "core-js/stable";

// const { DB_PORT } = process.env;
require ('dotenv').config();
const { PORT } = process.env;


  
function main() {
    sequelize.sync({ force: false }).then(() => {
        app.listen(PORT , () => {
            console.log( PORT); // eslint-disable-line no-console

        });
    })
}
main()

