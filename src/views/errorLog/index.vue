<template>
  <div
    v-loading="loading"
    style="padding-left: 20px;padding-right: 20px;padding-top: 20px">
    <el-row style="width: 100%">
      <el-col :span="20">
        <el-select
          id="sysSelect"
          v-model="systemDefaultValue"
          placeholder="Android"
          size="small"
          style="width: 150px"
          @change="getSystemValue">
          <el-option
            v-for="item in systemOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-select
          id="versionSelect"
          v-model="versionDefaultValue"
          placeholder="所有版本"
          size="small"
          style="width: 150px"
          @change="getVersionValue">
          <el-option
            v-for="(item) in appVersionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-select
          id="statusSelect"
          v-model="statusDefaultValue"
          :disabled="false"
          placeholder="所有状态"
          size="small"
          style="width: 150px"
          @change="getStatusValue">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-select
          id="usSelect"
          v-model="usDefaultValue"
          placeholder="所有渠道"
          size="small"
          style="width: 110px"
          @change="getUsValue">
          <el-option
            v-for="item in usOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <!--<el-date-picker-->
        <!--v-model="value7"-->
        <!--type="daterange"-->
        <!--align="right"-->
        <!--value-format2="timestamp"-->
        <!--unlink-panels-->
        <!--range-separator="至"-->
        <!--start-placeholder="开始日期"-->
        <!--end-placeholder="结束日期"-->
        <!--@change="selectTime"-->
        <!--:picker-options="pickerOptions2">-->
        <!--</el-date-picker>-->
        <el-input
          id="searchInput"
          placeholder="请输入手机号或设备号"
          size="small"
          clearable
          style="width: 251px; margin-left: 10px"/>
        <el-button
          icon="el-icon-search"
          size="small"
          circle
          style="margin-left: 5px; width: 36px; height: 36px;"
          @click.native="searchCrash()"/>
      </el-col>
      <el-col :span="4" align="right">
        <el-radio-group v-model="checkboxGroup" size="mini" @change="handleCheckedChange">
          <el-radio-button v-for="rule in rules" :label="rule.value" :key="rule.value">
            {{ rule.label }}
          </el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      style="width: 100%;padding-top: 15px;"
      stripe>
      <el-table-column
        label="Type"
        width="130px">
        <template slot-scope="scope"><span style="color: grey; font-size: smaller; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ scope.row.exceptionType }}</span></template>
      </el-table-column>
      <el-table-column
        label="版本"
        width="70px">
        <template slot-scope="scope"><span style="font-size: 13px">v{{ scope.row.appVersion }}</span></template>
      </el-table-column>
      <el-table-column
        label="发生次数"
        width="80px"
        align="center">
        <template slot-scope="scope"><span style="font-size: 13px">{{ scope.row.ct }}</span></template>
      </el-table-column>
      <el-table-column
        label="最近发生"
        width="150px">
        <template slot-scope="scope"><span style="font-size: 13px">{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常信息">
        <template slot-scope="scope">
          <router-link :to="'/errorLog/detail?id='+scope.row.exceptionType">
            <span
              style="color: #3A71A8; font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ scope.row.exceptionStrShort }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="处理状态"
        width="100%">
        <template slot-scope="scope">
          <el-button :disabled="false" size="mini" round @click.native="handleClick(scope.row)">
            {{ scope.row.hotfixStr | formatStatus }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[15, 30, 50, 100]"
      :page-size="15"
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
  fetchList,
  fetchFilterList,
  searchException,
  updateCrashStatus
} from '../../mock/osExceptionApi'

export default {
  filters: {
    formatStatus: function(value) {
      return value
    },
    formatUpdateTime: function(value) {
      const date = new Date(value)
      let fmt = 'yyyy.MM.dd hh:mm:ss'
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
      list: null,
      totalCount: 0,
      system: '-1',
      version: '-1',
      status: 0,
      statusStr: '未修复',
      us: '-1',
      startTime: '-1',
      endTime: '-1',
      pageIndex: 0,
      pageSize: 15,
      checkboxGroup: '1',
      recentDay: '1',
      rules: [{
        label: '今天',
        value: 1
      }, {
        label: '近7天',
        value: 7
      }, {
        label: '近30天',
        value: 30
      }],
      systemOptions: [
        {
          value: '-1',
          label: '所有系统'
        }, {
          value: 'Android',
          label: 'Android'
        }, {
          value: 'iOS',
          label: 'iOS'
        }
      ],
      systemDefaultValue: '所有系统',

      appVersionOptions: [
        {
          value: '-1',
          label: '所有版本'
        }
      ],
      versionDefaultValue: '所有版本',

      statusOptions: [
        {
          value: -1,
          label: '所有状态'
        }, {
          value: 0,
          label: '未修复'
        }, {
          value: 2,
          label: '处理中'
        }, {
          value: 3,
          label: '已忽略'
        }, {
          value: 1,
          label: '已修复'
        }
      ],
      statusDefaultValue: '未修复',

      usOptions: [
        {
          value: '-1',
          label: '所有渠道'
        }
      ],
      usDefaultValue: '所有渠道',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }],
        disabledDate(time) {
          const curDate = (new Date()).getTime()
          const three = 30 * 24 * 3600 * 1000
          const oneMonths = curDate - three
          return time.getTime() > Date.now() || time.getTime() < oneMonths
        }
      },
      value7: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      fetchList(this.pageIndex, this.pageSize, this.recentDay).then(response => {
        console.log('osException data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list
          this.totalCount = response.data.totalCount
          this.resetVersions(response.data.versionList)
          this.resetUsOptions(response.data.usList)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    fetchFilter() {
      this.loading = true
      fetchFilterList(this.pageIndex, this.pageSize, this.system, this.version, this.status, this.statusStr, this.us, this.recentDay).then(response => {
        console.log('osException data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list
          this.totalCount = response.data.totalCount
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    handleCheckedChange() {
      this.recentDay = this.checkboxGroup
      this.fetchFilter()
    },
    resetVersions(versionList) {
      const options = []
      const optionsStr = []
      const versionModel = {}
      versionModel.value = '-1'
      versionModel.label = '所有版本'
      options[0] = versionModel
      let index = 1
      versionList.forEach(function(row) {
        if (optionsStr.indexOf(row.appVersion) === -1) {
          const versionModel = {}
          versionModel.value = row.appVersion
          versionModel.label = row.appVersion
          options[index] = versionModel
          optionsStr[index - 1] = row.appVersion
          index = index + 1
        }
      })
      console.log('this.appVersionOptions = ' + this.appVersionOptions)
      this.appVersionOptions = options
    },
    resetUsOptions(usList) {
      const options = []
      const optionsStr = []
      const usModel = {}
      usModel.value = '-1'
      usModel.label = '所有渠道'
      options[0] = usModel
      let index = 1
      usList.forEach(function(row) {
        if (optionsStr.indexOf(row.us) === -1) {
          const usModel = {}
          usModel.value = row.us
          usModel.label = row.us
          options[index] = usModel
          optionsStr[index - 1] = row.us
          index = index + 1
        }
      })
      console.log('this.usOptions = ' + this.usOptions)
      this.usOptions = options
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.version !== '-1') {
        this.fetchFilter()
      } else {
        this.fetchData()
      }
    },
    handleCurrentChange(val) {
      this.pageIndex = this.pageSize * (val - 1)
      if (this.version !== '-1') {
        this.fetchFilter()
      } else {
        this.fetchData()
      }
    },
    handleClick(row) {
      let status = row.status
      if (row.status === 1) {
        status = 0
      } else {
        status = 1
      }
      updateCrashStatus(status, row.exceptionType).then(response => {
        if (response.data.code === 200) {
          this.$message.success('更新成功')
          if (row.hotfixStr === '已修复') {
            row.hotfixStr = '未修复'
          } else {
            row.hotfixStr = '已修复'
          }
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    getSystemValue(value) {
      this.pageIndex = 0
      this.system = value
      this.fetchFilter()
    },
    getVersionValue(value) {
      this.pageIndex = 0
      this.version = value
      this.fetchFilter()
    },
    getStatusValueStr(value) {
      this.statusStr = '未修复'
      switch (value) {
        case -1:
          this.statusStr = '未修复'
          break
        case 0:
          this.statusStr = '未修复'
          break
        case 2:
          this.statusStr = '处理中'
          break
        case 3:
          this.statusStr = '已忽略'
          break
        case 1:
          this.statusStr = '已修复'
          break
      }
    },
    getStatusValue(value) {
      this.pageIndex = 0
      this.status = value
      this.getStatusValueStr(value)
      this.fetchFilter()
    },
    getUsValue(value) {
      this.pageIndex = 0
      this.us = value
      this.fetchFilter()
    },
    selectTime(value) {
      console.log('selectTime = ' + value)
    },
    searchCrash() {
      this.pageIndex = 0
      const str = document.getElementById('searchInput').value
      if (str == null || str === '') {
        this.$message.warning('输入内容为空')
        return
      }
      this.loading = true
      searchException(this.pageIndex, this.pageSize, str).then(response => {
        console.log('osException data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list
        } else {
          this.$message.error(response.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .itemStyle {
    margin-left: 20px;
    margin-right: 20px
  }
</style>

