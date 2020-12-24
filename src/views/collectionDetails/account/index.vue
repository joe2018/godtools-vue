<template>
  <div class="account-box">
    <el-row class="totals">
      <el-col :span="6" class="items">
        <div>总条数</div>
        <div>{{ totals.total }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>发生额</div>
        <div>{{ totals.amount ? totals.amount / 100 : 0 }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>借方金额</div>
        <div>{{ totals.debitAmount / 100 }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>贷方金额</div>
        <div>{{ totals.creditAmount / 100 }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>总已付金额</div>
        <div>{{ totals.totalAmount / 100 }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>收款已销</div>
        <div>{{ totals.markAmount / 100 }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>收款未销</div>
        <div>{{ totals.totalAmount / 100 }}</div>
      </el-col>
      <el-col :span="6" class="items">
        <div>付款已销</div>
        <div>{{ totals.paymentAmount / 100 }}</div>
      </el-col>
    </el-row>
    <!-- 搜索表单 -->
    <div class="search-box">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="mini">
        <el-form-item label="合伙人：" prop="partner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.partner"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司：" prop="companyName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="对方账号：" prop="accountNo">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.accountNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="对方户名：" prop="accountName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.accountName"
          ></el-input>
        </el-form-item>
        <el-form-item label="交易流水号：" prop="serialNumber">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.serialNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="交易时间:">
          <el-date-picker
            v-model="searchForm.tradeDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            align="right"
            unlink-panels
            range-separator="至"
            placeholder="交易日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button @click="clear">重置</el-button>
          <el-button type="primary" @click="importfile()">导入</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      @sort-change="sortChange"
      @expand-change="clickTable"
      v-loading="loading"
    >
      <el-table-column type="expand" fixed>
        <template slot-scope="scope">
          <el-table :data="scope.row.detailData" border="">
            <el-table-column label="日期" prop="payTime" width="200">
            </el-table-column>
            <el-table-column label="收款人" prop="payeeName" width="100">
            </el-table-column>
            <el-table-column label="收款人账户" prop="accountNo" width="200">
            </el-table-column>
            <el-table-column label="收款金额" prop="idCard" width="100">
              <template slot-scope="scope">
                <div>{{ scope.row.amount / 100 }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="new"
                  @click="deleteitems(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
      <el-table-column prop="tradeDate" label="交易日期" width="200" fixed>
      </el-table-column>
      <el-table-column prop="debitAmount" label="借方金额" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.debitAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="debitAmount" label="贷方金额" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.creditAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="发生额" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.amount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="accountNo" label="对方账号" width="200">
      </el-table-column>
      <el-table-column prop="accountName" label="受票方名称" width="200">
      </el-table-column>
      <el-table-column prop="summary" label="摘要" width="200">
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="amount" label="合计付款" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.totalAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="剩余金额" width="150">
        <template slot-scope="scope">
          <div>{{ (scope.row.amount - scope.row.totalAmount) / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="留存比例" width="150">
        <template slot-scope="scope">
          <div>
            {{
              (
                ((scope.row.amount - scope.row.totalAmount) /
                  scope.row.amount) *
                100
              ).toFixed(2)
            }}%
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="收款已销" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.markAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="收款未销" width="150">
        <template slot-scope="scope">
          <div>{{ (scope.row.amount - scope.row.markAmount) / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="付款已销" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.paymentAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="付款未销" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.totalAmount - scope.row.paymentAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="partner" label="一级合伙人" width="150" >
      </el-table-column>
      <el-table-column label="出票公司 " prop="companyName"> </el-table-column>
      <el-table-column prop="serialNumber" label="交易流水号" width="200">
      </el-table-column>
      <el-table-column prop="carrier" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteitem(scope.row.id)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="
              addpayeeShow = true;
              addId = scope.row.id;
              ruleForm = ruleForm1;
            "
            >导入付款</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <comnPagination
      :total="myPages.total"
      :limit.sync="searchForm.pager.pageSize"
      :page.sync="searchForm.pager.page"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
    </comnPagination>
    <importdialog
      v-if="importdialogShow"
      :importdialogShow="importdialogShow"
      @close="close"
      @closeSuccess="closeSuccess"
    ></importdialog>
    <addpayee
      v-if="addpayeeShow"
      :addId="addId"
      :addpayeeShow="addpayeeShow"
      :indexForm="ruleForm"
      @close="close"
      @closeSuccess="closeSuccess"
    ></addpayee>
    <edit
      v-if="editShow"
      :editShow="editShow"
      :editRow="editRow"
      @close="close"
      @closeSuccess="closeSuccess"
    ></edit>
  </div>
</template>
<script>
import {
  MfindListAntSummeryByCondition,
  findPayListByMakeAmountId,
  MexportExcel,
  delMakeAmountDetailById,
  delMakeAmountById,
} from "@/api/userCenter";
import myTable from "@/components/myTable/index.vue";
import fileDownload from "js-file-download";
import edit from "./editdialog";
import importdialog from "./importdialog";
import addpayee from "./addpayee";
// fileDownload(res.data,'safa.xlsx')
import comnPagination from "@/components/paginationCom/index.vue";
export default {
  name: "carrierConsignor",
  components: { comnPagination, myTable, importdialog, addpayee, edit },
  data() {
    return {
      editRow: 0,
      editShow: false,
      totals: {},
      loading: true,
      importdialogShow: false,
      addId: "",
      addpayeeShow: false,
      ruleForm: {
        relationship: "",
        payeeName: "",
        bankName: "",
        idCard: "",
        accountNo: "",
        customerId: this.addId,
      },
      ruleForm1: {
        relationship: "",
        payeeName: "",
        bankName: "",
        idCard: "",
        accountNo: "",
        customerId: this.addId,
      },
      selectedOptions: [],
      setPointForms: {}, //业务配置
      hasChildren: true,
      tableData: [],
      searchForm: {
        partner: "",
        companyName: "",
        accountNo: "",
        accountName: "",
        serialNumber: "",
        tradeDate: "",
        pager: {
          page: 1,
          pageSize: 10,
          like:'accountName'
        },
      },
      myPages: {
        //分页数据
        limit: 10,
        page: 1,
        total: 0,
      },
      selected: [],
      consignorId: "",
    };
  },
  created() {
    this.getList(1);
  },

  methods: {
    sortChange({ column, prop, order }) {
      this.searchForm.pager.sortField = prop;
      this.searchForm.pager.sortOrder = order
        ? order.replace(/ending$/, "")
        : "";
      this.submit();
    },
    //列表展开
    clickTable(row) {
      findPayListByMakeAmountId(row.id).then((res) => {
        row.detailData = res.data;
      });
    },
    handleSizeChange(val) {
      //切换limit
      this.loading = true;
      this.searchForm.pager.pageSize = val.limit;
      this.getList();
    },
    handleCurrentChange(val) {
      //页码切换page
      this.loading = true;

      this.searchForm.pager.page = val.page;
      this.getList();
    },
    //到处客户
    exportExcel() {
      //  this.searchForm.pager.pageSize =
      MexportExcel(this.searchForm).then((res) => {
        fileDownload(res, "收款信息信息.xlsx");
      });
    },
    //导入
    importfile() {
      this.importdialogShow = true;
    },
    deleteitem(id) {
      this.$confirm("确定删除该收款？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.loading = true;
          delMakeAmountById(id).then((res) => {
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {});
    },
    edit(row) {
      this.editRow = row;
      this.editShow = true;
    },
    deleteitems(row) {
      this.$confirm("确定删除该付款人？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.loading = true;

          delMakeAmountDetailById(row.id).then((res) => {
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
            row;
          });
        })
        .catch(() => {});
    },
    search() {
      this.loading = true;
      this.searchForm.pager.page = 1;
      this.searchForm.pager.pageSize = 10;
      this.getList();
    },
    getList() {
      MfindListAntSummeryByCondition(this.searchForm).then((res) => {
        res.data.map((item) => {
          item.detailData = [];
        });
        this.loading = false;
        this.tableData = res.data;
        this.totals = res.data3;
        this.myPages.total = res.data3.total;
      });
    },
    clear() {
      this.loading = false;
      this.$refs["searchForm"].resetFields();
      this.getList();
    },
    close() {
      this.loading = true;
      this.importdialogShow = false;
      this.addpayeeShow = false;
      this.editShow = false;
      this.loading = false;
    },
    closeSuccess() {
      this.loading = true;
      this.importdialogShow = false;
      this.addpayeeShow = false;
      this.editShow = false;
      this.loading = false;
      this.getList()
    },
  },
};
</script>
<style lang="scss" >
.account-box {
  width: 100%;
  height: auto;
  padding: 20px;
  .search-box {
    width: 100%;
  }
  .el-form-item.work.el-form-item--mini {
    .el-input__inner {
      line-height: 28px;
      height: 28px;
    }
    .el-input__icon {
      line-height: 28px;
    }
    .el-cascader {
      line-height: 28px;
    }
  }
  .tabs {
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    .tab {
      cursor: pointer;
      padding: 10px 20px;
      background-color: rgba(206, 206, 206, 1);
      color: #000;
      font-size: 15px;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .tab.taba {
      background-color: rgba(24, 144, 255, 1);
      color: #fff;
    }
    :nth-child(2) {
      margin-left: 10px;
    }
  }
  .blue {
    color: #409eff;
  }
  .yellow {
    color: #ff9833;
  }
  .new {
    color: #409eff;
  }
  .green {
    color: green;
  }
  .error {
    color: red;
  }
  .totals {
    text-align: center;
    border-radius: 5px;
    border: 1px dashed #409cff;
    background: #e6f7ff;
    padding: 30px 0;
    margin-bottom: 20px;
    .items {
      border-right: 1px solid #ccc;
      div {
        margin: 5px 0;
      }
      :nth-child(1) {
        color: #ccc;
      }
    }
  }
}
</style>

