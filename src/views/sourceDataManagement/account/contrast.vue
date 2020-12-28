
<template>
  <div class="contrast">
    <div class="title">比对结果</div>
    <div>
      <el-button type="primary" @click="goback" size="mini">返回</el-button>
      <el-button type="primary" size="mini" @click="exportExcel"
        >导出比对结果</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%" border="" :span-method="objectSpanMethod" >
      <el-table-column prop="title" label="比对结果" width="155" fixed align="center"></el-table-column>
      <el-table-column prop="source" label="来源" width="155" fixed></el-table-column>
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
      <!-- <el-table-column prop="loading_date" label="装货日期" width="160">
        <template slot-scope="scope">
          <div>{{ scope.row.loading_date | dateFormat}}</div>
        </template>
      </el-table-column> -->
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
          <div>  {{scope.row.occurrence_time | dateFormat }} </div>
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
      tableData: [],
    };
  },
  async created() {
    for (let key in this.response) {
      if (this.response[key].length == 2) {
        this.response[key][0].source = "源";
        this.response[key][0].title = "异常";
        this.response[key][1].title = "";
        this.response[key][1].source = "导入";
      } else {
        this.response[key][0].title = "正常";
        this.response[key][0].source = "导入";
      }
      this.tableData = this.tableData.concat(this.response[key])
    }
  },
  mounted() {},
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (row.title === '异常') {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
    },
    goback() {
      this.$emit("closeSuccessCompare", {});
    },
    exportExcel() {
      var exportExcelArr = []
      for(var i = 0;i<this.tableData.length;i++){
          var obj = {
            title:this.tableData[i].title,
            source:this.tableData[i].source,
            batch_number:this.tableData[i].batch_number?this.tableData[i].batch_number:'',
            order_number:this.tableData[i].order_number,
            customer_name:this.tableData[i].customer_name,
            entrust_man_name:this.tableData[i].entrust_man_name,
            entrust_man_phone:this.tableData[i].entrust_man_phone,
            delivery_man_name:this.tableData[i].delivery_man_name,
            delivery_man_phone:this.tableData[i].delivery_man_phone,
            receive_man_name:this.tableData[i].receive_man_name,
            receive_man_phone:this.tableData[i].receive_man_phone,
            delivery_provinces:this.tableData[i].delivery_provinces,
            delivery_city:this.tableData[i].delivery_city,
            delivery_area:this.tableData[i].delivery_area,
            delivery_address:this.tableData[i].delivery_address,
            receive_provinces:this.tableData[i].receive_provinces,
            receive_city:this.tableData[i].receive_city,
            receive_area:this.tableData[i].receive_area,
            receive_address:this.tableData[i].receive_address,
            goods_type:this.tableData[i].goods_type,
            goods_quantity:this.tableData[i].goods_quantity,
            goods_units:this.tableData[i].goods_units,
            freight_receivable:this.tableData[i].freight_receivable,
            initiate_amount:this.tableData[i].initiate_amount,
            tracking_number:this.tableData[i].tracking_number,
            carrier_name:this.tableData[i].carrier_name,
            carrier_phone:this.tableData[i].carrier_phone,
            entrust_time:this.tableData[i].entrust_time?this.tableData[i].entrust_time:'',
            loading_time:this.tableData[i].loading_time,
            // loading_date:this.tableData[i].loading_date,
            transport_time:this.tableData[i].transport_time,
            loading_quantity:this.tableData[i].loading_quantity,
            unloading_quantity:this.tableData[i].unloading_quantity,
            license_plate:this.tableData[i].license_plate,
            driver_name:this.tableData[i].driver_name,
            driver_phone:this.tableData[i].driver_phone,
            cash_payments:this.tableData[i].cash_payments,
            oil_payment:this.tableData[i].oil_payment,
            oil_card:this.tableData[i].oil_card,
            payment_type:this.tableData[i].payment_type,
            business_department:this.tableData[i].business_department,
            invoice_type:this.tableData[i].invoice_type,
            merchant_number:this.tableData[i].merchant_number?this.tableData[i].merchant_number:'',
            shipper:this.tableData[i].shipper?this.tableData[i].shipper:'',
            occurrence_time:this.tableData[i].oil_card?this.tableData[i].oil_card:'',
          }
          exportExcelArr.push(obj)
      }
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `比对结果,来源,操作单号,订单号,客户名称,下单人,下单人联系电话,发货人姓名,发货人联系电话,收货人姓名,收货人联系电话,装货地省,装货地市,装货地县/区,装货地详细地址,卸货地省,卸货地市,卸货地县/区,卸货地详细地址,货物类型,货物数量,货物单位,应收运费,发起收款金额,运单号,承运商姓名,承运商电话,下单时间,装货时间,到达时间（小时）,总装货量,总卸货量,车牌号,司机姓名,司机联系电话,现金支付金额,油卡支付金额,油卡卡号,是否已付,业务所属部门,是否开票,厂单号,货主,导入时间\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < exportExcelArr.length; i++) {
        for (let item in exportExcelArr[i]) {
          str += `${exportExcelArr[i][item] + "\t"},`;
        }
        str += "\n";
      }
      //encodeURIComponent解决中文乱码
      let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download = "对比结果表.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
<style scoped lang="scss">
.contrast {
  .title {
    margin-bottom: 20px;
  }
}
</style>

