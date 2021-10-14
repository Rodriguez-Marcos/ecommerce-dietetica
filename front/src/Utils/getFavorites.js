import axios from "axios";

export default async function getFavorites(token){
    var config = {
        method: 'get',
        url: 'http://localhost:3001/favorite',
        headers: { 
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        }}
      return axios(config);
}