export function fetchList(index, pageSize, appUid) {
  const data = []
  for (let i = 1; i < 10; i++) {
    const nowTime = '2024-01-0' + i + ' 10:00:00'
    const appVersion = '1.0.' + i
    const version_name = '00' + i
    const fileName = 'V' + appVersion + '.apk'
    data[i] = {
      id: i,
      appHash: '8237492203423234',
      version_name: version_name,
      appVersion: appVersion,
      create_date: nowTime,
      md5: 'JKAHSD1237987',
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

export function queryHotFixVersions() {
  const data = []
  for (let i = 1; i < 10; i++) {
    const version_name = '00' + i
    data[i] = {
      appHash: '8237492203423234',
      version_name: version_name
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

export function addAppVersion(appUid, appHash, versionName) {
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

export function addTestPhone(deviceID) {
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

export function uploadHotFixAPK(form) {
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

export function fetchHotFixDetail(md5) {
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        fileName: 'hotfix1.0.patch',
        fileSize: 12342349,
        appHash: 'JAKHLDADHALKJDHALKDASHH',
        appVersion: '1.0.1',
        patchDesc: '修复首页显示问题',
        patchMd5: 'HKJAD1233242',
        createTime: '2024-01-01 10:00:00',
        openTime: '2024-01-01 10:30:00',
        successCount: 99898,
        failCount: 102,
        successRate: '99.98%',
        status: '1',
        msg: '操作成功'
      }
    }
    resolve(response)
  })
}

/**
 * 更新补丁状态
 * @param md5 补丁md值
 * @param update 0；未发布；1:发布全部；4:停止发布；6:发布测试补丁；
 */
export function updateHotFixStatus(md5, update) {
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
