
<template>
  <div class="contrast">
      <div class="title">比对结果</div>
      <div>
          <el-button type="primary" @click="goback" size="mini">返回</el-button>
          <el-button type="primary"  size="mini" @click="exportExcel">导出比对结果</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="比对结果" width="100" fixed></el-table-column>
      <el-table-column prop="date" label="来源" width="100" fixed></el-table-column>
      <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
      <el-table-column prop="invoiceTime" label="订单号" width="155" fixed>
        <template slot-scope="scope">
          <div>{{ scope.row.fields.ddh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="客户名称" width="210" >
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
    </el-table>
  </div>
</template>

<script>
import fileDownload from "js-file-download";
export default {
  name: "contrast",
  props: {
    response: {
      type: Object,
    },
    // typeid: {
    //   type: String,
    // },
  },
  data() {
    return {
        tableData:[]
    };
  },
  async created() {
        console.log(this.response)

  },
  mounted() {},
  methods: {
      goback(){
          this.$emit('closeSuccessCompare',{})
      },
      exportExcel(){
        this.deleteArr = [];
        this.tableData.forEach((item,index,arr)=>{
        this.deleteArr.push(item.fields)
      })
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `比对结果,来源,订单号,客户名称,下单人,下单人联系电话,发货人姓名,发货人联系电话,收货人姓名,收货人联系电话,装货地省,装货地市,装货地县/区,装货地详细地址,卸货地省,卸货地市,卸货地县/区,卸货地详细地址,货物类型,货物数量,货物单位,应收运费,发起收款金额,运单号,承运商姓名,承运商电话,下单时间,装货时间,到达时间（小时）,总装货量,总卸货量,车牌号,司机姓名,司机联系电话,现金支付金额,油卡支付金额,油卡卡号,是否已付,业务所属部门,是否开票,厂单号,货主\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for(let i = 0 ; i < this.deleteArr.length ; i++ ){
        for(let item in this.deleteArr[i]){
            str+=`${this.deleteArr[i][item] + '\t'},`;     
        }
        str+='\n';
      }
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download =  "json数据表.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      },
  },
};
</script>
<style scoped lang="scss">
.contrast {
 .title{
     margin-bottom: 20px;
 }
}
</style>

