import request from '../utils/request'

export function searchLogByPid(pid) {
  console.log('pid = ' + pid)
  return request({
    type: 'GET',
    url: '/searchLogById',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      pid : pid
    }
  })
}
export function filterLogAnalyse(id, startTime, endTime, filter) {
  return request({
    type: 'GET',
    url: '/filterLogAnalyse',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback:'data',

    /* eslint-disable */
    responseType:'application/json',
    params: {
      id : id,
      startTime : startTime,
      endTime : endTime,
      filter : filter
    }
  })
}
