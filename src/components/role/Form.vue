<template>
  <a-form-model
    layout="vertical"
    :model="formState"
    ref="formRef"
    :rules="rules"
    style="width: 100%"
    :initialValues="initialState"
  >
    <a-form-model-item ref="name" prop="name" label="Name">
      <a-input
        style="width: 100%"
        v-model="formState.name"
        placeholder="Enter name"
      >
        <a-icon slot="prefix" type="team" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="description" prop="description" label="Description">
      <a-textarea
        placeholder="Describe what this role is about..."
        v-model="formState.description"
      ></a-textarea>
    </a-form-model-item>
    <h4>Permissions</h4>
    <a-input-group>
      <a-row align="middle">
        <a-col :span="6">
          <a-form-model-item ref="filter" prop="filter">
            <span slot="label"> <a-icon type="filter" /> Module </span>
            <a-select
              :allowClear="true"
              :showSearch="true"
              style="width: 100%"
              @change="handleFilter"
            >
              <a-select-option :key="name" v-for="name in permNames">{{
                name
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :offset="1" :span="4">
          <a-form-model-item>
            <span slot="label"> <a-icon type="filter" /> Type </span>
            <a-select
              :allowClear="true"
              style="width: 100%"
              @change="handleFilter"
            >
              <a-select-option :key="name" v-for="name in actions">{{
                name
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="2">
          <a-form-model-item
            :label="`Privileges ${count}`"
            ref="perms"
            prop="perms"
          >
            <a-select
              mode="multiple"
              style="width: 100%"
              :allowClear="true"
              v-model="formState.perms"
              class="scroll-select"
              :dropdownMenuStyle="{
                'max-height': '10rem',
                'overflow-y': 'auto',
              }"
              :options="permissions"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-input-group>
    <a-form-model-item>
      <a-button type="primary" icon="plus" @click="handleSubmit">
        {{ initialState ? 'Update ' : 'Create ' }}Role</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Permission } from '~/src/types/user'
import Form from '../../mixins/form'

@Component({})
export default class RoleForm extends mixins(Form) {
  formState = { name: '', description: '', filter: '', perms: [] }
  permissions: Array<{ value: string; label: string }> = []
  basePermissions: Array<{ value: string; label: string }> = []
  permNames: Set<String> = new Set()
  actions = ['C', 'R', 'U', 'D']
  loading = false

  get count() {
    const count = this.formState.perms.length
    return count ? ` (${count})` : ''
  }

  mapName(name: string) {
    switch (name.toUpperCase()) {
      case 'C':
        return 'Create'
      case 'R':
        return 'Read'
      case 'U':
        return 'Update'
      case 'D':
        return 'Delete'
      default:
        return 'Read'
    }
  }

  mapPermissions(perms: Array<Permission>) {
    this.basePermissions = perms.map((perm) => {
      const label = this.mapName(perm.type) + ' ' + perm.name
      return {
        label,
        value: perm.permissionId,
        title: label,
      }
    })
  }

  handleFilter(value: string) {
    if (!value) {
      this.permissions = this.basePermissions
    } else
      this.permissions = this.basePermissions.filter((perm) => {
        const [act, ent] = perm.label.split(' ')
        if (['C', 'R', 'U', 'D'].includes(value)) {
          return this.mapName(value) === act
        }
        return value === ent
      })
  }

  created() {
    const perms = this.$store.getters['permissionStore/permission']
    this.mapPermissions(perms)
    this.permissions = this.basePermissions
    this.permNames = this.$store.getters['permissionStore/name']
  }

  rules = {
    name: [
      {
        required: true,
        message: 'Please choose a role name',
        trigger: 'blur',
      },
    ],
    perms: [
      {
        required: true,
        message: 'Please select at least one privilege',
        trigger: 'blur',
      },
    ],
  }
}
</script>

<style lang="scss" scoped>
.perm-drop {
  max-height: 10rem;
  overflow-y: auto;
}
.scroll-select {
  overflow-y: auto;
  max-height: 8rem;
  .ant-select-selection--multiple,
  * > {
    overflow-y: auto;
    max-height: 8rem;
  }
}
</style>