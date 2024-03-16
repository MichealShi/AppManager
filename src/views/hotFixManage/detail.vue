<template>
  <div
    v-loading="loading"
    style="padding: 10px">
    <el-row :gutter="20" style="margin-left: 5px; margin-right: 5px;">
      <el-col :span="7" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">文件名称：</span>
          <span class="content">{{ fileName }}</span>
        </div>
      </el-col>
      <el-col :span="7" style="padding: 10px;">
        <div class="grid-content bg-purple">
          <span class="title">文件大小：</span>
          <span class="content">{{ fileSize }}b</span>
        </div>
      </el-col>
      <el-col :span="10" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">appHash：</span>
          <span class="content">{{ appHash }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 5px; margin-right: 5px; background: #f8f8f8">
      <el-col :span="7" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">APP版本：</span>
          <span class="content">v{{ appVersion }}</span>
        </div>
      </el-col>
      <el-col :span="7" style="padding: 10px;">
        <div class="grid-content bg-purple">
          <span class="title">补丁描述：</span>
          <span class="content">{{ patchDesc }}</span>
        </div>
      </el-col>
      <el-col :span="10" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">PatchMD5：</span>
          <span class="content">{{ patchMd5 }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 5px; margin-right: 5px; ">
      <el-col :span="7" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">上传时间：</span>
          <span class="content">{{ createTime }}</span>
        </div>
      </el-col>
      <el-col :span="7" style="padding: 10px;">
        <div class="grid-content bg-purple">
          <span class="title">发布时间：</span>
          <span class="content">{{ openTime }}</span>
        </div>
      </el-col>
      <el-col :span="10" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">发布状态：</span>
          <span class="content">{{ statusStr }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 5px; margin-right: 5px; background: #f8f8f8">
      <el-col :span="7" style="padding: 10px">
        <div class="grid-content bg-purple">
          <span class="title">成功次数：</span>
          <span class="content">{{ successCount }}</span>
        </div>
      </el-col>
      <el-col :span="7" style="padding: 10px;">
        <div class="grid-content bg-purple">
          <span class="title">失败次数：</span>
          <span class="content">{{ failCount }}</span>
        </div>
      </el-col>
      <el-col :span="10" style="padding: 10px;">
        <div class="grid-content bg-purple">
          <span class="title">修复成功率：</span>
          <span class="content">{{ successRate }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" align="right" style="margin-top: 20px; margin-right: 2px">
      <el-col :span="24" align="right">
        <el-button v-if="sendTestVisible" type="primary" round @click.native="handleSendClick('确定要发布测试此补丁文件吗, 可能会出现不可预知的BUG，请确认已测试通过', '6')">发布测试</el-button>
        <el-button v-if="sendAllVisible" type="success" round @click.native="handleSendClick('确定要全量发布此补丁文件吗, 可能会出现不可预知的BUG，请确认已测试通过', '1')">正式发布</el-button>

        <el-button v-if="stopVisible" type="danger" round @click.native="handleStopClick('此操作将停止发布该补丁, 是否继续?', '4')">停止发布</el-button>
        <el-button v-if="deleteVisible" type="danger" round @click.native="handleStopClick('此操作将删除并停止发布该补丁, 是否继续?', '0')">删除补丁</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  fetchHotFixDetail,
  updateHotFixStatus
} from '../../mock/hotFixApi'

export default {
  filters: {
    formatDate(str) {
      if (str.indexOf('-') !== -1) {
        return str
      } else {
        const d = new Date()
        d.setTime(str)
        return d.format2('yyyy-MM-dd hh:mm:ss')
      }
    }
  },
  data() {
    return {
      fileName: '--',
      fileSize: '--',
      appHash: '--',
      appVersion: '--',
      patchDesc: '--',
      patchMd5: '--',
      createTime: '2024-01-01',
      openTime: '--',
      status: '',
      statusStr: '--',
      successCount: 0,
      failCount: 0,
      successRate: '--',
      loading: false,
      sendTestVisible: false,
      sendAllVisible: false,
      stopVisible: false,
      deleteVisible: false,
      md5: ''
    }
  },
  created() {
    this.md5 = this.$route.params.md5
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      fetchHotFixDetail(this.md5).then(response => {
        console.log('transactionTable data = ' + response.data)
        this.loading = false
        if (response.data.code === 200) {
          this.fileName = response.data.fileName
          this.fileSize = response.data.fileSize
          this.appHash = response.data.appHash
          this.appVersion = response.data.appVersion
          this.patchDesc = response.data.patchDesc
          this.patchMd5 = this.md5
          this.createTime = response.data.createTime
          this.openTime = response.data.openTime
          this.successCount = response.data.successCount
          this.failCount = response.data.failCount
          this.successRate = response.data.successRate
          this.getStatusString(response.data.status)
          this.resetButtonVisible(response.data.status)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    resetButtonVisible(status) {
      if (status === '0') { // 未发布
        this.sendTestVisible = true
        this.sendAllVisible = true
        this.stopVisible = false
        this.deleteVisible = true
      } else if (status === '1') { // 已发布
        this.sendTestVisible = false
        this.sendAllVisible = false
        this.stopVisible = true
        this.deleteVisible = false
      } else if (status === '4') { // 停止发布
        this.sendTestVisible = true
        this.sendAllVisible = true
        this.stopVisible = false
        this.deleteVisible = true
      } else if (status === '6') { // 发布测试
        this.sendTestVisible = false
        this.sendAllVisible = false
        this.stopVisible = true
        this.deleteVisible = false
      }
    },
    getStatusString(status) {
      switch (status) {
        case '0':
          this.statusStr = '未发布'
          break
        case '1':
          this.statusStr = '已发布'
          break
        case '4':
          this.statusStr = '停止发布'
          break
        case '6':
          this.statusStr = '发布测试补丁'
          break
        default:
          this.statusStr = ''
          break
      }
    },
    handleSendClick(msg, status) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '发布',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        updateHotFixStatus(this.patchMd5, status).then(response => {
          this.loading = false
          if (response.data.code === 200) {
            this.$message.success(response.data.msg)
            this.fetchData()
          } else {
            this.$message.error(response.data.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消操作')
      })
    },
    handleStopClick(msg, status) {
      let buttonText
      if (msg.indexOf('删除') !== 1) {
        buttonText = '删除'
      } else {
        buttonText = '停止'
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: buttonText,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        updateHotFixStatus(this.patchMd5, status).then(response => {
          this.loading = false
          if (response.data.code === 200) {
            this.$message.success(response.data.msg)
            if (buttonText.indexOf('删除') !== -1) {
              this.$router.go(-1)
            } else {
              this.fetchData()
            }
          } else {
            this.$message.error(response.data.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消操作')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title {
    color: #2d2f33;
    font-size: 15px;
  }

  .content {
    color: #7d7d7f;
    font-size: 13px;
  }
</style>

