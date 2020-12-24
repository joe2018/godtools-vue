<template>
  <div class="account-box">
    <!-- 搜索表单 -->
    <div class="search-box">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="mini">
        <el-form-item label="受票方名称：" prop="draweeName" >
          <el-input
            placeholder="请输入"
            @input="draweeNameChange"
            v-model.trim="searchForm.draweeName"
          ></el-input>
        </el-form-item>
        <el-form-item label="一级合伙人：" prop="onePartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.onePartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="二级合伙人：" prop="twoPartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.twoPartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="三级合伙人：" prop="threePartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.threePartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="四级合伙人：" prop="fourPartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.fourPartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="承运人：" prop="carrier">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.carrier"
          ></el-input>
        </el-form-item>
        <el-form-item label="开发业务员：" prop="businessManager">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.businessManager"
          ></el-input>
        </el-form-item>
        <el-form-item label="维护人员：" prop="maintenanceStaff">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.maintenanceStaff"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理部门：" prop="managementDepartment">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.managementDepartment"
          ></el-input>
        </el-form-item>
        <el-form-item label="归属部门：" prop="department">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.department"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域经理：" prop="regionalManager">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.regionalManager"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户性质：" prop="customerNature">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.customerNature"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="收款人姓名：" prop="">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.jiadanren"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款人账户：" prop="">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.jiadanren"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款人身份证：" prop="">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.jiadanren"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="修改日期:">
          <el-date-picker
            v-model="searchForm.updateTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            align="right"
            unlink-panels
            range-separator="至"
            placeholder="修改日期"
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
    <!-- table -->
    <!-- <myTable
      :data="tableData"
      :col-configs="tableConfigArr"
      :selectionBox="false"
      @selectChange="selectChange" 
    >
      <el-table-column label="账户信息" slot="a" align="center" width="">
        <template slot-scope="scope">
          <div >{{scope.row.a}}</div>
          <div >{{scope.row.b}}</div>
        </template>
      </el-table-column>
      <el-table-column label="流水号/交易单号" slot="b" align="center" width="200">
        <template slot-scope="scope">
          <div >{{scope.row.c}}</div>
          <div >{{scope.row.d}}</div>
        </template>
      </el-table-column>
      <el-table-column label="交易金额/交易时间" slot="f" align="center" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.h.indexOf('+')>-1?'blue':'yellow'">{{scope.row.h}}</div>
          <div >{{scope.row.i}}</div>
        </template>
      </el-table-column>
      <el-table-column label="到账金额/手续费" slot="g" align="center" width="">
        <template slot-scope="scope">
          <div >{{scope.row.h}}</div>
          <div >{{scope.row.j}}</div>
        </template>
      </el-table-column>
      <el-table-column label="其他" slot="h" align="center" width="250">
        <template slot-scope="scope">
          <div >{{scope.row.l}}</div>
          <div >{{scope.row.m}}</div>
        </template>
      </el-table-column>
    </myTable> -->
    <!--树形表格-->
    <el-table
      :data="tableData"
      @sort-change="sortChange"
      @expand-change="clickTable"
      v-loading="loading"
    >
      <el-table-column type="expand" fixed>
        <template slot-scope="scope">
          <el-table :data="scope.row.detailData" border="">
            <el-table-column label="收款人姓名" prop="payeeName">
            </el-table-column>
            <el-table-column label="收款人开户行" prop="bankName">
            </el-table-column>
            <el-table-column label="收款人账户" prop="accountNo">
            </el-table-column>
            <el-table-column label="收款人身份证" prop="idCard">
            </el-table-column>
            <el-table-column label="收款人跟受票方的关系" prop="relationship">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="new"
                  @click="
                    addpayeeShow = true;
                    addId = scope.row.customerId;
                    ruleForm = scope.row;
                  "
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  class="new"
                  @click="
                    addpayeeShow = true;
                    addId = scope.row.customerId;
                  "
                  >新增</el-button
                >
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
      <el-table-column prop="updateTime" label="修改日期" width="150" fixed>
      </el-table-column>
      <el-table-column prop="draweeName" label="受票方名称" width="200" fixed>
      </el-table-column>
      <el-table-column
        prop="beforePoints"
        label="服务点数扣除营销费前"
        width="150"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.beforePoints / 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="营销点数 " prop="markPoints">
        <template slot-scope="scope">
          <div>{{ scope.row.markPoints / 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="afterPoints"
        label="服务点数扣除营销费后"
        width="150"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.afterPoints / 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column prop="onePartner" label="一级合伙人" width="200">
      </el-table-column>
      <el-table-column prop="twoPartner" label="二级合伙人" width="200">
      </el-table-column>
      <el-table-column prop="threePartner" label="三级合伙人" width="200">
      </el-table-column>
      <el-table-column prop="fourPartner" label="四级合伙人" width="200">
      </el-table-column>
      <el-table-column prop="carrier" label="承运人"> </el-table-column>
      <el-table-column prop="businessManager" label="开发业务员" width="120">
      </el-table-column>
      <el-table-column prop="maintenanceStaff" label="维护人员" width="120">
      </el-table-column>
      <el-table-column prop="managementDepartment" label="管理部门">
      </el-table-column>
      <el-table-column prop="department" label="归属部门"> </el-table-column>
      <el-table-column prop="regionalManager" label="区域经理">
      </el-table-column>
      <el-table-column prop="regionalManager" label="客户性质">
      </el-table-column>
      <el-table-column prop="carrier" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteitem(scope.row.id)"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="
              addpayeeShow = true;
              addId = scope.row.id;
              ruleForm = ruleForm1;
            "
            >收款人</el-button
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
      @closeSuccess='closeSuccess'
    ></importdialog>
    <addpayee
      v-if="addpayeeShow"
      :addId="addId"
      :addpayeeShow="addpayeeShow"
      :indexForm="ruleForm"
      @close="close"
      @closeSuccess='closeSuccess'

    ></addpayee>
  </div>
</template>
<script>
import {
  findListCountByCondition,
  findPayeeListByCustomerId,
  exportExcel,
  delCustomerById,
  delPayeeById,
} from "@/api/userCenter";

import myTable from "@/components/myTable/index.vue";
import fileDownload from "js-file-download";
import importdialog from "./importdialog";
import addpayee from "./addpayee";
// fileDownload(res.data,'safa.xlsx')
import comnPagination from "@/components/paginationCom/index.vue";
export default {
  name: "carrierConsignor",
  components: { comnPagination, myTable, importdialog, addpayee },
  data() {
    return {
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
        draweeName: "",
        onePartner: "",
        twoPartner: "",
        threePartner: "",
        fourPartner: "",
        carrier: "",
        businessManager: "",
        maintenanceStaff: "",
        managementDepartment: "",
        department: "",
        regionalManage: "",
        customerNature: "",
        updateTime: "",
        pager: {
          page: 1,
          pageSize: 10,
          // like:this.searchForm.draweeName ==''?'':this.searchForm.draweeName,
          like:''
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
    draweeNameChange(value){
      this.searchForm.pager.like = 'draweeName';
    },
    sortChange({ column, prop, order }) {
      this.searchForm.pager.sortField = prop;
      this.searchForm.pager.sortOrder = order
        ? order.replace(/ending$/, "")
        : "";
      this.submit();
    },
    //列表展开
    clickTable(row) {
      findPayeeListByCustomerId(row.id).then((res) => {
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
      exportExcel(this.searchForm).then((res) => {
        fileDownload(res, "客户信息.xlsx");
      });
    },
    //导入
    importfile() {
      this.importdialogShow = true;
    },
    deleteitem(id) {
      this.$confirm("确定删除该客户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.loading = true;
          delCustomerById(id).then((res) => {
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {});
    },
    deleteitems(row) {
      this.$confirm("确定删除该付款人？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.loading = true;

          delPayeeById(row.id).then((res) => {
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
      this.loading = true
      this.searchForm.pager.page = 1;
      this.searchForm.pager.pageSize = 10;
      this.getList();
    },
    getList() {
      findListCountByCondition(this.searchForm).then((res) => {
        res.data.map((item) => {
          item.detailData = [];
        });
        this.loading = false;
        this.tableData = res.data;
        this.myPages.total = res.totalCount;
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
      this.loading = false;
    },
    closeSuccess() {
      this.loading = true;
      this.importdialogShow = false;
      this.addpayeeShow = false;
      this.getList();
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
}
</style>

