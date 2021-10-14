import axios from 'axios'
function postCarrito(token, products){
  var data = JSON.stringify({
    "products": products,
  });
  var config = {
    method: 'post',
    url: 'http://localhost:3001/cart',
    headers: { 
      'Authorization': 'Bearer '+ token, 
      'Content-Type': 'application/json'
    },
    data
  };
  
      return axios(config)
}

export default postCarrito;