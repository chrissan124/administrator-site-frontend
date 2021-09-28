<template>
  <div>
    <div v-if="err" v-bind:err="err" v-bind:vm="vm" v-bind:info="info">
      <CommonError statusCode="500" />
    </div>
    <slot v-else> </slot>
  </div>
</template>

<script lang="ts">
import { VueComponent } from '@nuxtjs/auth-next'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CommonForm extends Vue {
  /* @Prop({ default: true })
  stopPropagation!: boolean*/
  err: boolean = false
  vm: null | VueComponent = null
  info: null | Object = null

  currentRoute = this.$router.currentRoute.path

  errorCaptured(err: Error, vm: VueComponent, info: Object) {
    this.err = true
    this.vm = vm
    this.info = info
    console.log('ERROR CAPTURED', this.err)
  }
}
</script>