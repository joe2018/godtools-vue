<template>
  <div class="account-box">
    <!-- 搜索表单 -->
    <div class="search-box">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="mini">
        <el-form-item label="公司：" prop="companyName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票代码：" prop="invoiceCode">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票号码：" prop="invoiceNo">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票状态：" prop="invoiceStatus">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceStatus"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域经理：" prop="regionalManager">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.regionalManager"
          ></el-input>
        </el-form-item>
        <el-form-item label="购方单位名称：" prop="buyName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.buyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="一级合伙人：" prop="partner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.partner"
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
        <el-form-item label="管理部门：" prop="managementDepartment">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.managementDepartment"
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
        <el-form-item label="收款时间:">
          <el-date-picker
            v-model="searchForm.writeOffTaxTimeArr"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开票时间:">
          <el-date-picker
            v-model="searchForm.invoiceTimeArr"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="付款时间:">
          <el-date-picker
            v-model="searchForm.writeOffPayTimeArr"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button @click="clear">重置</el-button>
          <el-button type="primary" @click="importfile()" v-if="code != '1' ">更新数据</el-button>
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
      v-loading="loading"
    >
      <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
      <el-table-column prop="invoiceTime" label="开票日期" width="150" fixed>
      </el-table-column>
      <el-table-column prop="companyName" label="出票公司" width="200" fixed>
      </el-table-column>
      <el-table-column prop="invoiceCode" label="发票代码" width="100" >
      </el-table-column>
      <el-table-column prop="invoiceNo" label="发票号码" width="100" >
      </el-table-column>
      <el-table-column
        prop="totalTaxAmount"
        label="价税合计"
        width="150"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.totalTaxAmount / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="受票方名称 " prop="buyName" width="200"> </el-table-column>
      <el-table-column
        prop="beforePoints"
        label="服务点数扣除营销费前"
        width="150"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.beforePoints / 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="应收服务费 " prop="shouldServiceFee"  width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.shouldServiceFee / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="markPoints" label="营销点数" width="">
        <template slot-scope="scope">
          <div>{{ scope.row.markPoints / 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="收款金额 " prop="writeOffTax"  width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.shouldServiceFee / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="未收运费金额 " prop="unReceivedFreight"  width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.unReceivedFreight / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="writeOffTaxTime" label="收款时间" width="200">
      </el-table-column>
      <el-table-column label="付款金额 " prop="writeOffPay"  width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.writeOffPay / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="未支付运费金额 " prop="unPayFeright"  width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.unPayFeright / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="writeOffPayTime" label="付款时间" width="200">
      </el-table-column>
      <el-table-column label="收付款流水差异 " prop="taxPayDif"  width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.taxPayDif / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="收付款流水差比例 " prop="taxPayDif"  width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.taxPayDifRate?scope.row.taxPayDifRate/100:''  }}</div>
        </template>
      </el-table-column>
      <el-table-column label="已收服务费 " prop="receivedServiceFee"  width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.receivedServiceFee/100}}</div>
        </template>
      </el-table-column>
       <el-table-column label="未收服务费 " prop="unReceivedServiceFee"  width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.unReceivedServiceFee/100}}</div>
        </template>
      </el-table-column>
      <el-table-column label="已收款待支付运费 " prop="receivedWaitFreight"  width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.receivedWaitFreight/100}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="writeOffRemark" label="备注" width="200">
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
            >编辑备注</el-button
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
      :addId='addId'
      @close="close"
      @closeSuccess="closeSuccess"
    ></importdialog>
  </div>
</template>
<script>
import {
  findInvoiceWriteOffPage,
  doUpdate,
  exportWriteOffExcel,
  delCustomerById,
  delPayeeById,
  findUpdateStatus,
} from "@/api/userCenter";

import myTable from "@/components/myTable/index.vue";
import fileDownload from "js-file-download";
import importdialog from "./importdialog";
// fileDownload(res.data,'safa.xlsx')
import comnPagination from "@/components/paginationCom/index.vue";
export default {
  name: "carrierConsignor",
  components: { comnPagination, myTable, importdialog, },
  data() {
    return {
      loading: true,
      importdialogShow: false,
      code:'0',
      addId: "",
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
        companyName: "",
        invoiceCode: "",
        invoiceNo: "",
        invoiceStatus: "",
        regionalManager: "",
        buyName: "",
        partner: "",
        twoPartner: "",
        threePartner: "",
        fourPartner: "",
        carrier: "",
        managementDepartment: "",
        businessManager: "",
        maintenanceStaff: "",
        writeOffTaxTimeArr: [],
        invoiceTimeArr: [],
        writeOffPayTimeArr: [],
        writeOffRemark:'',
        pager: {
          page: 1,
          pageSize: 10,
          like:'buyName'
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
    this.getList();
    this.searchIsupdate()
  },

  methods: {
    sortChange({ column, prop, order }) {
      this.searchForm.pager.sortField = prop;
      this.searchForm.pager.sortOrder = order
        ? order.replace(/ending$/, "")
        : "";
      this.submit();
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
      exportWriteOffExcel(this.searchForm).then((res) => {
        fileDownload(res, "核销信息.xlsx");
      });
    },
    //导入
    importfile() {
      // this.importdialogShow = true;
      this.loading = true;
      doUpdate().then((res) => {
         this.getList()
      });
    },
    //查询数据是否更新
    searchIsupdate(){
      findUpdateStatus().then((res) => {
        this.code = res.data.code;
      });
    },
    deleteitem(id) {
      this.addId  = id;
      this.importdialogShow = true;
    },
    search() {
      this.loading = true;
      this.searchForm.pager.page = 1;
      this.searchForm.pager.pageSize = 10;
      this.getList();
    },
    getList() {
      findInvoiceWriteOffPage(this.searchForm).then((res) => {
        res.data.map((item) => {
          item.detailData = [];
        });
        this.loading = false;
        this.tableData = res.data;
        this.myPages.total = res.data3.total;
      });
    },
    clear() {
      this.loading = true;
      this.$refs["searchForm"].resetFields();
      this.getList();
    },
    close() {
      this.loading = true;
      this.importdialogShow = false;
      this.loading =false;
    },
    closeSuccess() {
      this.loading = true;
      this.importdialogShow = false;
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

