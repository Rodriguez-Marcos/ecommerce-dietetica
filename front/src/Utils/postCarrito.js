import axios from 'axios'
function postCarrito(token, products){
    var data = JSON.stringify({
        "products": products,
      });
      console.log('data: ',products)
      
      var config = {
        method: 'post',
        url: 'http://localhost:3001/cart',
        headers: { 
          'Authorization': 'Bearer '+ token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default postCarrito;