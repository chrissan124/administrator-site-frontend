<template>
  <a-modal
    :title="title"
    :visible="visible"
    :centered="true"
    :closable="false"
    :destroyOnClose="true"
    :footer="null"
    @cancel="handleCancel"
  >
    <slot> Modal body </slot>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component({})
export default class FormModal extends Vue {
  @Prop({ required: true })
  title!: string

  @Prop({ default: false })
  visible!: boolean

  @Prop({ required: true })
  handleCancel!: Function
}
</script>

<style lang="scss" scoped>
</style>