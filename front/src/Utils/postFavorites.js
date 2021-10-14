import axios from "axios";

export default async function postFavorites (id, token){
    var data = JSON.stringify({
        "id_products": id
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:3001/favorite',
        headers: { 
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
}