<template>
  <a-form layout="horizontal" :model="formState" :rules="rules">
    <a-form-item>
      <a-input v-model:value="formState.email" placeholder="Email"> </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        @click="onSubmit"
        :disabled="formState.email === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
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
  formRef = { value: undefined }
  formState: FormState = {
    email: '',
    password: '',
  }
  rules = {
    name: [
      {
        required: true,
        message: 'Please input email',
        trigger: 'blur',
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
    /*
    this.formRef.value
      .validate()
      .then(() => {
        console.log('values', this.formState)
      })
      .catch((error: string) => {
        console.log('error', error)
      })
      */
  }
}
</script>

