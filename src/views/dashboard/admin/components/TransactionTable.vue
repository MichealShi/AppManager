<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;padding-left: 15px;padding-right: 15px;">
    <el-table-column label="序列号" width="70px">
      <template slot-scope="scope">{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column label="版本号" width="70px">
      <template slot-scope="scope">{{ scope.row.appVersion }}</template>
    </el-table-column>
    <el-table-column label="文件名">
      <template slot-scope="scope">{{ scope.row.fileName }}</template>
    </el-table-column>
    <el-table-column label="创建日期" width="170px">
      <template slot-scope="scope">{{ scope.row.nowTime }}</template>
    </el-table-column>
    <el-table-column width="100px">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'">详情</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  fetchList
} from '../../../../api/appManageApi'

export default {
  /* eslint-disable */
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        console.log('transactionTable data = ' + response.data.list)
        this.list = response.data.list.slice(0, 12)
      })
    }
  }
}
</script>
