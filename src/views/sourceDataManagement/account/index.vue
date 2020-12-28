<template>
  <div class="account-box">
    <!-- 搜索表单 -->
    <div v-if="changeIndex">
    <div class="search-box">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="mini">
        <!-- <el-form-item label="订单号：" prop="companyName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称：" prop="invoiceCode">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货人姓名：" prop="invoiceNo">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名：" prop="invoiceStatus">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceStatus"
          ></el-input>
        </el-form-item>
        <el-form-item label="司机姓名：" prop="regionalManager">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.regionalManager"
          ></el-input>
        </el-form-item>
        <el-form-item label="运单号：" prop="buyName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.buyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="承运商姓名：" prop="partner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.partner"
          ></el-input>
        </el-form-item>
        <el-form-item label="车牌号：" prop="twoPartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.twoPartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货省：" prop="threePartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.threePartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货市：" prop="fourPartner">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.fourPartner"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货区县：" prop="carrier">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.carrier"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货详细地址：" prop="managementDepartment">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.managementDepartment"
          ></el-input>
        </el-form-item>
        <el-form-item label="司机电话：" prop="businessManager">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.businessManager"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货日期:">
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
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button @click="clear">重置</el-button> 
          <el-button type="primary"  @click="importdialogShow = true;typeid ='1' ">导入源文件</el-button>
          <el-button type="primary" @click="importdialogShow = true;typeid ='2' ">导入比对</el-button>
          <el-button type="danger" v-show="deleteArr.length>0" @click="deleteitem(deleteArr)">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    > 
      <el-table-column type="selection"  width="55"></el-table-column>
      <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
      <el-table-column prop="batch_number" label="操作单号" width="155" fixed></el-table-column>
      <el-table-column prop="order_number" label="订单号" width="155" fixed></el-table-column>
      <el-table-column prop="customer_name" label="客户名称" width="210" fixed></el-table-column>
      <el-table-column prop="entrust_man_name" label="下单人" width="100" ></el-table-column>
      <el-table-column prop="entrust_man_phone" label="下单人联系电话" width="120" ></el-table-column>
      <el-table-column prop="delivery_man_name" label="发货人姓名" width="110"></el-table-column>
      <el-table-column prop="delivery_man_phone" label="发货人联系电话" width="120"></el-table-column>
      <el-table-column prop="receive_man_name" label="收货人姓名" width="100"></el-table-column>
      <el-table-column prop="receive_man_phone" label="收货人联系电话" width="120"></el-table-column>
      <el-table-column prop="delivery_provinces" label="装货地省"></el-table-column>
      <el-table-column prop="delivery_city" label="装货地市"></el-table-column>
      <el-table-column prop="delivery_area" label="装货地县/区"></el-table-column>
      <el-table-column prop="delivery_address" label="装货地详细地址" width="150"></el-table-column>
      <el-table-column prop="receive_provinces" label="卸货地省"></el-table-column>
      <el-table-column prop="receive_city" label="卸货地市"></el-table-column>
      <el-table-column prop="receive_area" label="卸货地区"></el-table-column>
      <el-table-column prop="receive_address" label="卸货地详细地址" width="150"></el-table-column>
      <el-table-column prop="goods_type" label="货物类型"></el-table-column>
      <el-table-column prop="goods_quantity" label="货物数量"></el-table-column>
      <el-table-column prop="goods_units" label="货物单位"></el-table-column>
      <el-table-column prop="freight_receivable" label="应收运费"></el-table-column>
      <el-table-column prop="initiate_amount" label="发起收款金额" width="120"></el-table-column>
      <el-table-column prop="tracking_number" label="运单号" width="160"></el-table-column>
      <el-table-column prop="carrier_name" label="承运商姓名" width="100"></el-table-column>
      <el-table-column prop="carrier_phone" label="承运商电话" width="120"></el-table-column>
      <el-table-column prop="invoiceNo" label="下单时间" width="160">
        <template slot-scope="scope">
          <div>  {{scope.row.entrust_time | dateFormat }} </div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="装货时间" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.loading_time | dateFormat}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="transport_time" label="到达时间（小时）" width="140"></el-table-column>
      <el-table-column prop="loading_quantity" label="总装货量"></el-table-column>
      <el-table-column prop="unloading_quantity" label="总卸货量"></el-table-column>
      <el-table-column prop="license_plate" label="车牌号"></el-table-column>
      <el-table-column prop="driver_name" label="司机姓名"></el-table-column>
      <el-table-column prop="driver_phone" label="司机联系电话" width="140"></el-table-column>
      <el-table-column prop="cash_payments" label="现金支付金额" width="120"></el-table-column>
      <el-table-column prop="oil_payment" label="油卡支付金额" width="120"></el-table-column>
      <el-table-column prop="oil_card" label="油卡卡号" width="160"></el-table-column>
      <el-table-column prop="payment_type" label="是否已付"></el-table-column>
      <el-table-column prop="business_department" label="业务所属部门" width="160"></el-table-column>
      <el-table-column prop="invoice_type" label="是否开票"></el-table-column>
      <el-table-column prop="merchant_number" label="厂单号" width="160"></el-table-column>
      <el-table-column prop="shipper" label="货主" width="160"> </el-table-column>
      <el-table-column prop="occurrence_time" label="导入时间" width="200">
        <template slot-scope="scope">
          <div>{{ scope.row.occurrence_time | dateFormat}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteitem([scope.row.order_number])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <comnPagination
      :total="myPages.total"
      :limit.sync="myPages.limit"
      :page.sync="myPages.page"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
    </comnPagination>
    
    </div>
    <contrast v-if="!changeIndex"  :response='response' @closeSuccessCompare='closeSuccessCompare'></contrast>
    <importdialog
      v-if="importdialogShow"
      :importdialogShow="importdialogShow"
      :typeid='typeid'
      @close="close"
      @closeSuccess="closeSuccess"
      @closeSuccessCompare='closeSuccessCompare'
    ></importdialog>
  </div>
</template>
<script>
import {
  findQueryList,
  deleteList,

  exportWriteOffExcel,
  delCustomerById,
  delPayeeById,
} from "@/api/userCenter";

import myTable from "@/components/myTable/index.vue";
import fileDownload from "js-file-download";
import importdialog from "./importdialog";
import contrast from "./contrast";
import comnPagination from "@/components/paginationCom/index.vue";
export default {
  name: "carrierConsignor",
  components: { comnPagination, myTable, importdialog,contrast },
  data() {
    return {
      response:{},
      changeIndex:true,
      loading: true,
      typeid:'',
      deleteArr:[],
      importdialogShow: false,
      code:'0',
      selectedOptions: [],
      setPointForms: {}, //业务配置
      hasChildren: true,
      tableData: [],
      searchForm: {
        page:1,
        lim:10
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
  },

  methods: {
    handleSelectionChange(val) {
      this.deleteArr = []
      val.forEach((item,index,arr)=>{
         this.deleteArr.push(item.fields.ddh)
      })
      this.multipleSelection = val;
    },
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
      this.searchForm.lim = val.limit;
      this.getList();
    },
    handleCurrentChange(val) {
      //页码切换page
      this.loading = true;
      this.searchForm.page = val.page;
      this.getList();
    },
    deleteitem(arr) {
      var data = {
        data:arr
      }
      this.$confirm("确定删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.loading = true;
          deleteList(data).then((res) => {
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {});
    },
    search() {
      this.loading = true;
      this.searchForm.page = 1;
      // this.searchForm.pager.pageSize = 10;
      this.getList();
    },
    getList() {
      findQueryList(this.searchForm).then((res) => {
        this.loading = false;
        this.tableData = res.content[0];
        this.myPages.total = Number(res.info.total);
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
    closeSuccessCompare(response){
      this.response = response;
      this.importdialogShow = false;
      this.changeIndex = !this.changeIndex;
    }
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

