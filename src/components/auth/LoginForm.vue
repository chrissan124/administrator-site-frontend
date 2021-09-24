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
import { Vue, Component } from 'vue-property-decorator'
//import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

@Component
export default class AuthLoginForm extends Vue {
  //Function(callback: Function(boolean, object))
  $refs!: {
    formRef: HTMLFormElement
  }

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
  //Todo: proper login
  async onSubmit() {
    this.$refs.formRef.validate((valid: boolean) => {
      if (valid) {
        console.log(this.formState.email, this.formState.password)
        this.$router.push('/')
      }
    })
  }
}
</script>

