<template>
  <div style="padding-left: 20px;padding-top: 20px;padding-right: 20px;">

    <div>
      <div align="center">接口异常情况</div>
      <el-radio-group v-model="checkboxGroup" size="mini" @change="handleCheckedChange">
        <el-radio-button v-for="rule in rules" :label="rule.value" :key="rule.value">
          {{ rule.label }}
        </el-radio-button>
      </el-radio-group>
      <ve-line :data="netErrorChartData" :events="changeDate" />
      <div align="center">APP异常情况</div>
      <el-radio-group v-model="exceptionGroup" size="mini" @change="handleExceptionChange">
        <el-radio-button v-for="rule in rules" :label="rule.value" :key="rule.value">
          {{ rule.label }}
        </el-radio-button>
      </el-radio-group>
      <ve-line
        :data="exceptionChartData"
        :events="exceptionEvents"/>
    </div>
    <!--<el-row style="width: 100%">-->
    <!--<el-col :span="14">-->
    <!--<div>-->
    <!--<span style="font-size: 14px">当日出现异常接口</span>-->
    <!--<el-table-->
    <!--:data="addressList"-->
    <!--:height="tableHeight"-->
    <!--highlight-current-row-->
    <!--style="width: 100%;"-->
    <!--stripe>-->
    <!--<el-table-column-->
    <!--label="接口地址">-->
    <!--<template slot-scope="scope"><span-->
    <!--style="color: grey; font-size: smaller;">{{ scope.row.httpUrl }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="次数"-->
    <!--width="100px"-->
    <!--align="center">-->
    <!--<template slot-scope="scope"><span-->
    <!--style="color: grey; font-size: smaller;">{{ scope.row.ct }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="最近发生"-->
    <!--width="150px"-->
    <!--align="center">-->
    <!--<template slot-scope="scope"><span-->
    <!--style="color: grey; font-size: smaller;">{{ scope.row.startTime }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :span="2" align="center">-->
    <!--<div style="background: #fff; min-height: 520px; font-size: 5px">分界线</div>-->
    <!--</el-col>-->
    <!--<el-col :span="8" align="right">-->
    <!--<div>-->
    <!--<span style="font-size: 14px">当日接口错误码统计</span>-->
    <!--<el-table-->
    <!--:data="codeList"-->
    <!--:height="tableHeight"-->
    <!--highlight-current-row-->
    <!--style="width: 100%;"-->
    <!--stripe>-->
    <!--<el-table-column-->
    <!--label="错误码"-->
    <!--align="center">-->
    <!--<template slot-scope="scope"><span-->
    <!--style="color: grey; font-size: smaller; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ scope.row.httpCode }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="次数"-->
    <!--align="center">-->
    <!--<template slot-scope="scope"><span-->
    <!--style="color: grey; font-size: smaller; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ scope.row.ct }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="最近发生"-->
    <!--align="center">-->
    <!--<template slot-scope="scope"><span-->
    <!--style="color: grey; font-size: smaller; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ scope.row.startTime }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
import {
  // getNetErrorCodeList,
  // getNetErrorAddressList,
  getNetErrorDailyList,
  getExceptionDailyList
} from '../../../api/dashboardApi'

const ruleOptions = [
  {
    label: '最近7天',
    value: 7
  }, {
    label: '最近15天',
    value: 15
  }, {
    label: '最近30天',
    value: 30
  }
]
export default {
  name: 'DashboardAdmin',
  data() {
    this.changeDate = {
      click: function(e) {
        // this.getNetErrorCodeList(e.name)
        // this.getNetErrorAddressList(e.name)
      }
    }
    const self = this
    this.exceptionEvents = {
      click: function(e) {
        self.name = e.name
        console.log(e)
      }
    }
    return {
      loading: false,
      checkboxGroup: '7',
      exceptionGroup: '7',
      rules: ruleOptions,
      // codeList: null,
      // addressList: null,
      netErrorCount: 0,
      tableHeight: window.innerHeight - 130,
      recentDay: 7,
      exceptionRecentDay: 7,
      netErrorChartData: {
        columns: [],
        rows: []
      },
      exceptionChartData: {
        columns: [],
        rows: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      // const today = formatDate(new Date(), 'yyyy-MM-dd')
      this.getNetErrorChartData()
      this.getExceptionChartData()
      // this.getNetErrorCodeList(today)
      // this.getNetErrorAddressList(today)
    },
    // getNetErrorCodeList(today) {
    //   getNetErrorCodeList(today).then(response => {
    //     console.log('getNetErrorCodeList data = ' + response.data)
    //     if (response.data.code === 200) {
    //       this.codeList = response.data.list
    //     } else {
    //       this.$message.error(response.data.msg)
    //     }
    //   })
    // },
    // getNetErrorAddressList(today) {
    //   getNetErrorAddressList(today).then(response => {
    //     console.log('getNetErrorAddressList data = ' + response.data)
    //     if (response.data.code === 200) {
    //       this.addressList = response.data.list
    //     } else {
    //       this.$message.error(response.data.msg)
    //     }
    //   })
    // },
    getNetErrorChartData() {
      getNetErrorDailyList(this.recentDay).then(response => {
        console.log('getNetErrorDailyList data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.netErrorChartData.columns = ['dateTime', 'count']
          for (let i = 0; i < response.data.codeList.length; i++) {
            const pos = i + 2
            this.netErrorChartData.columns[pos] = response.data.codeList[i].httpCode
          }
          this.netErrorChartData.rows = response.data.list
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    getExceptionChartData() {
      getExceptionDailyList(this.exceptionRecentDay).then(response => {
        console.log('getExceptionDailyList data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.exceptionChartData.rows = response.data.list
          this.resetExceptionColumns(response.data.versionList)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    resetExceptionColumns(versionList) {
      const options = []
      options[0] = 'dateTime'
      options[1] = 'count'
      let index = 2
      versionList.forEach(function(row) {
        if (index < 5) {
          options[index] = row.appVersion
          console.log('appversion = ' + row.appVersion)
          index = index + 1
        }
      })
      this.exceptionChartData.columns = options
    },
    handleCheckedChange(value) {
      this.recentDay = value
      this.loading = true
      this.getNetErrorChartData()
    },
    handleExceptionChange(value) {
      this.exceptionRecentDay = value
      this.loading = true
      this.getExceptionChartData()
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .dashboard-editor-container {
    padding: 12px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
    }
  }
</style>
