<template>
  <a-layout id="components-layout-demo-custom-trigger" :style="{ position: 'fixed', overflow: 'hidden', height: '100%', width: '100%' }">
    <Aside></Aside>
    <a-layout>
      <Header></Header>
      <a-layout-content :style="{ margin: '88px 16px 24px', padding: '24px', background: '#fff' }">
        <router-view></router-view>
      </a-layout-content>
      <Footer></Footer>
    </a-layout>
  </a-layout>
</template>

<script>

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'

export default {
  name: 'MainContent',
  components: { Aside, Header, Footer }
}
</script>

<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
</style>
