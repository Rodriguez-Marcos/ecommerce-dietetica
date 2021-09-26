import express, { json } from 'express';
import morgan from 'morgan';

//Importing routes 
import Productroutes from './routes/product.js';
import Clientroutes from './routes/client.js'
import Orderroutes from './routes/order.js'
import Categoryroutes from './routes/category.js'
import Dietroutes from './routes/diet.js'

const app = express();

//Middleware
app.use(json()); // muestra por consola lo que va llegando
app.use(morgan('dev')); //entiende archivos en formato json

app.use('/products', Productroutes);
app.use('/clients', Clientroutes);
app.use('/orders', Orderroutes);
app.use('/categories', Categoryroutes);
app.use('/diets', Dietroutes);

export default app