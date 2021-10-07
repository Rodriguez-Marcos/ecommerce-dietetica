import axios from 'axios'


export default async function payment(token){
    var data = JSON.stringify({
        "payment": "mercadopago"
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:3001/payment',
        headers: { 
          'Authorization': 'Bearer ' + token, 
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


