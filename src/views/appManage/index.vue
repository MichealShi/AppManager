<template>
  <div>
    <div v-loading="uploadLoading" align="right" style="padding-left: 20px;padding-right: 20px;">
      <el-collapse>
        <el-collapse-item title="上传新版本" name="1">
          <el-form
            align="right"
            method="post"
            enctype="multipart/form-data"
            style="width: 360px;">
            <el-input
              v-model="versionNameStr"
              size="mini"
              type="text"
              placeholder="请输入版本号"
              style="width: 360px;"/>
            <el-input
              v-model="authCodeStr"
              size="mini"
              placeholder="请输入口令"
              style="width: 360px; margin-top: 10px;"/>
            <el-radio-group
              v-model="radio"
              name="apkType"
              style="margin-top: 10px;margin-bottom: 10px;">
              <el-radio :label="1">官网</el-radio>
              <el-radio :label="5">推广</el-radio>
            </el-radio-group>
            <a href="javascript:" class="file">选择文件并上传
              <input
                id="patch_file"
                name="file"
                autocomplete="off"
                type="file"
                accept=".apk"
                style="position: absolute;right: 0;top: 0;opacity: 0;filter: alpha(opacity=0);"
                @change="changeAPK">
            </a>
            <div v-html="downloadUrl">下载链接</div>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%;padding-left: 15px;padding-right: 15px;"
      stripe>
      <el-table-column label="序列号" width="70px">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="版本号" width="80px">
        <template slot-scope="scope">v{{ scope.row.appVersion }}</template>
      </el-table-column>
      <el-table-column label="创建日期" width="180px">
        <template slot-scope="scope">{{ scope.row.nowTime | formatDateTime }}</template>
      </el-table-column>
      <el-table-column label="下载地址">
        <template slot-scope="scope">http://download.nauproject.com/apkstore/{{ scope.row.fileName }}</template>
      </el-table-column>
      <el-table-column label="查看" width="100%" align="center">
        <template slot-scope="scope">
          <router-link :to="'/appManage/detail?appVersion='+scope.row.appVersion">查看详情</router-link>
        </template>
      </el-table-column>

      <el-table-column
        label="下线"
        width="180px"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            round
            @click.native="handleOffClick(scope.row)">下线此版本
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
import {
  fetchList,
  offlineVersion,
  uploadAPK
} from '../../mock/appManageApi'

export default {
  /* eslint-disable */
  filters: {
    formatDateTime: function(value) {
      if (value.indexOf('-') !== -1) {
        return value
      }
      let d = new Date()
      d.setTime(value)
      return d.format2('yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      list: [],
      radio: 5,
      versionNameStr: '',
      authCodeStr: '',
      loading: false,
      uploadLoading: false,
      pageIndex: 0,
      pageSize: 50,
      downloadUrl: '下载地址：'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      fetchList(this.pageIndex, this.pageSize).then(response => {
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    changeAPK(event) {
      let file = event.target.files[0]
      const rule = '请了解apk命名规则; \n规则如下:\n官网对应的是: release_V版本号.apk \nM站对应的是: release_MV版本号.apk\nLP包对应的是:release_LP版本号.apk';
      if (this.versionNameStr === '') {
        this.$message.error('请输入版本号!')
        return false
      }
      if (this.authCodeStr !== 'nau') {
        this.$message.error('请输入正确口令!')
        return false
      }

      if (file.name.indexOf('release') === -1) {
        alert('apk名称必须是 release 开头.例如:release_V1.0.0.apk')
        return false
      }

      if (this.radio === 1) {
        if (file.name.indexOf('_V') === -1) {
          alert(rule)
          return false
        }
      }

      if (this.radio === 2) {
        if (file.name.indexOf('_MV') === -1) {
          alert(rule)
          return false
        }
      }

      if (this.radio === 3) {
        if (file.name.indexOf('_LP') === -1) {
          alert(rule)
          return false
        }
      }
      this.uploadLoading = true
      console.log(file)
      let Form = new FormData()
      Form.append('file', file, this.file_name)
      uploadAPK(Form, this.radio, this.versionNameStr)
        .then((response) => {
          this.uploadLoading = false
          this.downloadUrl = "下载地址：" + response.data.message;
          alert("下载地址：" + response.data.message)
          this.$message.info(response.data.message)
          this.fetchData()
        })
        .catch((error) => {
          alert(error)
          this.uploadLoading = false
          console.log(error)
        })
    },
    handleOffClick(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        offlineVersion(row.appVersion, row.fileName).then(response => {
          if (response.data.code === 200) {
            this.$message.success(response.data.msg)
            this.fetchData()
          } else {
            this.$message.info(response.data.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消下线')
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 8px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
</style>
