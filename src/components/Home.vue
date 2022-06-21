<template>
  <div class="home">
    <!-- 头部 -->
    <Header></Header>
    <!-- 内容 -->
    <el-container class="content">
      <div>
        <!-- 左侧边栏 -->
        <Menu></Menu>
      </div>
      <!-- 右内容区 -->
      <el-main>
        <!-- 面包屑的思想，拿到当前路由下的matched属性，它是一个数组，里面按父组件到子组件的层级依次包含了各自的数据对象 -->
        <!-- 遍历 matched ———— 也就是从左到右遍历 从父符组件到子组件 的数据 -->
        <!-- 继而实现 从左到右 依次为 父组件名、子组件名的 面包屑效果 -->
        <!-- 注意 this.$route（当前路由下）和this.$router（全局路由器）的使用 -->
        <el-card>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 点击 “首页” 会有跳转效果 -->
          <el-breadcrumb-item :to="{path: '/home'}" >首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-card>
        <div class="cont">
          <router-view></router-view>
        </div>
        <!-- 内容底部 -->
        <Footer>
        </Footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "./common/Header.vue";
import Footer from "./common/Footer.vue";
import Menu from "./common/Menu.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Menu,
  },
  created(){
    // console.log(this.$route);
  }
};
</script>

<style scoped lang="scss">
  .home {
    .content {
      position: absolute;
      width: 100%;
      top: 60px;
      bottom: 0;

    .cont{
      margin-top: 30px;
    }
    }

  }
</style>
