
<template>
  <div class="add">
    <el-dialog
      :title="'添加收款人'"
      :visible.sync="addpayeeShow"
      :before-close="saveOrUpvisibleclose"
      width="50%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="170px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款人姓名" prop="payeeName">
              <el-input v-model="ruleForm.payeeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人开户行" prop="bankName">
              <el-input v-model="ruleForm.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人账户" prop="accountNo">
              <el-input v-model="ruleForm.accountNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人身份证" prop="idCard">
              <el-input v-model="ruleForm.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人跟受票方的关系" prop="relationship">
              <el-input v-model="ruleForm.relationship"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOrUpvisibleclose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          indexForm.accountNo != "" ? "确认保存" : "确认添加"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addPayeea, updaPayeea } from "@/api/userCenter";

export default {
  name: "",
  props: {
    addpayeeShow: {
      type: Boolean,
    },
    addId: {
      type: String,
    },
    indexForm: {
      type: Object,
    },
  },
  data() {
    return {
      ruleForm: {
        relationship: "",
        payeeName: "",
        bankName: "",
        idCard: "",
        accountNo: "",
        customerId: this.addId,
      },
      rules: {
        accountNo: [
          { required: true, message: "请输入收款人账户", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入收款人身份证号	", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入收款人开户行", trigger: "blur" },
        ],
        payeeName: [
          { required: true, message: "请输入收款人姓名", trigger: "blur" },
        ],
        relationship: [
          {
            required: true,
            message: "请输入收款人跟受票方的关系",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {
    this.ruleForm.accountNo = this.indexForm.accountNo;
    this.ruleForm.bankName = this.indexForm.bankName;
    this.ruleForm.idCard = this.indexForm.idCard;
    this.ruleForm.payeeName = this.indexForm.payeeName;
    this.ruleForm.relationship = this.indexForm.relationship;
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.indexForm.accountNo == "") {
            addPayeea(this.ruleForm).then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.$emit("closeSuccess");
            });
          } else {
            this.ruleForm.id = this.indexForm.id;
            updaPayeea(this.ruleForm).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.$emit("closeSuccess");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    saveOrUpvisibleclose() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped lang="scss">
.add {
}
</style>

