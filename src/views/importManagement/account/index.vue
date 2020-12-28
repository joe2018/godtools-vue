<template>
  <div class="account-box">
    <!-- 搜索表单 -->
    <div >
      <div class="search-box">
        <el-form
          ref="searchForm"
          :model="searchForm"
          :inline="true"
          size="mini"
        >
          <!-- <el-form-item label="操作单号：" prop="companyName">
            <el-input
              placeholder="请输入"
              v-model.trim="searchForm.companyName"
            ></el-input>
          </el-form-item>
          <el-form-item label="写入状态：" prop="companyName">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货日期:">
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
            <!-- <el-button @click="clear">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="操作单号" prop="batch_number"></el-table-column>
        <el-table-column label="写入状态" prop="">
          <template slot-scope="scope">
          <div>  {{scope.row.batch_type == 0?'导入成功':(scope.row.batch_type == 1?'正在导入中':'导入失败') }} </div>
        </template>
        </el-table-column>
        <el-table-column label="导入时间" prop="">
          <template slot-scope="scope">
          <div>  {{scope.row.batch_time | dateFormat }} </div>
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
  </div>
</template>
<script>
import {
  recordList
} from "@/api/userCenter";

import myTable from "@/components/myTable/index.vue";
import comnPagination from "@/components/paginationCom/index.vue";
export default {
  name: "carrierConsignor",
  components: { comnPagination, myTable },
  data() {
    return {
      loading:true,
      options: [{
          value: '0',
          label: '写入中'
        }, {
          value: '1',
          label: '写入失败'
        }, {
          value: '2',
          label: '写入成功'
        }],
      tableData: [],
      searchForm: {
        status:'',
        page: 1,
        lim: 10,
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
      this.deleteArr = [];
      val.forEach((item, index, arr) => {
        this.deleteArr.push(item.fields.ddh);
      });
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
    search() {
      this.loading = true;
      this.searchForm.page = 1;
      // this.searchForm.pager.pageSize = 10;
      this.getList();
    },
    getList() {
      recordList(this.searchForm).then((res) => {
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

