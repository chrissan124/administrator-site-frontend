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
    <h4>Contact</h4>

    <a-input-group>
      <a-row>
        <a-col :span="11">
          <a-form-model-item label="Name" ref="name" prop="name">
            <a-input v-model="formState.name" placeholder="Enter name" />
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="2">
          <a-form-model-item
            ref="legalIdentifier"
            prop="legalIdentifier"
            label="Identification"
          >
            <a-input
              v-model="formState.legalIdentifier"
              placeholder="J-xxxxxxxx"
            >
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-input-group>
    <a-input-group>
      <a-row>
        <a-col :span="11">
          <a-form-model-item ref="email" prop="email" label="Email">
            <a-input v-model="formState.email" placeholder="client@example.com">
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
            <a-input v-model="formState.phone" placeholder="+xx xxx xxx xxxx">
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
    <h4>Address</h4>
    <a-form-model-item ref="primaryLine" prop="primaryLine" label="First Line">
      <a-input v-model="formState.primaryLine" placeholder="Enter first line">
        <a-icon
          slot="prefix"
          type="environment"
          style="color: rgba(0, 0, 0, 0.25)"
        />
      </a-input>
    </a-form-model-item>
    <a-input-group>
      <a-row>
        <a-col :span="16">
          <a-form-model-item ref="Address.secondaryLine" label="Second Line">
            <a-input
              v-model="formState.secondaryline"
              placeholder="Enter second line"
            >
              <a-icon
                slot="prefix"
                type="environment"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="6" :offset="2">
          <a-form-model-item ref="zipCode" prop="zipCode" label="Zip">
            <a-input v-model="formState.zipCode" placeholder="1200">
              <a-icon
                slot="prefix"
                type="environment"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-input-group>
    <a-input-group>
      <a-row>
        <a-col :span="7">
          <a-form-model-item ref="city" prop="city" label="City">
            <a-input v-model="formState.city" placeholder="Enter city">
              <a-icon
                slot="prefix"
                type="environment"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item ref="state" label="State" prop="state">
            <a-input v-model="formState.state" placeholder="Enter state">
              <a-icon
                slot="prefix"
                type="environment"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" :offset="1">
          <a-form-model-item ref="country" label="Country" prop="country">
            <a-input v-model="formState.country" placeholder="Enter country">
              <a-icon
                slot="prefix"
                type="environment"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-input-group>
    <a-form-model-item label="Status" v-if="initialState" prop="statusFk">
      <a-select v-model="formState.statusFk" placeholder="Select role">
        <a-select-option :key="status.value" v-for="status in statuses">
          <a-tag
            style="width: 5rem; text-align: center"
            :color="status.label | color"
            >{{ status.label }}</a-tag
          >
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" icon="plus" @click="handleSubmit"
        >{{ initialState ? 'Update' : 'Add' }} Client</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { GenericObject } from '~/src/types'

import Form from '../../mixins/form'

@Component({})
export default class ProductForm extends mixins(Form) {
  async fetch() {
    const status: GenericObject = this.$store.getters['statusStore/status']
    for (let [name, statusID] of Object.entries(status)) {
      if (['IDLE', 'ACTIVE', 'SUSPENDED'].includes(name)) {
        const stat: { label: string; value: string } = {
          label: name,
          value: statusID,
        }

        this.statuses.push(stat)
      }
    }
  }
  loading = false
  formState = {
    name: '',
    legalIdentifier: '',
    email: '',
    phone: '',
    statusFk: '',
    addressId: undefined,
    primaryLine: '',
    secondaryline: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  }
  statuses: Array<{ value: string; label: string }> = []
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
    name: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input a name',
      },
    ],
    legalIdentifier: [
      {
        required: true,
        trigger: 'blur',
        message: `please input this client's identification`,
      },
    ],
    primaryLine: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input this address',
      },
    ],
    city: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input a city',
      },
    ],
    state: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input a state',
      },
    ],
    country: [
      {
        required: true,
        trigger: 'blur',
        message: 'please input a country',
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