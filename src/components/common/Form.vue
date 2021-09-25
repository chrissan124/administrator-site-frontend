<template>
  <a-form-model
    layout="horizontal"
    :model="formState"
    ref="formRef"
    :rules="rules"
    style="width: 20rem"
  >
  </a-form-model>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
//import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

@Component
export default class CommonForm extends Vue {
  $refs!: {
    formRef: HTMLFormElement
  }
  loading = false

  onSubmit(callback: () => Promise<any>) {
    this.$refs.formRef.validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          callback()
        } catch (error) {}
        this.loading = false
      }
    })
  }
}
</script>

