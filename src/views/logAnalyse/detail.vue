<template>
  <div
    v-loading="loading"
    style="padding-left: 20px;padding-top: 20px">
    <el-row style="width: 100%">
      <el-col :span="12">
        <el-checkbox-group v-model="checkboxGroup" size="small">
          <el-checkbox-button v-for="rule in rules" :label="rule.value" :key="rule.value" @change="handleCheckedChange">
            {{ rule.label }}
          </el-checkbox-button>
          <el-checkbox-button :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">查看全部
          </el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          value-format="timestamp"
          @change="selectTime"/>
      </el-col>
    </el-row>
    <el-row style="width: 100%">
      <el-col :span="14">
        <el-table
          :data="list"
          :height="tableHeight"
          highlight-current-row
          style="width: 100%;"
          stripe
          @row-click="handleCurrentChange">
          <el-table-column
            label="时间排序"
            width="100px">
            <template slot-scope="scope"><span style="color: limegreen; font-size: smaller;">{{ scope.row.l }}</span></template>
          </el-table-column>
          <el-table-column
            label="日志类型"
            width="90px">
            <template slot-scope="scope">
              <el-tag
                :color="getTagColor(scope.row)"
                :style="getTagStyle(scope.row)"
                type="warning"
                size="small"
                style="font-size: smaller">{{ scope.row.f | formatType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="日志概要">
            <template slot-scope="scope"><span style="color: grey; font-size: smaller; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ scope.row.c | formatDetail }}</span></template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="10" style="height: 100%">
        <div style="padding: 10px; height: 100%; position: relative">
          <div style="color: #7d7d7f; font-size: 14px">日志详情</div>
          <pre
            style="width:100%; max-height: 600px; overflow-y: auto; margin-top:10px; color: #8b8b8b;line-height: 15px; font-size: 10px; background: #fafafa; padding: 10px; border-radius: 3px; border:1px solid lightgrey; word-wrap: break-word; word-break: normal;"
            v-html="logDetail"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  filterLogAnalyse
} from '../../mock/logAnalyseApi'

import {
  dateFtt
} from '../../js/util'

const ruleOptions = [
  {
    label: '程序入口',
    value: 1
  }, {
    label: '埋点事件',
    value: 2
  }, {
    label: '网络请求',
    value: 3
  }, {
    label: '崩溃信息',
    value: 4
  }, {
    label: 'H5相关',
    value: 5
  }, {
    label: '日志输入',
    value: 6
  }, {
    label: '错误行',
    value: 7
  }
]
export default {
  filters: {
    formatDateTime: function(value) {
      const d = new Date(value)
      return dateFtt('hh:mm:ss.S', d)
    },
    formatType: function(value) {
      if (value === 1) {
        return '程序入口'
      }
      if (value === 2) {
        return '埋点事件'
      }
      if (value === 3) {
        return '网络请求'
      }
      if (value === 4) {
        return '崩溃信息'
      }
      if (value === 5) {
        return 'H5相关'
      }
      if (value === 6) {
        return '日志输入'
      }
      if (value === 7) {
        return '错误行'
      }
    },
    formatDetail: function(value) {
      let result = value
      if (value.indexOf('====>') !== -1) {
        const str = value.split('====>')
        result = str[1]
      }
      return result.substr(0, 300)
    }
  },
  data() {
    return {
      timeValue: [new Date(2019, 0, 1, 10, 10), new Date(2019, 0, 2, 10, 10)],
      checkboxGroup: [''],
      rules: ruleOptions,
      loading: false,
      list: null,
      startTime: '-1',
      endTime: '-1',
      isIndeterminate: true,
      checkAll: false,
      logDetail: '暂无数据',
      tableHeight: window.innerHeight - 150
    }
  },
  created() {
    const today = new Date()
    const fromTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0, 0)
    const nextDay = today.getDate() + 1
    const toTime = new Date(today.getFullYear(), today.getMonth(), nextDay, 0, 0)
    this.startTime = fromTime.getTime()
    this.endTime = toTime.getTime()
    this.timeValue = [fromTime, toTime]
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      let filter = this.checkboxGroup.join(',')
      if (filter === ',') {
        filter = ''
      }
      filterLogAnalyse(this.$route.query.id, this.startTime, this.endTime, filter).then(response => {
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list.reverse()
          this.totalCount = response.data.totalCount
          if (this.list.length !== 0) {
            this.logDetail = this.formatStr(this.list[0].c)
          }
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    handleCheckAllChange(val) {
      this.checkboxGroup = []
      console.log('checkboxGroup = ' + this.checkboxGroup)
      this.isIndeterminate = val
      this.fetchData()
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.rules.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.rules.length
      this.fetchData()
    },
    selectTime(value) {
      const selectedTime = value + ''
      this.startTime = selectedTime.split(',')[0]
      this.endTime = selectedTime.split(',')[1]
      this.fetchData()
    },
    handleCurrentChange(row) {
      console.log('log = ' + row.c)
      if (row.f === 4) {
        this.logDetail = row.c
      } else {
        this.logDetail = this.formatStr(row.c)
      }
    },
    formatStr(value) {
      this.loading = true
      let result = value
      if (value.indexOf('->') !== -1) {
        result = '接口数据:' + (value.split('->'))[1]
      }
      if (value.indexOf('=>') !== -1) {
        result = (result.split('=>'))[1]
      }
      result = result.replace(/['"\\\b\f\n\r\t\s]/g, '')
      result = this.formatJsonStr(result)
      this.loading = false
      return result
    },
    formatJsonStr(json, options) {
      let reg = null
      let formatted = ''
      let pad = 0
      const PADDING = '  ' // one can also use '\t' or a different number of spaces
      // optional settings
      options = options || {}
      // remove newline where '{' or '[' follows ':'
      options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true)
      // use a space after a colon
      options.spaceAfterColon = (options.spaceAfterColon !== false)

      // begin formatting...
      //
      // // make sure we start with the JSON as a string
      // if (typeof json !== 'string') {
      //   json = JSON.stringify(json)
      // }
      // // parse and stringify in order to remove extra whitespace
      // json = JSON.parse(json)
      json = JSON.stringify(json)
      reg = /(参数:)/g
      json = json.replace(reg, '\r\n$1\r\n')

      // add newline before and after curly braces
      reg = /([{}])/g
      json = json.replace(reg, '\r\n$1\r\n')

      // add newline before and after square brackets
      reg = /([\[\]])/g
      json = json.replace(reg, '\r\n$1\r\n')

      // add newline after comma
      reg = /(,)/g
      json = json.replace(reg, '$1\r\n')

      // remove multiple newlines
      reg = /(\r\n\r\n)/g
      json = json.replace(reg, '\r\n')

      // remove newlines before commas
      reg = /\r\n,/g
      json = json.replace(reg, ',')

      // optional formatting...
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /:\r\n{/g
        json = json.replace(reg, ':{')
        reg = /:\r\n\[/g
        json = json.replace(reg, ':[')
      }
      if (options.spaceAfterColon) {
        reg = /:/g
        json = json.replace(reg, ': ')
      }

      $.each(json.split('\r\n'), function(index, node) {
        let i
        let indent = 0
        let padding = ''
        if (node.match(/{$/) || node.match(/\[$/)) {
          indent = 1
        } else if (node.match(/}/) || node.match(/]/)) {
          if (pad !== 0) {
            pad -= 1
          }
        } else {
          indent = 0
        }

        for (i = 0; i < pad; i++) {
          padding += PADDING
        }
        formatted += padding + node + '\r\n'
        pad += indent
      })
      return formatted.substring(1, formatted.length - 3)
    },
    getTagStyle(row) {
      if (row.f === 1) {
        return 'color: #ff4d51'
      }
      if (row.f === 2) {
        return 'color: #009933'
      }
      if (row.f === 3) {
        return 'color: #00CCFF'
      }
      if (row.f === 4) {
        return 'color: #ff4500'
      }
      if (row.f === 5) {
        return 'color: #CC33FF'
      }
      if (row.f === 6) {
        return 'color: #3366FF'
      }
      return 'color: #ff4d51'
    },
    getTagColor(row) {
      if (row.f === 1) {
        return '#f0ff4d33'
      }
      if (row.f === 2) {
        return '#99FF3333'
      }
      if (row.f === 3) {
        return '#00CCFF33'
      }
      if (row.f === 4) {
        return '#ff003333'
      }
      if (row.f === 5) {
        return '#CC33FF33'
      }
      if (row.f === 6) {
        return '#3366FF33'
      }
      return '#f0ff4d33'
    }
  }
}
</script>

<style>
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row>td {
    background-color: #f5deb095;
  }
</style>

