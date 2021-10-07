import axios from "axios";

export default async function getTrolley(ids) {
    
    if(!Array.isArray(ids)|| !ids?.length) return [];
    var data = JSON.stringify({
        "id": ids
      });
    console.log('ids:',ids)

    var config = {
      method: 'POST',
      url: 'http://localhost:3001/products/getProducts',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    

    return axios(config)
}