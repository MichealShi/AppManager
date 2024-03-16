<template>
  <div style="padding: 20px;">
    <el-dialog
      v-loading="loading"
      :visible.sync="resetApkDialogFormVisible"
      title="重置APK文件">
      <el-form
        :model="resetForm">
        <el-form-item
          :label-width="formLabelWidth"
          label="渠道:">
          <el-input
            v-model="resetForm.us"
            :disabled="true"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="口令:">
          <el-input
            v-model="resetForm.secret"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="APK文件:">
          <input
            name="file"
            autocomplete="off"
            type="file"
            accept=".apk"
            @change="changeAPK">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="resetApkDialogFormVisible = false">取 消</el-button>
        <el-button round type="primary" @click="resetApk">确 定</el-button>
      </div>
    </el-dialog>
    <div style="display: flex;">
      <h5>{{ appVersion }}版本详情</h5>
    </div>
    <el-table
      :data="tableData">
      <el-table-column
        width="70px"
        label="渠道">
        <template slot-scope="scope">{{ scope.row.channel }}</template>
      </el-table-column>
      <el-table-column
        label="下载地址">
        <template slot-scope="scope">http://download.nauproject.com/apkstore/{{ scope.row.fileName }}</template>
      </el-table-column>
      <el-table-column
        label="文件大小"
        width="80px">
        <template slot-scope="scope">{{ scope.row.fileSize | formatSize }}</template>
      </el-table-column>
      <el-table-column
        width="180px"
        label="创建时间">
        <template slot-scope="scope">{{ scope.row.nowTime | formatDateTime }}</template>
      </el-table-column>
      <el-table-column
        width="180px"
        label="上次重置时间">
        <template slot-scope="scope">{{ scope.row.lastTime | formatDateTime }}</template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            round
            @click.native="handleResetClick(scope.row)">重置
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  fetchDetail,
  uploadAPK
} from '../../mock/appManageApi'

export default {
  filters: {
    formatSize(value) {
      const size = (value / 1024 / 1024).toFixed(2)
      return size + 'MB'
    },
    formatDateTime: function(value) {
      if (value.indexOf('-') !== -1) {
        return value
      }
      const d = new Date()
      d.setTime(value)
      return d.format2('yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      resetApkDialogFormVisible: false,
      formLabelWidth: '100px',
      appVersion: this.$route.query.appVersion,
      tableData: [
        {
          appVersion: '1.0.0',
          id: 1,
          channel: 99,
          fileSize: 123098129,
          nowTime: '2024-01-01',
          lastTime: '2024-01-01',
          fileName: 'release.apk'
        }
      ],
      resetForm: {
        us: 'PC',
        secret: ''
      },
      apkResource: null,
      apkType: '',
      version: '',
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      fetchDetail(this.$route.query.appVersion).then(response => {
        console.log('transactionTable data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.tableData = response.data.list
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    handleResetClick(row) {
      this.apkType = row.apkType
      this.version = row.appVersion
      this.resetApkDialogFormVisible = true
      this.resetForm.us = row.channel
    },
    changeAPK(event) {
      this.apkResource = event.target.files[0]
    },
    resetApk() {
      if (this.resetForm.secret !== 'nau') {
        this.$message.error('请输入正确口令')
        return
      }
      if (this.apkResource === undefined || this.apkResource == null) {
        this.$message.error('请选择Apk文件')
        return
      }
      this.resetApkDialogFormVisible = false
      const Form = new FormData()
      Form.append('file', this.apkResource, this.file_name)
      this.loading = true
      uploadAPK(Form, this.apkType, this.version)
        .then((response) => {
          this.loading = false
          alert(response.data.message)
          console.log(response)
        })
        .catch((error) => {
          this.loading = false
          this.apkResource = null
          alert(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
</style>

