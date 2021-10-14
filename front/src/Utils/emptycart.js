import axios from 'axios'
import Cookies from "universal-cookie";


let cookies = new Cookies(); 

export default function emptycart (token){

    var config = {
        method: 'get',
        url: 'http://localhost:3001/payment/success',
        headers: { 
          'Authorization': 'Bearer '+ token
        }
      };
      
      axios(config)
      .then(function (response) {
        cookies.set('trolley',[])
      })
      .catch(function (error) {
        console.log(error);
      });
      

}