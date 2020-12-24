
<template>
  <div class="import">
    <el-dialog
      :title="'编辑备注'"
      :visible.sync="importdialogShow"
      :before-close="saveOrUpvisibleclose"
      width="20%"
    >
      <div>
        <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea"
  maxlength="30">
</el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOrUpvisibleclose">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  updWriteOffRemark,
} from "@/api/userCenter";
export default {
  name: "",
  props: {
    importdialogShow: {
      type: Boolean,
    },
    addId:{
      type:String,
    }
  },
  data() {
    return {
      textarea:'',
    };
  },
  async created() {
  },
  mounted() {},
  methods: {
    submitUpload(){
      var data = {
        id:this.addId,
        writeOffRemark:this.textarea,
      }
      updWriteOffRemark(data).then((res) => {
         this.$emit("closeSuccess");

      });
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

