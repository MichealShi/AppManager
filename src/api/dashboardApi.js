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
  return request({
    type: 'GET',
    url: '/getNetErrorDailyList',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      recentDay: recentDay
    }
  })
}
export function getExceptionDailyList(recentDay) {
  return request({
    type: 'GET',
    url: '/queryExceptionChartLineData',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      recentDay: recentDay
    }
  })
}
