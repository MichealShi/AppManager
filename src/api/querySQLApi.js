import request from '../utils/request'

export function fetchList(sql) {
  return request({
    type: 'GET',
    url: '/querySQL',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      sql: sql
    }
  })
}
