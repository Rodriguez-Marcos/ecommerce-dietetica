import app from './app.js';
import { sequelize } from './database/db.js'
<<<<<<< HEAD
import '@babel/polyfill'
=======
// import '@babel/polyfill'
// require("babel/polyfill");
import "core-js/stable";

// const { DB_PORT } = process.env;
require ('dotenv').config();
const { PORT } = process.env;

>>>>>>> ece1a3b3970d5560cbfb74d0bc81a0f67fb241f6

  
function main() {
    sequelize.sync({ force: false }).then(() => {
<<<<<<< HEAD
        app.listen(3001, () => {

            console.log('listening on port 3001'); // eslint-disable-line no-console
=======
        app.listen(PORT , () => {
            console.log( PORT); // eslint-disable-line no-console
>>>>>>> ece1a3b3970d5560cbfb74d0bc81a0f67fb241f6

        });
    })
}
main()


// function main() {
//     sequelize.sync({ force: false }).then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log('listening on port 3001'); // eslint-disable-line no-console

//         });
//     })
// }
// main()