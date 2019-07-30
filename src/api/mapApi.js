import axios from 'axios'
import { get } from 'lodash'
export default {
  getLocation: async address => {
    try {
      const data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          key: 'AIzaSyDrT8_jdiZAESCokeZ_4teXhb1u6uWRCeI',
          address
        }
      })
      const location = get(data, 'data.results[0].geometry.location')      
      if (location) {
        return {
          latitude: location.lat,
          longitude: location.lng
        }
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
