<template>
  <a-form-model
    layout="inline"
    :model="formState"
    ref="formRef"
    :rules="rules"
    style="width: 100%"
    :initialValues="initialState"
    hideRequiredMark
  >
    <p>Role</p>
    <a-form-model-item prop="roleFk">
      <a-select
        style="width: 18rem"
        v-model="formState.roleFk"
        :loading="loading"
        :options="roles"
        placeholder="Select role"
      >
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" icon="plus" @click="handleSubmit"
        >{{ initialState ? 'Update' : 'Add' }} User</a-button
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
    roleFk: '',
  }
  roles: Array<{ value: string; label: string }> = []
}
</script>