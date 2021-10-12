import axios from 'axios'
function postCarrito(token, products){
  var data = JSON.stringify({
    "products": products,
  });
  var config = {
    method: 'post',
    url: '/cart',
    headers: { 
      'Authorization': 'Bearer '+ token, 
      'Content-Type': 'application/json'
    },
    data
  };
  
  console.log('fui yo')
      axios(config)
      .then(function (response) {
        console.log('actualizado con exito');
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default postCarrito;