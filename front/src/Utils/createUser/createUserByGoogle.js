import axios from "axios"
export default async function createUserByGoogle( googleId, token) {
    var data = JSON.stringify({
        googleId
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:3001/clients/bygoogle',
        headers: { 
          'Authorization': 'Bearer '+ token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
        

};