<template>
  <div>
    <el-table
      :data="data"
      @sort-change='sortChange'
      @selection-change="handleSelectionChange"
      :show-header="showHeader"
      :max-height="maxHeight"
      :v-loading="loading"
      :class="className"
      element-loading-text="给我一点时间"
      stripe
      fit
      highlight-current-row
    > 
    <el-table-column v-if="selectionBox" type="selection" width="55"/>
      <el-table-column
        v-if="indexBol"
        label="序号"
        type="index"
        align="center"
      ></el-table-column>
      <!-- //使用template 顺序不乱 -->
      <template v-for="colConfig in colConfigs">
        <!-- //slot 添加自定义配置项 -->
        <slot
          v-if="colConfig.slot"
          :name="colConfig.slot"
        >
	    	</slot>
        <!-- //component 特殊处理某一项 -->
        <component
          v-else-if="colConfig.component"
          :is="config.component"
          :col-config="colConfig"
        >
		    </component>
        <el-table-column
          v-else
          v-bind="colConfig"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
      </template>
 
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'iTable',
  props: {
    indexBol: {//序号
      type: Boolean,
      default:true
    }, 
    selectionBox: {//序号
      type: Boolean,
      default:true
    }, 
    colConfigs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ""
    }
  },
  methods:{
    sortChange(){//排序
      this.$emit('sortChange')
    },
    handleSelectionChange(row){
      this.$emit('selectChange',row)
    },
  }
};
</script>
 
<style scoped>
</style>