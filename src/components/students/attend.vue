<template>
    <div class="attend">
        <!-- 新增 和 查询  -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学生姓名">
                <el-input v-model="formInline.name" placeholder="学生姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="find">查询</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>

        </el-form>
        <!-- 表格部分 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="class" label="班级" align="center"></el-table-column>
            <el-table-column prop="actual" label="实到课" align="center"></el-table-column>
            <el-table-column prop="toBeDue" label="应到课" align="center"></el-table-column>
        </el-table>
        <!-- 分页器 -->
        <Paging :total="total" url="attend"></Paging>
    </div>

</template>

<script>
import { getData } from '../../api/api';
import Paging from '@/components/common/Paging.vue'
export default {
    name: 'workList',
    components: {
        Paging
    },
    data() {
        return {
            currentPage: 1,
            total: 1,
            pageSize: 5,
            tableData: [],
            formInline: {
                name: '',
            }
        }
    },
    created() {
        let curr = (this.currentPage - 1) * this.pageSize
        getData(this, '/attend', { offset: curr, limit: this.pageSize })
    },
    methods: {
        // 查询
        find() {
            console.log(this.formInline);
            getData(this, '/attend', this.formInline)
        },

        // 分页函数
        hanldSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            // getData(this, '/attend', {offset: this.currentPage - 1, limit: val})
        },
        hanldCurrentChange(val) {
            this.currentPage = val
            // getData(this, '/attend', {offset: (this.currentPage - 1) * this.pageSize, limit: this.pageSize})

        },
        // 重置
        reset() {
            getData(this, '/attend', { offset: this.currentPage - 1, limit: this.pageSize })
            this.formInline = {}
        },

    }

}
</script>

<style lang="scss">
</style>