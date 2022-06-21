<template>
  <div class="main">
    <LoginTest/>
  </div>
</template>

<script>
import LoginTest from '@/components/common/LoginTest.vue'
export default {
  name: "Login",
  components: {
    LoginTest,
  },
};
</script>

<style scoped>
/* 此操作可以在 不操作 DOM 的情况下，实现单个路由组件的全屏背景设置 */
.main {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-size:contain;
  background-attachment: fixed;
  background-position: bottom center;
  background: url("@/assets/img/2052258.jpg");
}
</style>