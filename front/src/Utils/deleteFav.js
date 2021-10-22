import axios from "axios";

export default async function deleteFavorites (id, token){
    var data = JSON.stringify({
        "id_products": id
      });
      
      var config = {
        method: 'delete',
        url: 'http://localhost:3001/favorite',
        headers: { 
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return setTimeout(()=>axios(config),600)
}