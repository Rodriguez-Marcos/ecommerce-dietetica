import app from './app.js';
import { sequelize } from './database/db.js'
import '@babel/polyfill'

function main() {
    sequelize.sync({ force: true }).then(() => {
        app.listen(3001, () => {
            console.log('listening on port 3001, prueba de merge' ); // eslint-disable-line no-console
        });
    })
}

main()
 