<template>
  <a-form-model
    layout="vertical"
    :model="formState"
    ref="formRef"
    :rules="rules"
    style="width: 100%"
    :initialValues="initialState"
    hideRequiredMark
  >
    <a-form-model-item ref="email" prop="email" size="large" label="Email">
      <a-input v-model="formState.email" placeholder="user@example.com">
        <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="email" prop="email" size="large" label="Email">
      <a-input v-model="formState.email" placeholder="user@example.com">
        <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-input-group>
      <a-form-model-item ref="firstName" prop="firstName" label="First Name">
        <a-input v-model="formState.firstName" placeholder="John"> </a-input>
      </a-form-model-item>
      <a-form-model-item ref="lastName" prop="lastName" label="Last Name">
        <a-input v-model="formState.lastName" placeholder="Johnson"> </a-input>
      </a-form-model-item>
    </a-input-group>
    <a-form-model-item>
      <a-button type="primary" icon="plus" @click="handleSubmit"
        >Add User</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import WindowListener from '../../mixins/windowListener'
import Form from '../../mixins/form'

@Component({})
export default class ProductForm extends mixins(Form, WindowListener) {
  formState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roleFk: '',
  }
  get formStyle() {
    if (this.windowWidth <= 1000) {
      return 'horizontal'
    }
    return 'inline'
  }
  rules = {
    email: [
      {
        required: true,
        message: 'Please input user email',
        trigger: 'blur',
      },
      {
        message: 'Please input a valid email',
        trigger: 'blur',
        type: 'email',
      },
    ],
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
</style>