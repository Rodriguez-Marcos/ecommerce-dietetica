import mercadopago from 'mercadopago';

mercadopago.configure({
    access_token: 'TEST-5696918278609575-100703-7b51b60c619120f4ad54b55d52a30324-169898531'
  });


export default function Mercadopago (cartItems) {
    return new Promise(async (resolve, reject) => {
        try {
          let preference = {
            back_urls: {
              success: "http://localhost:3000/home/pay/success",
              failure: "http://localhost:3000/home/pay/failure",
              pending: "http://localhost:3000/home/pay/pending",
            },
            auto_return: "approved",
            items: []   
          };
    
          for(let i=0; i<cartItems.length; i++){
            let title = cartItems[i].name;
            let unit_price = cartItems[i].price;
            let cantidad = parseInt(cartItems[i].stockSelected);
            let quantity = cantidad;
            preference.items.push({title, unit_price,quantity})
          }
          const wii = await mercadopago.preferences.create(preference);
          resolve(wii);
        } catch (err) {
          reject(err);
        }
      });
}