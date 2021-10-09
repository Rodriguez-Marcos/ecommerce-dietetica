import axios from "axios";
import Cookies from "universal-cookie";
import getTrolley from "./getTrolley";

let cookies = new Cookies(); 

export default async function getCart( token ){
    var config = {
        method: 'get',
        url: 'http://localhost:3001/cart',
        headers: { 
          'Authorization': 'Bearer '+ token
        }
      };
      
      axios(config)
      .then(function (response) {
        let productsId =  response.data[0].products.map(x=>{return{id:x.id,quantity: x.products_cart.quantity}});
        let handleCookies = Array.isArray(cookies.get("trolley"))?cookies.get('trolley'):[]
        let hash = {};
        cookies.set('trolley',[...productsId,...handleCookies].filter(o => hash[o.id] ? false : hash[o.id] = true));
        getTrolley(productsId)
      })
      .catch(function (error) {
        console.log(error);
      });
      
}