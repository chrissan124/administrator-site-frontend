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
    <a-form-model-item ref="phone" prop="phone" label="Phone">
      <a-input v-model="formState.phone" placeholder="+xx xxx xxx xxxx">
        <a-icon slot="prefix" type="phone" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
      <span style="font-size: 12px"
        >e.g:+xx-xxx-xxx-xxxx / xxx xxx xxxx / +xxxxxxxxxxx</span
      >
    </a-form-model-item>
    <a-input-group>
      <a-row justify="space-between">
        <a-col :span="11">
          <a-form-model-item
            ref="firstName"
            prop="firstName"
            label="First Name"
          >
            <a-input v-model="formState.firstName" placeholder="John">
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="2">
          <a-form-model-item ref="lastName" prop="lastName" label="Last Name">
            <a-input v-model="formState.lastName" placeholder="Johnson">
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-input-group>
    <a-form-model-item label="Role" prop="roleFk">
      <a-select
        v-model="formState.roleFk"
        :loading="loading"
        :options="roles"
        placeholder="Select role"
      >
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" icon="plus" @click="handleSubmit"
        >Add User</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Role } from '~/src/types/user'
import Form from '../../mixins/form'

@Component({})
export default class ProductForm extends mixins(Form) {
  async fetch() {
    this.loading = true
    const data: Array<Role> = await this.$axios.$get('/roles')
    this.roles = data.map((role) => {
      return {
        value: role.roleId,
        label: role.name + ': ' + role.description,
        title: role.name,
      }
    })
    this.loading = false
  }
  loading = false
  formState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roleFk: '',
  }
  roles: Array<{ value: string; label: string }> = []
  rules = {
    email: [
      {
        required: true,
        trigger: 'blur',
      },
      {
        message: 'please input a valid email',
        trigger: 'blur',
        type: 'email',
      },
    ],
    phone: [
      {
        required: true,
        trigger: 'blur',
      },
    ],
    firstName: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input a name',
      },
    ],
    lastName: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input a last name',
      },
    ],
    roleFk: [
      {
        required: true,
        trigger: 'blur',
        message: 'please select a role',
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