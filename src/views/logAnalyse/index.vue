<template>
  <div
    v-loading="loading"
    style="padding-left: 20px;padding-right: 20px;padding-top: 20px">
    <el-row style="width: 100%">
      <el-col :span="24">
        <el-input
          id="searchInput"
          v-model="searchStr"
          placeholder="请输入唯一设备号"
          size="small"
          clearable
          autocomplete="on"
          maxlength="20"
          style="width: 360px; margin-left: 10px"/>
        <el-button
          icon="el-icon-search"
          circle
          style="margin-left: 5px; width: 36px; height: 36px;"
          @click.native="searchCrash()"/>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      empty-text="暂无数据"
      style="width: 100%;padding-top: 15px;"
      stripe>
      <el-table-column
        label="ID"
        width="70px">
        <template slot-scope="scope"><span style="font-size: 13px">{{ scope.row.id }}</span></template>
      </el-table-column>
      <el-table-column
        label="下载地址">
        <template slot-scope="scope"><span style="font-size: 13px; color: #3A71A8">http://applog.nauproject.com/appSupport/download/logFile?fileKey={{ scope.row.file_url }}</span></template>
      </el-table-column>
      <el-table-column
        label="上传时间"
        width="170px">
        <template slot-scope="scope"><span style="font-size: 13px">{{ scope.row.upload_time }}</span></template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="170px">
        <template slot-scope="scope"><span style="font-size: 13px">{{ scope.row.create_time }}</span></template>
      </el-table-column>
      <el-table-column
        label="查看"
        width="100%"
        align="left">
        <template slot-scope="scope">
          <router-link :to="'/logAnalyse/detail?id='+scope.row.id">查看详情</router-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      align="right"
      style="margin-top: 20px;padding-right: 30px;margin-bottom: 5px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import {
  searchLogByPid
} from '../../mock/logAnalyseApi'

export default {
  filters: {
    formatDateTime: function(value) {
      const d = new Date(value)
      let month = d.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let date = d.getDate()
      if (date < 10) {
        date = '0' + date
      }
      return d.getFullYear() + '-' + month + '-' + date + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
  },
  data() {
    return {
      searchStr: '',
      loading: false,
      list: null,
      totalCount: 0,
      startTime: '-1',
      endTime: '-1',
      pageIndex: 0,
      pageSize: 10
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      searchLogByPid(this.pageIndex, this.pageSize).then(response => {
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list
          this.totalCount = response.data.totalCount
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageIndex = this.pageSize * (val - 1)
      this.fetchData()
    },
    searchCrash() {
      this.pageIndex = 0
      const pid = document.getElementById('searchInput').value
      if (pid == null || pid === '') {
        this.$message.warning('输入内容为空')
        return
      }
      this.loading = true
      searchLogByPid(pid).then(response => {
        console.log('osException data = ' + response.data.list)
        this.list = response.data.list
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
</style>

