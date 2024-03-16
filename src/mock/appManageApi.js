export function fetchList(index, pageSize) {
  const data = []
  for (let i = 1; i < 10; i++) {
    const nowTime = '2024-01-0' + i + ' 10:00:00'
    const appVersion = '1.0.' + i
    const fileName = 'V' + appVersion + '.apk'
    data[i] = {
      id: i,
      appVersion: appVersion,
      nowTime: nowTime,
      fileName: fileName
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        list: data
      }
    }
    resolve(response)
  })
}

export function fetchDetail(appVersion) {
  const data = []
  for (let i = 1; i < 2; i++) {
    const nowTime = '2024-01-0' + i + ' 10:00:00'
    const fileName = 'V' + appVersion + '.apk'
    data[i] = {
      id: i,
      channel: 99,
      fileSize: 123098129,
      appVersion: appVersion,
      nowTime: nowTime,
      lastTime: nowTime,
      fileName: fileName
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        list: data
      }
    }
    resolve(response)
  })
}

export function offlineVersion(appVersion, fileName) {
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

export function uploadAPK(form, apkType, appVersion) {
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
