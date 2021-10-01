<template>
  <div>
    <a-tooltip placement="left">
      <template slot="title"> Show Deleted </template>
      <a-icon
        type="inbox"
        class="icon"
        @click="handleOpen"
        style="font-size: 2em; margin-right: 0"
      />
    </a-tooltip>
    <a-modal
      :visible="visible"
      :centered="true"
      :closable="false"
      :destroyOnClose="true"
      :footer="null"
      @cancel="handleCancel"
      class="modal"
    >
      <template slot="title">
        <a-space align="center">
          <a-icon style="font-size: 1.5em" type="inbox" />
          <h3 style="margin: 0">Soft Deletions</h3>
        </a-space>
      </template>
      <a-table
        :columns="columns"
        :row-key="(record) => record[id]"
        :data-source="items"
        :loading="loading"
        :scroll="scroll"
        layout="auto"
        :pagination="pagination"
        @change="handleTableChange"
        :row-selection="rowSelection()"
        style="background-color: white; width: 100%"
      >
        <CommonTableActions
          slot="actions"
          :onlyIcons="true"
          slot-scope="actions"
          :mini="true"
          :selected="actions"
          :current="selectedRowKeys[0]"
          :defaultButtons="{ details: false, delete: false, update: false }"
          :extraButtons="buttons"
        />
      </a-table>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import Modal from '../../../mixins/modal'
import Crud from '../../../mixins/crud'
import { ButtonProps } from './Actions.vue'
import WindowListener from '../../../mixins/windowListener'

@Component({})
export default class TableRecycle extends mixins(Crud, Modal, WindowListener) {
  @Prop({ required: true })
  column!: Array<any>
  @Prop({ required: true })
  id!: string
  @Prop({ required: true })
  url!: string
  @Prop({ default: true })
  restore!: boolean
  @Prop({ default: false })
  remove!: boolean
  path = this.url
  getParams = { deleted: 'only' }
  columns = this.column.concat(
    {
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      sorter: true,
    },
    {
      title: '',
      align: 'center',
      fixed: 'right',
      dataIndex: this.id,
      width: '4rem',
      scopedSlots: { customRender: 'actions' },
    }
  )
  sort = 'deletedAt:d'

  created() {
    this.rowKey = this.id
    this.pagination.pageSize = 6
  }
  get scroll() {
    if (this.column.length > 1 || this.windowWidth <= 700) {
      return { x: 'max-content' }
    }
  }
  get buttons(): Array<ButtonProps> {
    const actions: Array<ButtonProps> = []
    if (this.restore)
      actions.push({ text: 'Restore', icon: 'sync', event: 'restore' })

    this.remove &&
      actions.push({ text: 'Hard Delete', icon: 'delete', event: 'delete' })
    return actions
  }
  handleOpen() {
    this.get()
    this.showModal()
  }
}
</script>
<style lang="scss" scoped>
.icon {
  @include icon-hover;
}
.modal {
  max-height: 80vh;
  min-width: 60rem;
  max-width: 90vw;
  width: max-content;
}
</style>