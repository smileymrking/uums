import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { message, Button, Layout, Menu, Icon, Card, Row, Col, Form, Input, Checkbox, Dropdown, Avatar, Modal, Calendar } from 'ant-design-vue'

Vue.use(message)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(Avatar)
Vue.use(Modal)
Vue.use(Calendar)

Vue.config.productionTip = false

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
