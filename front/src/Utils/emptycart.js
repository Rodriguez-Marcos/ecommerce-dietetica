import axios from 'axios'
import Cookies from "universal-cookie";


let cookies = new Cookies(); 

export default function emptycart (token){
  cookies.set('trolley',[])

    var config = {
        method: 'get',
        url: '/payment/success',
        headers: { 
          'Authorization': 'Bearer '+ token
        }
      };
      
      axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
      

}