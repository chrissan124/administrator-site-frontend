<template>
  <div style="margin: 1em">
    <a-space style="margin-bottom: 2em" align="center" size="large">
      <h2 style="margin: 0">Account</h2>
      <a-button @click="toggleUpdate" type="circle" icon="edit"></a-button>
    </a-space>
    <p style="margin-bottom: 2em">
      This information is public to other users with consult privileges.
    </p>
    <div class="container">
      <a-form-model
        layout="vertical"
        :model="formState"
        ref="formRef"
        :rules="rules"
        style="width: 100%"
        :initialValues="initialState"
        hideRequiredMark
      >
        <a-input-group>
          <a-row justify="space-between">
            <a-col :span="11">
              <a-form-model-item
                ref="email"
                prop="email"
                size="large"
                label="Email"
              >
                <a-input
                  :read-only="!update"
                  class="input"
                  v-model="formState.email"
                  placeholder="user@example.com"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="2">
              <a-form-model-item ref="phone" prop="phone" label="Phone">
                <a-input
                  :read-only="!update"
                  v-model="formState.phone"
                  placeholder="+xx xxx xxx xxxx"
                >
                  <a-icon
                    slot="prefix"
                    type="phone"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-input-group>
        <a-input-group>
          <a-row justify="space-between">
            <a-col :span="11">
              <a-form-model-item
                ref="firstName"
                prop="firstName"
                label="First Name"
              >
                <a-input
                  :read-only="!update"
                  v-model="formState.firstName"
                  placeholder="John"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="2">
              <a-form-model-item
                ref="lastName"
                prop="lastName"
                label="Last Name"
              >
                <a-input
                  :read-only="!update"
                  v-model="formState.lastName"
                  placeholder="Johnson"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-input-group>
        <a-form-model-item label="Role" prop="roleFk" v-can:update="['role']">
          <a-select
            v-model="formState.roleFk"
            :read-only="!update"
            :loading="loading"
            :options="roles"
            placeholder="Select role"
          >
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="update">
          <a-space size="middle">
            <a-button type="primary" @click="handleSubmit">Save</a-button>
            <a-button @click="cancel">Cancel</a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Role } from '~/src/types/user'
import Form from '../../mixins/form'

@Component({})
export default class ProductForm extends mixins(Form) {
  loading = false
  update = false
  formState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roleFk: '',
  }
  roles: Array<{ value: string; label: string }> = []
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
  toggleUpdate() {
    if (this.update === true) this.cancel()
    else this.update = true
  }
  cancel() {
    this.update = false
    this.reset()
  }

  async handleSubmit() {
    this.$refs.formRef.validate((valid: boolean) => {
      if (valid) {
        this.callback(this.formState, this)
      }
    })
  }
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $white;
  padding: 1em;
  border-radius: 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.button {
  width: 8rem;
}
/*
.input,
.ant-input {
  &:read-only {
    background-color: transparent;
    border: none;
  }
}
*/
</style>