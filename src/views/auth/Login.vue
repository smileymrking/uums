<template>
  <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
    <a-form-item>
      <a-input size="large" v-decorator="usernameDecorator" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input size="large" v-decorator="passwordDecorator" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-decorator="rememberDecorator">
        Remember me
      </a-checkbox>
      <a class="login-form-forgot" @click="goReset">
        Forgot password
      </a>
      <a-button size="large" type="primary" html-type="submit" class="login-form-button" :loading="loginLoading">
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginLoading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  computed: {
    usernameDecorator () {
      return [
        'username',
        { rules: [{ required: true, message: 'Please input your username!' }] }
      ]
    },
    passwordDecorator () {
      return [
        'password',
        { rules: [{ required: true, message: 'Please input your Password!' }] }
      ]
    },
    rememberDecorator () {
      return [
        'remember',
        { valuePropName: 'checked', initialValue: true }
      ]
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (err) return
        values.remember = values.remember ? 1 : 0
        this.loginLoading = true
        await this.$store.dispatch('login', values).then(() => {
          this.$router.push({ name: 'home' })
        }).catch((err) => {
          let errorMessage = err.response.data.message || err.message
          this.$message.error(errorMessage)
        })
        this.loginLoading = false
      })
    },
    goReset () {
      this.$router.push({ name: 'sendResetEmail' })
    }
  }
}
</script>

<style scoped>
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }

  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }

  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
</style>
