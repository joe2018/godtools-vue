<template>
  <div  class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total"
      :pager-count="pagerCount"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    hidden: { // 控制 分页是否出现，这里一般设置total小于等于0的时候，将分页组件隐藏。
      type: Boolean,
      default: false
    },
    total: { // 数据总条数
      required: true,
      type: Number
    },
    page: {
      //当前页
      type: Number,
      default: 1
    },
    limit: {
      //每页显示条目个数， 限制 每页多少条数据
      type: Number,
      default: 10
    },
    pageSizes: { // 每页显示个数选择器的选项设置,下拉选择框的选项值
      type: Array,
      default() { 
        return [10, 20, 30, 50, 100, 200];
      }
    },
    layout: { // 组件布局
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: { // 是否为分页按钮添加背景色，默认有背景，数字在蓝色的小框内的样式
      type: Boolean,
      default: true
    },
    pagerCount: {
     //页码按钮的数量， 默认显示7个数，当总页数超过该值时会折叠,注意这里：它必须是 大于等于 5 且小于等于 21 的奇数
      type: Number,
      default: 7
    }
  },
  computed: {
    currentPage: { // 计算属性返回当前页 （会改变）
      get() {
        return this.page;
      },
      set(val) {
       
      }
    },
    pageSize: { // 返回每页的限制条数，如每页30条，支持 .sync 修饰符实现同步更改
      get() {
        return this.limit;
      },
      set(val) {
        //this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {//pages切换
      this.$emit("handleSizeChange", { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {//page切换
      this.$emit("handleCurrentChange", { page: val, limit: this.pageSize });
    },
  }
};
</script>
<style lang="scss">
.pagination-container {
  background: #f1f1f1;
  display: flex;
  width: 100%;
  .refresh_icon {
    width: 32px;
    // color: $icon_color;
    margin: 8px 0 0 15px;
    cursor: pointer;
  }
}
</style>
