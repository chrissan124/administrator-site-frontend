<template>
  <a-table
    :row-key="(record) => record[id]"
    :data-source="items"
    :loading="loading"
    :pagination="pagination"
    @change="handleTableChange"
    style="background-color: white; padding: 1em"
  >
    <a-table-column
      v-for="column in columns"
      :title="column.title"
      :data-index="column.dataIndex"
      :key="column.title"
      :scopedSlots="column.scopedSlots"
      :sorter="column.sorter"
    >
      <slot
        v-if="column.scopedSlots"
        :name="column.scopedSlots.customRender.toString()"
        :slot-scope="column.scopedSlots.customRender.toString()"
      ></slot>
    </a-table-column>
  </a-table>
</template>
<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import Crud from '../../mixins/crud'

interface Column {
  dataIndex: string
  title: string
  scopedSlots: {
    customRender: string
  }
  rawSlot: string
  sorter: boolean
}

@Component({})
export default class CommonTable extends mixins(Crud) {
  @Prop({ required: true })
  url!: string
  @Prop({ required: true })
  id!: string
  @Prop({ required: true })
  columns!: Array<Column>
  /* @Prop({ required: true })
  header!: string */
  @Prop({ default: 10 })
  pageSize!: number
  filteredColumns: Array<Column> = []
  created() {
    this.pagination.pageSize = this.pageSize
    this.path = this.url
    this.filteredColumns = this.columns.filter((column) => {
      return typeof column.scopedSlots !== 'undefined' && column.rawSlot
    })
    console.log(this.filteredColumns)
  }
}
</script>
