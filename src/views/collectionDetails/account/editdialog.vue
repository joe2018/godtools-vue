
<template>
  <div class="import">
    <el-dialog
      :title="'编辑'"
      :visible.sync="editShow"
      :before-close="saveOrUpvisibleclose"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="受票方名称:">
          {{ editRow.accountName }}
        </el-form-item>
        <el-form-item label="受票方账号:">
          {{ editRow.accountNo }}
        </el-form-item>
        <el-form-item label="交易流水号:">
          {{ editRow.serialNumber }}
        </el-form-item>
        <el-form-item label="发生额:">
          {{ editRow.amount/100 }}
        </el-form-item>
        <el-form-item label="合伙人:">
          <el-input v-model="form.partner"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOrUpvisibleclose">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updatePartner } from "@/api/userCenter";
import fileDownload from "js-file-download";
export default {
  name: "",
  props: {
    editShow: {
      type: Boolean,
    },
    editRow: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        partner: "",
      },
    };
  },
  async created() {
    this.form.partner = this.editRow.partner;
  },
  mounted() {},
  methods: {
    saveOrUpvisibleclose() {
      this.$emit("close");
    },
    submit() {
      var data = {
        partner: this.form.partner,
        id: this.editRow.id,
      };
      updatePartner(data).then((res) => {
        this.$message({
          message: "修改合伙人成功",
          type: "success",
        });
        this.$emit("closeSuccess");
      });
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

