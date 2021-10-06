import axios from "axios";
import Cookies from "universal-cookie";

let cookies = new Cookies(); 

export default async function ( token ){
    var config = {
        method: 'get',
        url: 'http://localhost:3001/cart',
        headers: { 
          'Authorization': 'Bearer '+ token
        }
      };
      
      axios(config)
      .then(function (response) {
        cookies.set('trolley',response.data[0].products);
      })
      .catch(function (error) {
        console.log(error);
      });
      
}