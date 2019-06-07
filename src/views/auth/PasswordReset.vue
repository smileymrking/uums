<template>
  <a-form :form="resetPasswordFrom" @submit="submitReset">
    <a-form-item>
      <a-input type="password" size="large" placeholder="Password" v-decorator="passwordDecorator">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input type="password" size="large" placeholder="Password Confirmation" v-decorator="passwordConfirmDecorator">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button size="large" html-type="submit" type="primary" :loading="resetLoading" block>
        Reset
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'PasswordReset',
  data () {
    return {
      email: this.$route.query.email,
      token: this.$route.params.token,
      resetLoading: false,
      resetPasswordFrom: this.$form.createForm(this)
    }
  },
  computed: {
    passwordDecorator () {
      return ['password', { rules: [{ required: true }] }]
    },
    passwordConfirmDecorator () {
      return ['password_confirmation', {
        rules: [{ required: true }, { validator: this.handlePasswordConfirmation }]
      }]
    }
  },
  created () {
    if (!this.email || !this.token) {
      this.$message.error('链接参数错误，返回登录！')
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    submitReset (e) {
      e.preventDefault()
      this.resetPasswordFrom.validateFields(async (err, values) => {
        if (err) return
        this.resetLoading = true
        await this.$store.dispatch('resetPassword', {
          ...values,
          token: this.$route.params.token || '',
          email: this.$route.query.email || ''
        }).then(() => {
          this.$message.success('密码重置成功！')
          this.$router.push({
            name: 'login'
          })
        }).catch(err => {
          this.$message.error(err.response ? err.response.data.message : err.message)
        })
        this.resetLoading = false
      })
    },
    handlePasswordConfirmation (rule, value, callback) {
      if (value !== this.resetPasswordFrom.getFieldValue('password')) {
        let err = '两次输入密码不一致'
        callback(err)
      } else {
        callback()
      }
    }
  }
}
</script>

<style scoped>

</style>
