var axios = require('axios');

export default async function mercadopago(cart,res){
var data ;
let items = [] ;
 cart.map((x) => items.push({'title': x.name, 'unit_price': x.price, quantity: x.products_cart.quantity}))
 console.log('items',items)
 data = JSON.stringify({items,
  back_urls: {
    "success": "http://localhost:3001/feedback",
    "failure": "http://localhost:3001/feedback",
    "pending": "http://localhost:3001/feedback"
  },
  auto_return: "approved",})
var config = {
  method: 'post',
  url: 'https://api.mercadolibre.com/checkout/preferences?access_token=TEST-5696918278609575-100703-7b51b60c619120f4ad54b55d52a30324-169898531',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  return res.status(200).json(response.data.init_point);
})
.catch(function (error) {
  console.log(error);
})
};
