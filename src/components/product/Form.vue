<template>
  <a-form-model
    :layout="'inline'"
    :model="formState"
    ref="formRef"
    :rules="rules"
    style="width: 100%"
    class="flex"
    :initialValues="initialState"
  >
    <a-form-model-item ref="name" prop="name" size="large">
      <a-input
        style="width: 95%"
        v-model="formState.name"
        placeholder="Product name"
      >
        <a-icon
          slot="prefix"
          type="appstore"
          style="color: rgba(0, 0, 0, 0.25)"
        />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" icon="plus" @click="handleSubmit">
        {{ initialState ? 'Update ' : 'Add ' }}Product</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, mixins, Prop, Emit } from 'nuxt-property-decorator'
import WindowListener from '../../mixins/windowListener'
import Form from '../../mixins/form'

@Component({})
export default class ProductForm extends mixins(Form, WindowListener) {
  formState = { name: '' }
  get formStyle() {
    if (this.windowWidth <= 1000) {
      return 'horizontal'
    }
    return 'inline'
  }
  rules = {
    name: [
      {
        required: true,
        message: 'Please input the name of the product',
        trigger: 'blur',
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