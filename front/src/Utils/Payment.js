import axios from 'axios'


export default async function payment(token){
    var data = JSON.stringify({
        "payment": "mercadopago"
      });
      
      var config = {
        method: 'post',
        url: '/payment',
        headers: { 
          'Authorization': 'Bearer ' + token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        return(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}


