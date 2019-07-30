import axios from 'axios'
const KEY = 'AAAAHDeFMH4:APA91bE4R5pOQPFfuDvbi8ha2GrLcSsFwuLcl_oGUUt8FTiCyLz-F4ahFtksDloCSn59JwTR_E9gJHunqaNfJ36rCuWsNFRyqjcslOdG61sOFOuxAUC9dNaVwq7zjDJy5mPj7MaJ6IVL'
const API_URL = 'https://fcm.googleapis.com/fcm/send';

class FirebaseClient {
  async send(props) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `key=${KEY}`
    }
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL, props, {
          cache: true,
          headers
        })
        .then(res => {
          console.log('fcm-send', res)
          resolve(res.data)
        })
        .catch(e => {
          console.log('fcm-send', e.message)
          reject(e)
        })
    })
  }
}

let firebaseClient = new FirebaseClient();
export default firebaseClient;