<template>
  <div class="container">
    <CommonError :statusCode="status" />
  </div>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  layout: (ctx) => {
    return ctx.$auth.user ? 'default' : 'blank'
  },
})
export default class CommonForm extends Vue {
  @Prop({ default: { statusCode: 500 } })
  error!: NuxtError
  status = this.error.statusCode
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>