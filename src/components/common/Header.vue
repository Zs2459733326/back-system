<template>
  <div class="header">
    <el-header>
        <div class="title">学生信息管理系统</div>
        <div>固执的墨竹</div>
    </el-header>
  </div>
</template>

<script>
export default {
    name:'Header'
}
</script>

<style scoped lang="scss">
    .header {
        .el-header {
            background-color: #0eb0c9;
            color: #fff;
            line-height: 60px;
            display: flex;
            justify-content: space-between;
            .title {
                width: 200px;
                font-size: 24px;
            }
        }
    }
</style>