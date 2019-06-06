<template>
  <a-layout-header :style="{ position: 'fixed', background: '#fff',  width: '100%', padding: '0 225px 0 0' }">
    <a-icon class="trigger" :type="collapse" @click="setMenuCollapse"/>
    <div class="user-wrapper">
      <a-dropdown>
        <span class="action">
          <a-avatar class="avatar" size="small" src=""/>
          <span>{{ getAuthUser ? getAuthUser.name : '' }}</span>
        </span>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <router-link :to="{ name: 'layout' }">
              <a-icon type="user"/>
              <span class="item">个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'layout' }">
              <a-icon type="setting"/>
              <span class="item">账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider></a-menu-divider>
          <a-menu-item key="2">
            <a href="javascript:;" @click="logout">
              <a-icon type="logout"/>
              <span class="item">退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <!--<a-dropdown placement="bottomCenter">
        <span class="action" style="font-size: 16px;"><a-icon type="global"></a-icon></span>
        <a-menu slot="overlay" @click="handleSetLanguage">
          <a-menu-item key="zh-CN" :disabled="getLanguage === 'zh-CN'">中文</a-menu-item>
          <a-menu-item key="en" :disabled="getLanguage === 'en'">English</a-menu-item>
        </a-menu>
      </a-dropdown>-->
    </div>
  </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    ...mapGetters(['getMenuCollapse', 'getAuthUser']),
    collapse () {
      return this.getMenuCollapse ? 'menu-unfold' : 'menu-fold'
    }
  },
  watch: {
    getAuthUser (val) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    setMenuCollapse () {
      this.$store.dispatch('setMenuCollapse', !this.getMenuCollapse)
    },
    logout () {
      this.$confirm({
        title: '确定退出登录吗？',
        confirmLoading: false,
        onOk: async () => {
          this.confirmLoading = true
          await this.$store.dispatch('logout').then(() => {
            this.confirmLoading = false
          }).catch(err => {
            this.$message.error(err.response ? err.response.data.message : err.message)
          })
          this.$router.push({ name: 'login' })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .user-wrapper {
    float: right;
    height: 100%;
    .action {
      cursor: pointer;
      padding: 0 12px;
      display: inline-block;
      transition: all 0.3s;
      height: 100%;
      color: rgba(0, 0, 0, 0.65);
    }
    .action:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .action .avatar {
      margin: 20px 8px 20px 0;
      background: #1890ff;
      vertical-align: middle;
    }
  }
</style>
