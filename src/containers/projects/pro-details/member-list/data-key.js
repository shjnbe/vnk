
export default  {
  list :[
    {
    key: 'phone',
    first: true,
    title: 'Mobile',
    isCall: true,
    ico: require('../../../../images/globe/phone.png'),
    ico1: require('../../../../images/globe/message.png'),
    navKey: 'phone',
    nav1Key: 'message'
  },
  {
    key: 'email',
    title: 'Email',
    // ico: require('../../../../images/globe/phone.png'),
    ico1: require('../../../../images/globe/message.png'),
    nav1Key: 'email'
  },
  {
    key: 'type',
    title: 'Vai trò'
  },
  {
    key: 'company',
    title: 'Công ty'
  },
  {
    key: 'address',
    title: 'Địa chỉ (nhà)',
    ico: require('../../../../images/globe/map.png'),
    navKey: 'mapContainer'
    
  }
]
,
  keys: {
    full_name: '',
    position: '',
    type: '',
    avatar: '',
    company: '',
    phone: '',
    email: '',
    address: '',
  }
}