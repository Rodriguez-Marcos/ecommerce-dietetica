import app from './app.js';
import { sequelize } from './database/db.js'
import "core-js/stable";
import "regenerator-runtime/runtime";

function main() {
    sequelize.sync({ force: false }).then(() => {
        app.listen(3001, () => {

            console.log('listening on port 3001'); // eslint-disable-line no-console

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