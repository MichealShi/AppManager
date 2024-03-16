export function searchLogByPid(pid) {
  console.log('pid = ' + pid)
  const data = []
  for (let i = 0; i < 2; i++) {
    const create_time = '2024-01-01' + ' 09:59:23'
    const upload_time = '2024-01-0' + i + ' 10:00:00'
    const appVersion = '1.0.' + i
    const fileName = 'V' + appVersion + '.apk'
    data[i] = {
      id: i,
      file_url: '20140101145708.log',
      appVersion: appVersion,
      create_time: create_time,
      upload_time: upload_time,
      fileName: fileName
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        totalCount: 10,
        list: data
      }
    }
    resolve(response)
  })
}
export function filterLogAnalyse(id, startTime, endTime, filter) {
  const data = []
  for (let i = 0; i < 2; i++) {
    const create_time = '2024-01-01' + ' 09:59:23'
    const upload_time = '2024-01-0' + i + ' 10:00:00'
    const appVersion = '1.0.' + i
    const fileName = 'V' + appVersion + '.apk'
    data[i] = {
      id: i,
      file_url: '20140101145708.log',
      c: '接口地址：https://app.nauproject.com/C1000/M1001\n' +
        '{\n' +
        '  "code": 1001,\n' +
        '  "msg": "手机号不能为空",\n' +
        '  "info": null,\n' +
        '  "traceId": "1hb7nvkatw6rw3tcp9lj2b691ge2sm6p"\n' +
        '}',
      f: 1,
      l: create_time,
      appVersion: appVersion,
      upload_time: upload_time,
      fileName: fileName
    }
  }
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        totalCount: 10,
        list: data
      }
    }
    resolve(response)
  })
}
