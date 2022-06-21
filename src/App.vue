<template>
  <router-view></router-view>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
  // 引入 reset.css 进行样式重置
  @import url('@/assets/css/reset.css');
</style>
