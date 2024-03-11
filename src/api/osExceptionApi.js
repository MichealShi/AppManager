import request from '../utils/request'

export function fetchList(index, pageSize, recentDay) {
  return request({
    type: 'GET',
    url: '/osException2',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      index : index,
      pageSize: pageSize,
      recentDay: recentDay
    }
  })
}

export function fetchFilterList(index, pageSize, system, version, status, us, recentDay) {
  return request({
    type: 'GET',
    url: '/filterException',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      index : index,
      pageSize: pageSize,
      system: system,
      version: version,
      status: status,
      recentDay: recentDay,
      us: us
    }
  })
}

export function searchException(index, pageSize, str) {
  return request({
    type: 'GET',
    url: '/searchException',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      index : index,
      pageSize: pageSize,
      str : str
    }
  })
}

export function queryExceptionById(id) {
  console.log('id = ' + id)
  return request({
    type: 'GET',
    url: '/queryExceptionById',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      id : id
    }
  })
}

export function updateCrashStatus(status, exceptionType) {
  return request({
    type: 'GET',
    url: '/updateCrashStatus',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      status : status,
      exceptionType: exceptionType
    }
  })
}
