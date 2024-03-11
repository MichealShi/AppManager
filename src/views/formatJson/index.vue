<template>
  <div class="dashboard-editor-container">
    <p>请输入JSON语句：</p>
    <el-input v-model="jsonRes" type="textarea" rows="10"/>

    <el-row style="margin-top: 10px">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <p>格式化结果：</p>
        </div>
      </el-col>
      <el-col :span="12" align="right">
        <div class="grid-content bg-purple-light">
          <el-button type="success" @click="formatJson" plain round>格式化</el-button>
        </div>
      </el-col>
    </el-row>

    <div>
      <json-viewer
        :value="result"
        :expand-depth=1
        copyable
        boxed
        sort>
      </json-viewer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonRes: "",
      result: null
    };
  },
  methods: {
    formatJson() {
      this.result = JSON.parse(this.jsonRes);
    }
  }
};
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
