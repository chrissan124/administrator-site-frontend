<template>
  <div>
    <div class="header">
      <a-space size="large" align="center">
        <a-space align="center">
          <a-icon
            style="font-size: 1.5em"
            v-if="header.icon"
            :type="header.icon"
          ></a-icon>
          <h2 style="margin-bottom: 0.25em">{{ header.title || header }}</h2>
        </a-space>
        <a-button
          style="width: 12em; margin: 1.5em auto; display: block"
          type="primary"
          icon="plus"
        >
          ADD
        </a-button>
      </a-space>
      <slot name="header" />
      <a-tooltip placement="left">
        <template slot="title">
          <span>{{ helpInfo }}</span>
        </template>
        <a-icon
          type="question-circle"
          style="font-size: 1.75em; margin-right: 0"
        />
      </a-tooltip>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

interface Header {
  title: string
  icon: string
}

@Component({})
export default class TableLayout extends Vue {
  @Prop({ required: true })
  header!: string | Header
  @Prop({
    default:
      'Select a row to edit or delete it, or click Add to create more items!',
  })
  helpInfo!: string
  @Prop({ default: null })
  selected!: null | Object

  @Emit('action')
  action(event: string) {
    return event
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1.5em 0;
  align-items: center;
}
</style>