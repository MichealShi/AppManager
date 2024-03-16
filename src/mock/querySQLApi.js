export function fetchList(sql) {
  return new Promise(resolve => {
    const response = {
      data: {
        code: 200,
        data: '查询结果：',
        msg: '操作成功'
      }
    }
    resolve(response)
  })
}
