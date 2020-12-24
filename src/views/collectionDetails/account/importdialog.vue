
<template>
  <div class="import">
    <el-dialog
      :title="'导入收款明细'"
      :visible.sync="importdialogShow"
      :before-close="saveOrUpvisibleclose"
      :limit='1'
      :on-exceed='exceed'
      width="20%"
    >
      <div>
        <div style="display: flex; position: relative;margin-bottom: 10px;">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://139.9.130.236/finance-tool/makeAmount/importExcel"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="success"
          :on-error="error"
          :file-list="fileList"
          accept='.xlsx,.xls'
          :auto-upload="false"
        >
          <div>
            导入文件：
            <el-button slot="trigger" size="small" type="">选取文件</el-button>
          </div>
        </el-upload>
        <div slot="tip" class="el-upload__tip">仅支持.xlsx或 .xls文件</div>
      </div>
       <div>模板下载： <span style="color:blue;cursor: pointer" @click="uoload">点击下载</span></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOrUpvisibleclose">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确定导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  makeAmounttemplate,
} from "@/api/userCenter";
import fileDownload from "js-file-download";
export default {
  name: "",
  props: {
    importdialogShow: {
      type: Boolean,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  async created() {},
  mounted() {},
  methods: {
     uoload(){
      makeAmounttemplate().then((res) => {
        fileDownload(res, "收款明细.xlsx");
      });
    },
    success(response) {
      this.$emit("closeSuccess");

      this.$message({
        message: "导入成功",
        type: "success",
      });
    },
    exceed(){
      this.$message({
        message: "只能导入一个文件",
        type: "waining",
      });
    },
    error(err) {
      this.$message({
        message: err,
        type: "error",
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
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

