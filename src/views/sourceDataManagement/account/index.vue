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
      <el-table-column prop="invoiceTime" label="订单号" width="155" fixed>
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ddh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="客户名称" width="210" fixed>
        <template slot-scope="scope">
          <div>{{ scope.row.fields.khmc}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceCode" label="下单人" width="100" >
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xdr}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="下单人联系电话" width="120" >
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xdrlxdh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="发货人姓名" width="110">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.fhrxm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="发货人联系电话" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.fhrlxdh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="收货人姓名" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.shrxm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="收货人联系电话" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.shrlxdh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="装货地省">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zhds}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="装货地市">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zhdcs}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="装货地区">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zhdq}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="装货地详细地址" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zhdz}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="卸货地省">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xhds}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="卸货地市">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xhdcs}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="卸货地区">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xhdq}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="卸货地详细地址" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xhdz}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="货物类型">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.hwlx}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="货物数量">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.hwsl}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="货物单位">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.hwdw}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="应收运费">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ysyf}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="发起收款金额" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.fqskje}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="运单号" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ydh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="承运商姓名" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.cysxm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="承运商电话" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.cysdh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="下单时间" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xdsj}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="装货时间" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zhsj}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="到达时间（小时）" width="140">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.dasj}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="总装货量">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zzhl}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="总卸货量">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.zxhl}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="车牌号">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.cph}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="司机姓名">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.sjxm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="司机联系电话" width="140">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.sjlxdh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="现金支付金额" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.xjzfje}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="油卡支付金额" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ykzfje}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="油卡卡号" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ykkh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="是否已付">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.sfyf}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="业务所属部门" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ywssbm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="是否开票">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.sfkp}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="厂单号" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.cdh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="货主" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.hz}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="导入时间" width="200">
        <template slot-scope="scope">
          <div>{{ scope.row.fields.drsj }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteitem([scope.row.fields.ddh])">删除</el-button>
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
        this.tableData = res.data;
        this.myPages.total = res.all_index;
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

