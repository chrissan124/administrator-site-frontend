<template>
  <div style="font-size: 0.9em">
    <p>Your password must contain:</p>
    <a-row>
      <a-col :span="12"
        ><a-icon type="check-circle" theme="twoTone" />
        <span> 1 uppercase</span>
      </a-col>
      <a-col :span="12"
        ><a-icon type="check-circle" theme="twoTone" />
        <span> 1 lowercase</span>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 1.5em">
      <a-col :span="12"
        ><a-icon type="check-circle" theme="twoTone" />
        <span> 8+ characters</span>
      </a-col>
      <a-col :span="12"
        ><a-icon type="check-circle" theme="twoTone" />
        <span> 1 special character</span>
      </a-col>
    </a-row>
    <a-form-model
      layout="horizontal"
      :model="formState"
      ref="formRef"
      :rules="rules"
      style="width: 20rem"
    >
      <a-form-model-item has-feedback ref="password" prop="password">
        <a-input
          v-model="formState.password"
          placeholder="Enter password"
          type="password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item has-feedback ref="confirm" prop="confirm">
        <a-input
          v-model="formState.confirm"
          type="password"
          placeholder="Confirm password"
        >
          <a-icon
            slot="prefix"
            type="check-circle"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-button
        type="primary"
        style="width: 100%"
        html-type="submit"
        @click="handleSubmit"
        :loading="loading"
      >
        Sign Up
      </a-button>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import Form from '../../mixins/form'

@Component
export default class AuthLoginForm extends mixins(Form) {
  //Function(callback: Function(boolean, object))
  $refs!: {
    formRef: HTMLFormElement
  }
  @Prop({ default: null })
  token!: null | string

  loading = false
  error = ''
  formState = {
    confirm: '',
    password: '',
  }

  validatePass(rule: Object, value: string, callback: Function) {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      const strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
      )

      if (!value.match(strongRegex)) {
        callback(new Error('Weak password'))
      } else if (this.formState.confirm !== '') {
        this.$refs.formRef.validateField('confirm')
      }
      callback()
    }
  }
  validatePass2(rule: Object, value: string, callback: Function) {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== this.formState.password) {
      callback(new Error(`Passwords don't match`))
    } else {
      callback()
    }
  }
  rules = {
    password: [
      {
        validator: this.validatePass,
        trigger: 'change',
      },
    ],
    confirm: [
      {
        validator: this.validatePass2,
        trigger: 'change',
      },
    ],
  }
}
</script>