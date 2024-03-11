import request from '../utils/request'

export function fetchList(index, pageSize, appUid) {
  return request({
    type: 'GET',
    url: '/hotFixList',
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
      pageSize: pageSize,
      appUid: appUid
    }
  })
}
export function queryHotFixVersions() {
  return request({
    type: 'GET',
    url: '/queryHotFixVersions',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json'
  })
}

//新增App版本
export function addAppVersion(appUid, appHash, versionName) {
  return request({
    type: 'GET',
    url: '/addHotFixAppVersion',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      appUid: appUid,
      appHash: appHash,
      versionName: versionName
    }
  })
}

//添加测试手机
export function addTestPhone(deviceID) {
  return request({
    type: 'GET',
    url: '/addHotFixTestPhone',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      deviceID: deviceID
    }
  })
}

export function uploadHotFixAPK(form) {
  return request({
    url: '/uploadHotFixApk',
    method: 'post',
    anync: true,
    contentType: false,
    processData: false,
    data: form
  })
}

//补丁详情
export function fetchHotFixDetail(md5) {
  return request({
    type: 'GET',
    url: '/patchDetail2',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      md5: md5
    }
  })
}

/**
 * 更新补丁状态
 * @param md5 补丁md值
 * @param update 0；未发布；1:发布全部；4:停止发布；6:发布测试补丁；
 */
export function updateHotFixStatus(md5, update) {
  return request({
    type: 'GET',
    url: '/updatePatchStatus2',
    method: 'get',
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp',
    /* eslint-disable */
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      md5: md5,
      update: update
    }
  })
}
