import { CompareArrowsOutlined } from '@material-ui/icons';
import axios from 'axios'
function postCarrito(token, products){
  var data = JSON.stringify({
    "products": products,
  });
  console.log(products)
  var config = {
    method: 'post',
    url: '/cart',
    headers: { 
      'Authorization': 'Bearer '+ token, 
      'Content-Type': 'application/json'
    },
    data
  };
  
      return axios(config)
}

export default postCarrito;