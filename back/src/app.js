import express, { json } from 'express';
import morgan from 'morgan';
const cors = require('cors');

//Importing routes 
import Productroutes from './routes/product.js';
import Clientroutes from './routes/client.js'
import Orderroutes from './routes/order.js'
import Categoryroutes from './routes/category.js'
import Dietroutes from './routes/diet.js'
import Login from './routes/login.js';
import Cart from './routes/cart.js';
import Reviewroutes from './routes/review.js'
import Favoriteroutes from './routes/favorite.js'
import Cartroutes from './routes/cart.js'
import useExtractor from './middleware/useExtractor.js';
import Payment from './routes/payment'

const app = express()



app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
app.use(json()); //entiende archivos en formato json
app.use(morgan('dev')); // muestra por consola lo que va llegando

app.use('/products', Productroutes);
app.use('/clients', Clientroutes);
app.use('/orders', Orderroutes);
app.use('/categories', Categoryroutes);
app.use('/diets', Dietroutes);
app.use('/login', Login);
app.use('/addCart',Cart)
app.use('/reviews',useExtractor, Reviewroutes)
app.use('/favorite',useExtractor, Favoriteroutes)
app.use('/cart',useExtractor,Cartroutes)
app.use('/payment', useExtractor, Payment)




export default app