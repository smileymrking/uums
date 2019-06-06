<template>
  <a-layout-sider :trigger="null" collapsible v-model="getMenuCollapse">
    <div class="logo">
      <router-link :to="{ name: 'home' }">
        <h1>{{ getMenuCollapse ? 'FS' : 'FS.COM' }}</h1>
      </router-link>
    </div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
      <a-menu-item key="1">
        <a-icon type="user"/>
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera"/>
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload"/>
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Aside',
  computed: {
    ...mapGetters(['getMenuCollapse'])
  }
}
</script>

<style scoped>
  .logo {
    background: #001529 !important;
  }

  .logo h1 {
    display: block;
    text-align: center;
    color: #e8e8e8;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 500;
    vertical-align: middle;
  }
</style>
