<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'DataOverView',
    data() {
        return {

        }
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main1'))
        myChart.setOption({
            title: {
                text: 'Vue项目'
            },
            tooltip: {},
            xAxis: {
                data: ['一班', '二班', '三班', '四班', '五班', '六班',]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [45, 43, 46, 48, 52, 47]
            }]
        })
        var myChart1 = this.$echarts.init(document.getElementById('main2'))
        myChart1.setOption({
            title: {
                text: 'Vue项目'
            },
            tooltip: {
                trigger:"axis"
            },
            legend: {
                data: ["邮件营销", "联盟广告", "广告视频", "直接访问", "搜索引擎"]
            },
            xAxis: {
                type:"category",
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [100, 123, 200, 70, 180, 280]
                },
                 {
                    name: '广告视频',
                    type: 'line',
                    stack: '总量',
                    data: [220, 185, 130, 150, 140, 180]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [220, 185, 130, 150, 140, 180]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [220, 185, 130, 150, 140, 180]
                },
            ]
        })
    }
}
</script>
<style lang="scss">
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 50%;

        #main1,
        #main2 {
            height: 500px;
        }
    }
}
</style>