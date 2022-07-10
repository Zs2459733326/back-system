<template>
  <div>
    <el-pagination
      background
      @size-change="hanldSizeChange"
      @current-change="hanldCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import {getData} from '@/api/api';
export default {
  name: "Paging",
  props: {
    "total":Number,
    "url": String
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    // 处理页面数据尺寸改变时
    hanldSizeChange(val) {
      this.pageSize = val 
      this.currentPage = 1
      getData(this.$parent, this.url, {offset: this.currentPage - 1, limit: val})
    },
    // 处理当前页数改变时
    hanldCurrentChange(val) {
      this.currentPage = val
      getData(this.$parent, this.url, {offset: (this.currentPage - 1) * this.pageSize, limit: this.pageSize})
    },
  },
};
</script>