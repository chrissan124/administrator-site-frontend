<template>
  <div>
    <CommonFormModal
      :handleCancel="handleCancel"
      :visible="visible"
      :title="`Add ${header.title}`"
    >
      <slot name="form" />
    </CommonFormModal>
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
          style="width: 10em; margin: 1.5em auto; display: block"
          type="primary"
          icon="plus"
          @click="showModal"
        >
          ADD
        </a-button>
      </a-space>
      <slot name="header" />
      <CommonTableRecycle
        v-if="recycleProps"
        :column="recycleProps.column"
        :id="recycleProps.id"
        :url="recycleProps.url"
        :restore="recycleProps.restore"
        :remove="recycleProps.remove"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, mixins } from 'nuxt-property-decorator'
import Modal from '../../../mixins/modal'

interface Header {
  title: string
  icon: string
}

interface Nav {
  link: string
  icon: string
  text: string
}

interface RecycleProps {
  column: Array<Object>
  id: string
  url: string
  restore?: boolean
  remove?: boolean
}
@Component({})
export default class TableLayout extends mixins(Modal) {
  @Prop({ required: true })
  header!: Header

  @Prop({ default: null })
  selected!: null | Object

  @Prop({ default: null })
  recycleProps!: null | RecycleProps
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
.icon {
  @include icon-hover;
}
</style>