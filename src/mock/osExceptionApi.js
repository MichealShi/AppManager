import request from '../utils/request'

export function fetchList(index, pageSize, recentDay) {
  const data = []
  for (let i = 0; i < 10; i++) {
    const update_time = '2024-01-0' + i + ' 10:00:00'
    const appVersion = '1.0.1'
    data[i] = {
      id: i,
      exceptionType: 1,
      appVersion: appVersion,
      ct: Math.floor(Math.random() * (100) + 1),
      update_time: update_time,
      exceptionStrShort: 'IllegalStateException: This Activity already has an action bar supplied by the window decor\n' +
        'Caused by: java.lang.IllegalStateException: This Activity already has an action bar supplied by the window decor. Do not request Window.FEATURE_SUPPORT_ACTION_BAR and set',
      hotfixStr: '未修复'
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        totalCount: 10,
        versionList: [
          {
            appVersion: '1.0.0'
          }, {
            appVersion: '1.0.1'
          }, {
            appVersion: '1.0.3'
          }
        ],
        usList: [
          {
            us: '11'
          }, {
            us: '12'
          }, {
            us: '33'
          }
        ],
        list: data
      }
    }
    resolve(response)
  })
}

export function fetchFilterList(index, pageSize, system, version, status, statusStr, us, recentDay) {
  const data = []
  for (let i = 0; i < 10; i++) {
    const update_time = '2024-01-0' + i + ' 10:00:00'
    const appVersion = (version === '-1') ? '1.0.1' : version
    data[i] = {
      id: i,
      exceptionType: 1,
      us: (us === '-1') ? '11' : us,
      appVersion: appVersion,
      ct: Math.floor(Math.random() * (100) + 1),
      update_time: update_time,
      exceptionStrShort: 'IllegalStateException: This Activity already has an action bar supplied by the window decor\n' +
        'Caused by: java.lang.IllegalStateException: This Activity already has an action bar supplied by the window decor. Do not request Window.FEATURE_SUPPORT_ACTION_BAR and set',
      hotfixStr: (status === '-1') ? '未修复' : statusStr
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        totalCount: 10,
        versionList: [
          {
            appVersion: '1.0.0'
          }, {
            appVersion: '1.0.1'
          }, {
            appVersion: '1.0.3'
          }
        ],
        usList: [
          {
            us: '11'
          }, {
            us: '12'
          }, {
            us: '33'
          }
        ],
        list: data
      }
    }
    resolve(response)
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
    jsonpCallback: 'data',

    /* eslint-disable */
    responseType: 'application/json',
    params: {
      index: index,
      pageSize: pageSize,
      str: str
    }
  })
}

export function queryExceptionById(id) {
  console.log('id = ' + id)
  const data = []
  for (let i = 0; i < 10; i++) {
    const update_time = '2024-01-0' + i + ' 10:00:00'
    const appVersion = '1.0.1'
    data[i] = {
      id: i,
      us: '5738',
      pid: '35123897234234',
      exceptionType: '938402934801',
      osName: 'Android',
      eventtime: update_time,
      phoneModel: 'P10',
      osVersion: 'Android 14',
      phone: '186****0001',
      userId: '186****0001',
      appVersion: appVersion,
      ct: Math.floor(Math.random() * (100) + 1),
      update_time: update_time,
      exceptionStr: 'IllegalStateException: This Activity already has an action bar supplied by the window decor\n' +
        'Caused by: java.lang.IllegalStateException: This Activity already has an action bar supplied by the window decor. Do not request Window.FEATURE_SUPPORT_ACTION_BAR and set',
      hotfixStr: '未修复'
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        totalCount: 9,
        list: data
      }
    }
    resolve(response)
  })
}

export function updateCrashStatus(status, exceptionType) {
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        msg: '操作成功'
      }
    }
    resolve(response)
  })
}
