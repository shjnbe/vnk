import instance from 'axios'
export const API = 'http://vnk.vn/'

var axios = instance.create({
  baseURL: `${API}api/`,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})

const getHeaders = () => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  return headers
}

export function putFetch (url, data, props) {
  let attributes = Object.assign(
    {
      cache: true,
      headers: getHeaders()
    },
    props
  )
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, attributes)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(Error('Error'))
        }
      })
      .catch(e => {
        console.log(`${url} loi -------> `, e)
        reject(e)
      })
  })
}

export function postFetch (url, props, header = {}) {
  const headers = Object.assign(getHeaders(), header)
  return new Promise((resolve, reject) => {
    axios
      .post(url, props, {
        cache: true,
        headers
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => reject(e))
  })
}

export function postLogin(url, props) {
  return new Promise((resolve, reject) => {
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(props),
    // }).then(rs => {console.log(rs); resolve(rs.data)})
    // .catch(e => reject(e))

    url = 'user/login'

    instance.create({
      baseURL: 'http://vnk.vn/api/',
      timeout: 5000,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 403 // default
      },    
      headers: { 'Content-Type': 'application/json' }
    }).post(url, props)
    .then(res => {
      resolve(res.data)
    })
    .catch(e => reject(e))
  })
}

export function postFetchRegister (url, props, header = {}) {
  const headers = Object.assign(getHeaders(), header)
  return new Promise((resolve, reject) => {
    axios
      .post(url, props, {
        cache: true,
        headers,
        validateStatus: status => {
          return status < 500;
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => reject(e))
  })
}

async function postData(url = ``, data = {}) {
  return
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(res => {
      return res.json()
    });
}

export function getFetch (url, props) {
  const attributes = Object.assign(
    {
      headers: getHeaders()
    },
    props
  )
  return new Promise((resolve, reject) => {
    axios
      .get(url, attributes)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => reject(e))
  })
}

export const deleteFetch = (url, props) => {
  const attributes = Object.assign(
    {
      headers: getHeaders()
    },
    props
  )
  return new Promise((resolve, reject) => {
    axios
      .delete(url, attributes)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function uploadFile (url, file) {
  const data = {
    uri: file.uri,
    name: file.fileName,
    type: file.mime
  }

  if (!data.name && file.path) {
    data.name = file.path.replace(/^.*[\\\/]/, "")
  }

  let params = new FormData()
  params.append("file", data)
  return new Promise((resolve, reject) => {
    instance
      .create({
        timeout: 30000
      })
      .post(url, params)
      .then(result => {
        if (result && result.data) {
          resolve(result.data)
        } else {
          reject(Error("Upload fail"))
        }
      })
      .catch(err => reject(err))
  })
}

export function uploadFileCrop (url, file) {
  const data = {
    uri: file.path,
    name: file.fileName,
    type: file.mime
  }

  if (!data.name && file.path) {
    data.name = file.path.replace(/^.*[\\\/]/, "")
  }
  
  let params = new FormData()
  params.append("file", data)
  return new Promise((resolve, reject) => {
    instance
      .create({
        timeout: 30000
      })
      .post(url, params)
      .then(result => {
        if (result && result.data) {
          resolve(result.data)
        } else {
          reject(Error("Upload fail"))
        }
      })
      .catch(err => reject(err))
  })
}
