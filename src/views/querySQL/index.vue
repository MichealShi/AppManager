<template>
  <div
    v-loading="loading"
    class="dashboard-editor-container">
    <p>请输入查询语句：</p>
    <el-input v-model="sqlRes" type="textarea" rows="3"/>
    <el-row style="margin-top: 10px">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <p>查询结果：</p>
        </div>
      </el-col>
      <el-col :span="12" align="right">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain round @click="querySQL">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <div style="padding-bottom: 30px">
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <div>
            <pre
              style="width: 100%; min-height: 450px;font-size: 11px"
              v-html="result"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  fetchList
} from '../../api/querySQLApi'

export default {
  data() {
    return {
      sqlRes: '',
      result: '',
      loading: false
    }
  },
  methods: {
    querySQL() {
      // if (this.sqlRes.indexOf('delete') !== -1 || this.sqlRes.indexOf('save') !== -1) {
      //   this.$message.error('本功能只支持查询操作')
      //   return
      // }
      this.loading = true
      fetchList(this.sqlRes).then(response => {
        this.loading = false
        if (response.data.code === 200) {
          this.result = response.data
        } else {
          this.$message.error(response.data.msg)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  pre {
    outline: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
  }

  .string {
    color: green;
  }

  .number {
    color: darkorange;
  }

  .boolean {
    color: blue;
  }

  .null {
    color: magenta;
  }

  .key {
    color: red;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 30px 30px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
