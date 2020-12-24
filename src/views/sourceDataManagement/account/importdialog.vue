
<template>
  <div class="import">
    <el-dialog
      :title="typeid=='1'?'导入源文件':'导入比对'"
      :visible.sync="importdialogShow"
      :before-close="saveOrUpvisibleclose"
      :limit="1"
      :on-exceed="exceed"
      width="30%"
    >
      <div>
        <div style="display: flex; position: relative; margin-bottom: 10px">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="action"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-progress='onprogress'
            :on-success="success"
            :on-error="error"
            name="fileName"
            :file-list="fileList"
            accept=".xlsx,.xls"
            :auto-upload="false"
          >
            <div>
              导入文件：
              <el-button slot="trigger" size="small" type=""
                >选取文件</el-button
              >
            </div>
          </el-upload>
          <div slot="tip" class="el-upload__tip">仅支持.xlsx或 .xls文件</div>
        </div>
        <div>
          模板下载：
          <a style="color: blue; cursor: pointer" :href="href"
            >点击下载</a
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOrUpvisibleclose">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确定导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { payeeTemplate } from "@/api/userCenter";
import fileDownload from "js-file-download";
export default {
  name: "",
  props: {
    importdialogShow: {
      type: Boolean,
    },
    typeid: {
      type: String,
    },
  },
  data() {
    return {
      fileList: [],
      href:'https://res.luckskill.cn/%E6%BA%90%E6%96%87%E4%BB%B6%E6%A8%A1%E6%9D%BF.xlsx',
      loading:false,
      action: "http://47.104.245.206:8888/upfile",
    };
  },
  async created() {
    if (this.typeid == "2") {
      this.action = "http://47.104.245.206:8888/compare";
    }
  },
  mounted() {},
  methods: {
    uoload() {
      // https://res.luckskill.cn/%E6%BA%90%E6%96%87%E4%BB%B6%E6%A8%A1%E6%9D%BF.xlsx
      payeeTemplate().then((res) => {
        fileDownload(res, "付款明细.xlsx");
      });
    },
    success(response) {
      this.loading.close();
      if (this.typeid == "2") {
        this.$emit("closeSuccessCompare",response);
        this.$message({
          message: "导入成功",
          type: "success",
        });
      } else {
        this.$emit("closeSuccess");
        this.$message({
          message: "导入成功",
          type: "success",
        });
      }
    },
    onprogress(){
       this.loading = this.$loading({
          lock: true,
          text: '正在导入',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    },
    exceed() {
      this.$message({
        message: "只能导入一个文件",
        type: "waining",
      });
    },
    error(err) {
      this.loading.close();
      this.$message({
        message: err,
        type: "error",
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    saveOrUpvisibleclose() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped lang="scss">
.import {
  .el-upload__tip {
    position: absolute;
    top: 5px;
    right: 30px;
  }
}
</style>

