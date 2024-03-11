import request from '../utils/request'

export function fetchList(index, pageSize) {
  return request({
    type: 'GET',
    url: '/appUpgrade2',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      index: index,
      pageSize: pageSize
    }
  })
}

export function fetchDetail(appVersion) {
  return request({
    type: 'GET',
    url: '/appUpgradeDetail2',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      appVersion: appVersion
    }
  })
}

export function offlineVersion(appVersion, fileName) {
  return request({
    type: 'GET',
    url: '/doneAppGet2',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      appVersion: appVersion,
      name: fileName
    }
  })
}

export function uploadAPK(form, apkType, appVersion) {
  return request({
    url: '/appUpgradeUpload2',
    method: 'post',
    anync: true,
    contentType: false,
    processData: false,
    data: form,
    params: {
      apkType: apkType,
      appVersion: appVersion
    }
  })
}
