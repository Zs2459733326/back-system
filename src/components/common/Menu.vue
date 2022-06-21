<template>
  <el-aside width="200px">
    <!-- 在 el-menu 中添加 router 属性，就可实现跳转功能 -->
    <!-- :default-active="" 值为el-menu-item 标签的 index属性，表示，当前激活哪个菜单-->
    <el-menu
      router
      :default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#0eb0c9"
      text-color="#fff"
      active-text-color="#eef7f2"
    >
      <div v-for="(item, index) in menus" :key="index">
        <el-submenu :index="index + ''" v-if="!item.hidden" >
          <template slot="title">
            <i :class="item.iconClass"></i>
            <span>{{ item.name }}</span>
          </template>
           <el-menu-item-group v-for="(child, ind) in item.children" :key="ind">
            <!-- el-menu-item 中的index 属性 设置为 路由路径，即可完成 路由跳转功能  -->
            <el-menu-item :index="child.path">
              <i :class="child.iconClass"></i>
              {{ child.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Menu",
  // props: ['menus','activePath'],
  data() {
    return {
      menus: [],
      activePath: "",
    };
  },
  created() {
    // 只能拿到 在路由里 meta 配置项里的 自定义属性
    // console.log(this.$route);
    // 可以拿到 在路由里 自定义属性 比如里面的 hidden
    // console.log(this.$router.options);

    this.menus = [...this.$router.options.routes];
    // console.log(this.$router.currentRoute);
    this.activePath = this.$router.currentRoute.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100%;
  .el-menu {
    height: 100%;
    border: 0;
  }
  // .el-submenu .el-menu {
  //   // min-width: 0;
  // }
}
</style>