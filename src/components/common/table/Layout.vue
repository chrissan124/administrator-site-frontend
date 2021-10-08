<template>
  <div>
    <CommonFormModal
      :handleCancel="handleCancel"
      :visible="visible"
      :title="`Add ${header.title}`"
      v-if="showCreate"
      :closable="showCreate.closeIcon"
    >
      <slot :cancel="handleCancel" name="form" />
    </CommonFormModal>
    <div class="header">
      <a-space size="large" align="center">
        <a-space align="center">
          <a-icon
            style="font-size: 1.5em"
            v-if="header.icon"
            :type="header.icon"
          ></a-icon>
          <h2 style="margin-bottom: 0.25em">
            {{ header.title || header }}
          </h2>
        </a-space>
        <a-button
          style="width: 6em; margin: 1.5em auto; display: block"
          class="button"
          type="primary"
          icon="plus"
          @click="showModal"
          v-if="showCreate"
          v-can:create="[privilege]"
        >
          ADD
        </a-button>
      </a-space>
      <slot name="header" />
      <CommonTableRecycle
        :privilege="privilege"
        v-if="recycleProps"
        v-can:delete="[privilege]"
        :column="recycleProps.column"
        :id="recycleProps.id"
        :url="recycleProps.url"
        :restore="recycleProps.restore"
        :remove="recycleProps.remove"
        @revive="handleRevive"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
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
  @Prop({ default: 'any' })
  privilege!: string

  @Prop({ required: true })
  header!: Header

  @Prop({
    default: () => ({
      closeIcon: false,
    }),
  })
  showCreate!: { closeIcon: boolean } | null

  @Prop({ default: null })
  selected!: null | Object

  @Prop({ default: null })
  recycleProps!: null | RecycleProps

  handleRevive() {
    this.$emit('revive')
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
.icon {
  @include icon-hover;
}
@media screen and(max-width: 900) {
  .button {
    width: 6em;
  }
}
</style>