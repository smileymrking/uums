<template>
  <a-form :form="sendResetMailForm" @submit="sendMailSubmit">
    <a-form-item>
      <a-input size="large" placeholder="Email" v-decorator="emailDecorator">
        <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        size="large"
        html-type="submit"
        type="primary"
        :loading="mailLoading"
        :disabled="isMailSend"
        block>忘记密码
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'ResetMail',
  data () {
    return {
      mailLoading: false,
      isMailSend: false,
      sendResetMailForm: this.$form.createForm(this)
    }
  },
  computed: {
    emailDecorator () {
      return ['email', { rules: [{ required: true }] }]
    }
  },
  methods: {
    sendMailSubmit (e) {
      e.preventDefault()
      this.sendResetMailForm.validateFields(async (err, values) => {
        if (err) return
        this.mailLoading = true
        await this.$store.dispatch('sendResetEmail', values).then(() => {
          this.isMailSend = true
        }).catch(err => {
          this.$message.error(err.response.data.message || err.message)
        })
        this.mailLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
