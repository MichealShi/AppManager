<template>
  <div
    v-loading="loading"
    style="padding: 20px;">
    <div>
      <h5>最近一次上报</h5>
      <div style="font-size: 13px; color: #8b8b8b; margin-top: 10px;">MD5值:{{ list[0].exceptionType }} 首次发生:{{ list[0].eventtime }} 发生次数: {{ totalCount }}
      </div>

      <el-pagination
        :page-size="1"
        :total="totalList.length"
        layout="prev, pager, next, total"
        align="right"
        @size-change="1"
        @current-change="handleCurrentChange"/>
    </div>
    <el-table
      :data="list"
      style="width: 100%;">
      <el-table-column
        label="设备ID"
        align="center"
        width="150px">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.pid }}</span></template>
      </el-table-column>
      <el-table-column
        label="异常ID"
        align="center"
        width="80px">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.id }}</span></template>
      </el-table-column>
      <el-table-column
        label="userID"
        align="center">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.userId }}</span></template>
      </el-table-column>
      <el-table-column
        label="电话"
        align="center">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.phone }}</span></template>
      </el-table-column>
      <el-table-column
        label="发生时间"
        width="160px"
        align="center">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.update_time | formatUpdateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="应用版本"
        align="center">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.appVersion }}</span></template>
      </el-table-column>
      <el-table-column
        label="渠道号"
        width="85px"
        align="center">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.us }}</span></template>
      </el-table-column>
      <el-table-column
        label="系统版本"
        width="80px"
        align="center">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.osVersion }}</span></template>
      </el-table-column>
      <el-table-column
        label="设备机型"
        align="center"
        width="150px">
        <template slot-scope="scope"><span class="contentStyle">{{ scope.row.phoneModel }}</span></template>
      </el-table-column>
      <el-table-column
        label="处理状态"
        align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.hotfixStr"
            :disabled="false"
            size="mini"
            placeholder="请选择"
            @change="changeStatus">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px;">
      <h5>日志详情：</h5>
      <div
        style="line-height: 25px; font-size: 14px; background: whitesmoke; padding: 20px; border-radius: 5px; border:1px solid lightgrey;"
        v-html="list[0].exceptionStr"/>
    </div>
  </div>
</template>

<script>
import {
  queryExceptionById,
  updateCrashStatus
} from '../../mock/osExceptionApi'
export default {
  filters: {
    formatUpdateTime: function(value) {
      if (value.indexOf('-') !== -1) {
        return value
      }
      const date = new Date(value)
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  },
  data() {
    return {
      loading: false,
      totalCount: 1,
      options: [{
        value: 0,
        label: '未修复'
      }, {
        value: 2,
        label: '处理中'
      }, {
        value: 3,
        label: '忽略'
      }, {
        value: 1,
        label: '已修复'
      }],
      value: '未修复',
      list: [{
        id: '--',
        count: '--',
        userCount: '--',
        actionTime: '--',
        name: '--',
        appVersion: '--',
        systemVersion: '--',
        mobile: '--',
        cpu: '--',
        osName: '--',
        eventtime: '--',
        status: '--',
        exceptionStr: 'something wrong',
        exceptionType: '--'
      }],
      totalList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      queryExceptionById(this.$route.query.id).then(response => {
        console.log('osException data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.list = []
          this.totalCount = response.data.totalCount
          this.totalList = response.data.list
          console.log('========' + this.totalList[0])
          this.list.push(this.formatStr(this.totalList[0]))
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    handleCurrentChange(val) {
      // this.list = this.totalList[val]
      const index = val - 1
      this.list = []
      this.list.push(this.formatStr(this.totalList[index]))
    },
    formatStr(row) {
      if (row.osName === 'iOS') {
        const reg = new RegExp(',', 'g')
        const reg2 = new RegExp('\\[', 'g')
        row.exceptionStr = row.exceptionStr
          .replace(reg, ',<br/>')
          .replace(reg2, '[<br/>')
      } else if (row.exceptionStr.indexOf('<br/>') === -1) {
        const reg = new RegExp('\\bat\\b', 'g')
        const reg2 = new RegExp('\\bCaused by\\b', 'g')
        const reg3 = new RegExp('Exception\\b', 'g')
        const reg4 = new RegExp('com.song.client\\b', 'g')
        row.exceptionStr = row.exceptionStr
          .replace(reg, '<br/>at')
          .replace(reg2, '<font color=#FF0000><b>Caused by</b></font>')
          .replace(reg3, '<font color=#FF0000><b>Exception</b></font>')
          .replace(reg4, '<font color=#FF0000><b>com.song.client</b></font>')
      }
      return row
    },
    changeStatus(val) {
      this.loading = true
      updateCrashStatus(val, this.totalList[0].exceptionType).then(response => {
        this.loading = false
        if (response.data.code === 200) {
          this.$message.success('更新成功')
        } else {
          this.$message.error(response.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .contentStyle {
    font-size: 13px;
  }
</style>

