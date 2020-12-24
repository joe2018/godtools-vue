<template>
  <div class="InvoiceDetails-box">
    <!-- 搜索表单 -->
    
    <el-row class="totals">
        <el-col :span="6" class="items">
          <div>总条数</div>
          <div>{{totals.total}}</div>
        </el-col>
        <el-col :span="6" class="items" >
          <div>合计金额</div>
          <div>{{totals.totalPrice?totals.totalPrice/100:0}}</div>
        </el-col>
        <el-col :span="6" class="items">
          <div>价税合计</div>
          <div>{{totals.totalTaxAmount?totals.totalTaxAmount/100:0}}</div>
        </el-col>
        <el-col :span="6" class="items">
          <div>税额</div>
          <div>{{totals.taxAmount?totals.taxAmount/100:0}}</div>
        </el-col>
    </el-row>
    <div class="search-box">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="mini">
        <el-form-item label="合伙人:" prop="partner">
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
        <el-form-item label="购方单位名称：" prop="buyName">
          <el-input
            placeholder="请输入"
            @input="buyNameChange"
            v-model.trim="searchForm.buyName"
          ></el-input>
        </el-form-item>
         <el-form-item label="购方单位代码：" prop="buyCode">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.buyCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goodsName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.goodsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="开票人：" prop="invoiceName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.invoiceName"
          ></el-input>
        </el-form-item>
        <el-form-item label="复核人：" prop="checkName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.checkName"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款人：" prop="payeeName">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.payeeName"
          ></el-input>
        </el-form-item>
        <el-form-item label="原发票代码：" prop="oldInvoiceCode">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.oldInvoiceCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="原发票号码：" prop="oldInvoiceNo">
          <el-input
            placeholder="请输入"
            v-model.trim="searchForm.oldInvoiceNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="作废日期:" prop="cancelTime">
          <el-date-picker
            v-model="searchForm.cancelTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            align="right"
            unlink-panels
            range-separator="至"
            placeholder="作废日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开票日期:" prop="invoiceTime">
          <el-date-picker
            v-model="searchForm.invoiceTime"
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
      <el-table
        :data="tableData"
        v-loading="loading"
      > <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
        <el-table-column prop="partner" label="一级合伙人" width="200" fixed>
        </el-table-column>
        <el-table-column prop="invoiceTime" label="开票日期" width="100" fixed>
        </el-table-column>
        <el-table-column prop="companyName" label="出票公司"  width="200">
        </el-table-column>
        <el-table-column prop="invoiceCode" label="发票代码" width="100">
        </el-table-column>
        <el-table-column prop="invoiceNo" label="发票号码" width="100">
        </el-table-column>
        <el-table-column  prop="totalPrice" label="合计金额">
          <template slot-scope="scope">
            <div >{{scope.row.totalPrice/100}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="taxAmount" label="税额" >
          <template slot-scope="scope">
            <div >{{scope.row.taxAmount	/100}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="totalTaxAmount" label="价税合计" width="100">
          <template slot-scope="scope">
            <div >{{scope.row.totalTaxAmount/100}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="invoiceStatus" label="发票状态" >
          <!-- <template slot-scope="scope">
            <div >{{scope.row.totalTaxAmount/100}}</div>
          </template> -->
        </el-table-column>
        <el-table-column  prop="buyName" label="受票方名称" width="200">
        </el-table-column>
        <el-table-column  prop="buyCode" label="受票方代码" width="200">
        </el-table-column>
        <el-table-column  prop="goodsName" label="主要商品名称" width="200">
        </el-table-column>
        <el-table-column  prop="cancelTime" label="作废日期" width="100">
        </el-table-column>
        <el-table-column  prop="invoiceName" label="开票人"  width="70">
        </el-table-column>
        <el-table-column  prop="checkName" label="复核人" width="70">
        </el-table-column>
        <el-table-column  prop="payeeName" label="收款人" width="70">
        </el-table-column>
        <el-table-column  prop="oldInvoiceCode" label="原发票代码" width="100">
        </el-table-column>
        <el-table-column  prop="oldInvoiceCode" label="原发票号码" width="100">
        </el-table-column>
        <el-table-column  prop="remark" label="备注" width="300">
        </el-table-column>
        <el-table-column prop="operator" label="操作" fixed="right" width="100">
           <template slot-scope="scope">
          <el-button type="text" size="small"  @click="deleteitem(scope.row.id)"
            >删除</el-button
          >
          <el-button type="text" size="small"  @click="edit(scope.row)"
            >编辑</el-button
          >
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
    <importdialog
      v-if="importdialogShow"
      :importdialogShow="importdialogShow"
      @close="close"
      @closeSuccess="closeSuccess"
    ></importdialog>
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
  findListAntSummeryByCondition,
  delInvoiceById,
  exportExcelfa
} from "@/api/userCenter";
import fileDownload from "js-file-download";
import importdialog from "./importdialog";
import edit from "./editdialog";
import myTable from "@/components/myTable/index.vue";
import comnPagination from "@/components/paginationCom/index.vue";
export default {
  name: "carrierConsignor",
  components: { comnPagination, myTable,  importdialog,edit},
  data() {
    return {
      loading:true,
      editRow:{},
      editShow:false,
      importdialogShow:false,
      addContractmodel: false,
      selectedOptions: [],
      setPointForms: {}, //业务配置
      hasChildren: true,
      tableData: [],
      totals:{},
      searchForm: {
        companyid:'',
        carrierName: "",
        carrierId: "",
        consignorName: "",
        contractNum: "",
        invoiceCompanyName: "",
        createTime: "",
        payType: "",
        rangeArray: "", //创建时间
        pager: {
          page: 1,
          pageSize: 10,
          like:'',
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
  },

  methods: {
    buyNameChange(){
      this.searchForm.pager.like = 'buyName'
    },
    //导入
    importfile() {
      this.importdialogShow = true;
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
    //查看详情
    detail(row) {
      this.detailRow = row;
      this.isSee = true;
    },
    search() {
      this.loading = true;
      this.searchForm.pager.page = 1;
      this.searchForm.pager.pageSize = 10;
      this.getList();
    },
    deleteitem(id) {
      this.$confirm("确定删除该发票？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.loading = true;
          delInvoiceById(id).then((res) => {
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {});
    },
    edit(row){
      this.editRow = row;
      this.editShow = true;
    },
    //到处发票
    exportExcel() {
      //  this.searchForm.pager.pageSize =
      exportExcelfa(this.searchForm).then((res) => {
        fileDownload(res, "发票信息.xlsx");
      });
    },
    getList() {
      findListAntSummeryByCondition(this.searchForm).then((res) => {
        res.data.map((item) => {
          item.detailData = [];
        });
        this.loading = false;
        this.tableData = res.data;
        this.totals = res.data3;
        this.myPages.total = res.data3.total
        // this.myPages.total = res.totalCount;
      })
    },
    clear() {
      this.loading = false;
      this.$refs["searchForm"].resetFields();
      this.getList();
    },
    close() {
      this.loading = true;
      this.importdialogShow = false;
      this.loading  = false
      this.editShow =false;
    },
    closeSuccess() {
      this.loading = true;
      this.importdialogShow = false;
      this.editShow =false;
      this.getList();
    },
  },
};
</script>
<style lang="scss" >
.InvoiceDetails-box {
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
      //   width: 100px;
      padding: 10px 20px;
      background-color: rgba(24, 144, 255, 1);
      background-color: rgba(206, 206, 206, 1);
      //   height: 30px;
      //   line-height: 30px;
      color: #fff;
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
  .blue{
    color: #409EFF;
  }
  .yellow{
    color:#FF9833
  }
  .new{
    color: #409EFF;
  }
  .green{
    color: green;
  }
  .error{
    color: red;
  }
  .totals{
    text-align: center;
    border-radius: 5px;
    border: 1px dashed #409cff;
    background: #e6f7ff;
    padding: 30px 0;
    margin-bottom: 20px;
    .items{
      border-right: 1px solid #ccc;
      div{
        margin:  5px 0;
      }
      :nth-child(1){
         color: #ccc;
      }
    }
  }
}
</style>

