import axios from "axios";

export default async function removePC (token, id_products){

    var data = JSON.stringify({
        "id_products": id_products
      });
      
      var config = {
        method: 'delete',
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