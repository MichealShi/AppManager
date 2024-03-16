import request from '../utils/request'

export function getNetErrorCount(time) {
  return request({
    type: 'GET',
    url: '/getNetErrorCount',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      time: time
    }
  })
}

export function getNetErrorCodeList(time) {
  return request({
    type: 'GET',
    url: '/getNetErrorCodeList',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      time: time
    }
  })
}

export function getNetErrorAddressList(time) {
  return request({
    type: 'GET',
    url: '/getNetErrorAddressList',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      time: time
    }
  })
}

export function getNetErrorDailyList(recentDay) {
  const data = [];
  for (let i = 0; i < recentDay; i++) {
    const date = "2024/1/" + (i + 1)
    const max = 120
    const min = 10
    const count403 = Math.floor(Math.random() * (max - min + 1) + min)
    const count404 = Math.floor(Math.random() * (max - min + 1) + min)
    const count500 = Math.floor(Math.random() * (max - min + 1) + min)
    const count801 = Math.floor(Math.random() * (max - min + 1) + min)
    const count = count403 + count404 + count500 + count801
    data[i] = {
      dateTime: date,
      count: count,
      '403': count403,
      '404': count404,
      '500': count500,
      '801': count801
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        codeList: [
          {
            httpCode: '403',
          },
          {
            httpCode: '404',
          },
          {
            httpCode: '500',
          },
          {
            httpCode: '801',
          }
        ],
        list: data
      }
    }
    resolve(response)
  })
}

export function getExceptionDailyList(recentDay) {
  const data = [];
  for (let i = 0; i < recentDay; i++) {
    const date = "2024/1/" + (i + 1)
    const max = 120
    const min = 10
    const count100 = Math.floor(Math.random() * (max - min + 1) + min)
    const count101 = Math.floor(Math.random() * (max - min + 1) + min)
    const count102 = Math.floor(Math.random() * (max - min + 1) + min)
    const count103 = Math.floor(Math.random() * (max - min + 1) + min)
    const count104 = Math.floor(Math.random() * (max - min + 1) + min)
    const count = count100 + count101 + count102 + count103 + count104
    data[i] = {
      dateTime: date,
      count: count,
      'V1.0.0': count100,
      'V1.0.1': count101,
      'V1.0.2': count102,
      'V1.0.3': count103,
      'V1.0.4': count104
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        versionList: [
          {
            appVersion: 'V1.0.0',
          },
          {
            appVersion: 'V1.0.1',
          },
          {
            appVersion: 'V1.0.2',
          },
          {
            appVersion: 'V1.0.3',
          },
          {
            appVersion: 'V1.0.4',
          }
        ],
        list: data
      }
    }
    resolve(response)
  })
}
