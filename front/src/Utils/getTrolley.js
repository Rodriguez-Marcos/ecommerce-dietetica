import axios from "axios";

export default async function getTrolley(ids) {
    
    if(!Array.isArray(ids)|| !ids?.length) return [];
    var data = JSON.stringify({
        "id": ids
      });
    var config = {
      method: 'POST',
      url: '/products/getProducts',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    

    return axios(config)
}