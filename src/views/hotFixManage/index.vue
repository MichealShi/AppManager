<template>
  <div>
    <el-dialog :visible.sync="addVersionDialogFormVisible" title="新增APP版本信息">
      <el-form :model="versionForm">
        <el-form-item :label-width="formLabelWidth" label="AppHash:">
          <el-input v-model="versionForm.appHash" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="AppVersion:">
          <el-input v-model="versionForm.appVersion" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="addVersionDialogFormVisible = false">取 消</el-button>
        <el-button round type="primary" @click="addVersion">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addPhoneDialogFormVisible" title="新增测试手机">
      <el-form :model="phoneForm">
        <el-form-item :label-width="formLabelWidth" label="唯一标识:">
          <el-input v-model="phoneForm.pid" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="addPhoneDialogFormVisible = false">取 消</el-button>
        <el-button round type="primary" @click="addPhone">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addPatchDialogFormVisible" title="新增补丁文件">
      <el-form :model="patchForm">
        <el-form-item :label-width="formLabelWidth" label="AppVersion:">
          <el-select
            v-model="versionDefaultValue"
            size="small"
            style="width: 220px"
            @change="versionChange">
            <el-option
              v-for="item in versionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="AppHash:">
          <el-input v-model="patchForm.appHash" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="渠道号:">
          <el-input v-model="patchForm.us" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="补丁描述:">
          <el-input v-model="patchForm.description" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="补丁文件:">
          <input name="file" autocomplete="off" type="file" accept=".jar" @change="changeAPK">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="addPatchDialogFormVisible = false">取 消</el-button>
        <el-button round type="primary" @click="addPatch">确 定</el-button>
      </div>
    </el-dialog>
    <div align="right" style="padding-right: 20px; padding-top: 5px;">
      <el-row>
        <el-button type="success" size="mini" round @click="addVersionDialogFormVisible = true">添加版本</el-button>
        <el-button type="primary" size="mini" round @click="addPhoneDialogFormVisible = true">添加手机</el-button>
        <el-button type="danger" size="mini" round @click="addPatchDialogFormVisible = true">上传补丁</el-button>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%;padding-top: 15px;padding-left: 15px;padding-right: 15px;"
      @row-click="handlePageCurrentChange">
      <el-table-column label="序列号" width="100%">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="App版本" width="100%">
        <template slot-scope="scope">{{ scope.row.appVersion }}</template>
      </el-table-column>
      <el-table-column label="AppHash">
        <template slot-scope="scope">{{ scope.row.appHash }}</template>
      </el-table-column>
      <el-table-column label="PatchMD5">
        <template slot-scope="scope">{{ scope.row.md5 }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.create_date | formatDate }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
import {
  fetchList,
  addTestPhone,
  addAppVersion,
  uploadHotFixAPK,
  queryHotFixVersions
} from '../../mock/hotFixApi'

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
    },
    formatDate(str) {
      if (str.indexOf('-') !== -1) {
        return str
      } else {
        let d = new Date()
        d.setTime(str)
        return d.format2('yyyy-MM-dd hh:mm:ss')
      }
    }
  },
  data() {
    return {
      appUid: '20161116-107181.1814942155',
      list: null,
      loading: true,
      addVersionDialogFormVisible: false,
      versionForm: {
        appHash: '',
        appVersion: ''
      },
      addPhoneDialogFormVisible: false,
      phoneForm: {
        pid: ''
      },
      addPatchDialogFormVisible: false,
      patchForm: {
        appVersion: '7.3.6',
        appHash: '',
        us: '77',
        description: '',
        file: null
      },
      formLabelWidth: '100px',
      apkResource: null,
      versionList: [],
      versionDefaultValue: '',
      versionOptions: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      fetchList(0, 20, this.appUid).then(response => {
        console.log('transactionTable data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.list = response.data.list
        } else {
          this.$message.error(response.data.msg)
        }
      })
      queryHotFixVersions().then(response => {
        if (response.data.code === 200) {
          // this.versionList = response.data.list
          // let lst = []
          // this.versionList.forEach(function(row, index) {
          //   const m = {}
          //   m.label = row.version_name
          //   m.value = row.appHash
          //   lst[index] = m
          // })
          // this.versionOptions = lst
          // this.versionDefaultValue = this.versionOptions[0].appHash

          // this.patchForm.appHash = this.versionOptions[0].appHash
        }
      })
    },
    versionChange(value) {
      this.patchForm.appHash = value
      const m = this.versionOptions.find((item) => {
        return item.value === value
      })
      this.patchForm.appVersion = m.label
    },
    changeAPK(event) {
      this.apkResource = event.target.files[0]
    },
    addVersion() {
      if (this.versionForm.appHash == '') {
        this.$message.error('请添加AppHash值!')
        return
      }
      if (this.versionForm.appVersion == '') {
        this.$message.error('请添加版本号!')
        return
      }
      this.addVersionDialogFormVisible = false
      addAppVersion(this.appUid, this.versionForm.appHash, this.versionForm.appVersion)
        .then(response => {
          this.loading = false
          if (response.data.code === 200) {
            this.$message.success('添加成功')
            this.fetchData()
          } else {
            this.$message.error(response.data.msg)
          }
        }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    addPhone() {
      if (this.phoneForm.pid == '') {
        this.$message.error('请添加设备唯一标识!')
        return
      }
      this.addPhoneDialogFormVisible = false
      this.loading = true
      addTestPhone(this.phoneForm.pid)
        .then(response => {
          this.loading = false
          if (response.data.code === 200) {
            this.$message.success('添加成功')
          } else {
            this.$message.error(response.data.msg)
          }
        }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    addPatch() {
      if (this.patchForm.description == '') {
        this.$message.error('请添加补丁描述信息!')
        return
      }
      if (this.apkResource === undefined) {
        this.$message.error('请添加补丁文件!')
        return
      }
      this.addPatchDialogFormVisible = false
      console.log(this.apkResource)

      this.loading = true
      let form = new FormData()
      form.append('appHash', this.patchForm.appHash)
      form.append('tags', this.patchForm.us)
      form.append('appVersion', this.patchForm.appVersion)
      form.append('description', this.patchForm.description)
      form.append('file', this.apkResource)
      uploadHotFixAPK(form)
        .then((response) => {
          this.loading = false
          console.log(response)
          if (response.data.code === 200) {
            this.$message.success(response.data.message)
            this.fetchData()
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    },

    handlePageCurrentChange(row) {
      this.$router.push({
        path: '/hotFixManage/detail', name: 'hotFixDetail', params: {
          md5: row.md5
        }
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
