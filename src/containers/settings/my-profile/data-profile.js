export default [
  {
    key: 'phone',
    first: true,
    title: 'Mobile',
    isCall: true,
    ico: require('images/globe/phone.png'),
    ico1: require('images/globe/message.png'),
    navKey: 'phone',
    nav1Key: 'message'
  },
  {
    key: 'email',
    title: 'Email',
    // ico: require('images/globe/phone.png'),
    ico1: require('images/globe/message.png'),
    nav1Key: 'email'
  },
  {
    key: 'tel_office',
    title: 'Tel (office)',
    ico: require('images/globe/phone.png'),
    ico1: require('images/globe/message.png'),
    navKey: 'phone',
    nav1Key: 'message'
  },
  {
    key: 'address_office',
    title: 'Địa chỉ (office)',
    ico: require('images/globe/map.png'),
    navKey: 'mapContainer'
  },
  {
    key: 'address',
    title: 'Địa chỉ (nhà)',
    ico: require('images/globe/map.png'),
    navKey: 'mapContainer'
    
  },
  {
    key: 'city',
    title: 'Thành phố'
  },
  {
    key: 'company',
    title: 'Công ty'
  },
  {
    key: 'note',
    title: 'Ghi chú',
    isArea: true
  }
]
