<template>
  <a-form-model
    layout="horizontal"
    :model="formState"
    ref="formRef"
    :rules="rules"
    style="width: 20rem"
  >
    <a-form-model-item ref="email" prop="email">
      <a-input v-model="formState.email" placeholder="Email">
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="password" prop="password">
      <a-input
        v-model="formState.password"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <div style="display: flex; align-items: center">
      <a style="margin-right: auto">Forgot password?</a>
      <a-button
        type="primary"
        style="width: 8rem"
        html-type="submit"
        @click="onSubmit"
        :loading="loading"
      >
        Log in
      </a-button>
    </div>
  </a-form-model>
</template>

<script lang="ts">
interface FormState {
  email: string
  password: string
}
import { Vue, Component } from 'nuxt-property-decorator'
//import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

@Component
export default class AuthLoginForm extends Vue {
  //Function(callback: Function(boolean, object))
  $refs!: {
    formRef: HTMLFormElement
  }
  loading = false
  error = ''
  formState: FormState = {
    email: '',
    password: '',
  }
  rules = {
    email: [
      {
        required: true,
        message: 'Please input email',
        trigger: 'blur',
      },
      {
        type: 'email',
        trigger: 'blur',
        message: 'Invalid email',
      },
    ],
    password: [
      {
        required: true,
        message: 'Please input password',
        trigger: 'blur',
      },
    ],
  }
  async onSubmit() {
    this.$refs.formRef.validate((valid: boolean) => {
      if (valid) {
        this.loading = true

        this.$auth
          .loginWith('local', {
            data: {
              email: this.formState.email,
              password: this.formState.password,
            },
          })
          .then((response) => {
            /*if (response && response.status === 200) {
              const user = response.data
              this.$auth.setUser({
                id: user.userId,
                roleId: user.Role.roleId,
                permissions: user.Role.Permissions,
              })
            }*/
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.error = 'Invalid credentials'
            } else {
              this.error = 'An unknown server error has occurred'
            }
            console.log(error)
            this.$message.error(this.error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    })
  }
}
</script>

