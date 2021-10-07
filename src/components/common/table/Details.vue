<template>
  <a-modal
    :title="null"
    :visible="visible"
    :centered="true"
    :closable="false"
    :destroyOnClose="true"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-descriptions layout="vertical">
      <a-space slot="title">
        <a-icon type="info-circle" /> <span> {{ title }}</span>
      </a-space>
      <a-descriptions-item
        v-for="(value, propertyName) in mappedItem"
        :label="prepareLabel(propertyName)"
        :key="propertyName"
        :span="getConfig(propertyName).span"
        class="scroll"
      >
        <template v-if="typeof value === 'object'">
          <a-row class="scroll" justify="space-between">
            <slot
              :name="propertyName"
              v-for="child in value"
              v-bind:prop="child"
            >
              {{ child }}
            </slot>
          </a-row>
        </template>
        <slot v-else v-bind:prop="value" :name="propertyName">
          {{ value }}
        </slot>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { GenericObject } from '~/src/types'
export interface DetailConfig {
  [x: string]: {
    span?: number
  }
}
@Component({})
export default class FormModal extends Vue {
  @Prop({ required: true })
  item!: GenericObject

  @Prop()
  keys!: Array<string>

  @Prop()
  config!: DetailConfig

  @Prop({ required: true })
  title!: string

  @Prop({ default: false })
  visible!: boolean

  @Prop({ required: true })
  handleCancel!: Function

  getConfig(key: string) {
    let conf = {
      span: 1,
    }
    if (this.config[key]) {
      conf = { ...conf, ...this.config[key] }
    }
    return conf
  }
  get mappedItem() {
    if (!this.keys) {
      return this.item
    }
    const item = { ...this.item }
    let mapped = {}
    this.keys.forEach((key) => {
      if (item[key]) {
        mapped = { ...mapped, [key]: item[key] }
      }
    })

    return mapped
  }

  prepareLabel(value: string) {
    let label = ''
    const regex = /(?=[A-Z])/
    value.split(regex).forEach((word) => {
      label = label + ` ${word.charAt(0).toUpperCase() + word.slice(1)}`
    })
    return label
  }
}
</script>
<style lang="scss" scoped>
.scroll {
  max-height: 10rem;
  overflow-y: auto;

  width: 100%;
}
</style>