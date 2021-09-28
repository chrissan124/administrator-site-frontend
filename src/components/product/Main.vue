<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.productId"
    :data-source="items"
    :loading="loading"
    :pagination="pagination"
    @change="handleTableChange"
    style="background-color: white; padding: 1em"
  >
    <span slot="status" slot-scope="status">
      <a-tag :color="status === 'ACTIVE' ? 'green' : 'red'">
        {{ status }}
      </a-tag>
    </span>
  </a-table>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Crud from '../../mixins/crud'
import { Product } from '../../types/product'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '30%',
    sorter: true,
  },
  { title: 'Created On', dataIndex: 'createdAt_short', sorter: true },
  { title: 'Updated On', dataIndex: 'updatedAt', sorter: true },
  {
    title: 'Status',
    dataIndex: 'Status.name',
    scopedSlots: {
      customRender: 'status',
    },
  },
]
@Component({})
export default class ProductMain extends mixins(Crud) {
  path = '/products'
  columns = columns
  created() {
    this.pagination.pageSize = 5
  }
}
</script>
