<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.productId"
    :data-source="items"
    :loading="loading"
  >
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
  },
  { title: 'Status', dataIndex: 'Status.name' },
  { title: 'Created on', dataIndex: 'createdAt_short' },
  { title: 'Updated on', dataIndex: 'updatedAt' },
]
@Component({})
export default class ProductMain extends mixins(Crud) {
  //@Prop({ default: [] }) readonly products: Array<Object>
  path = '/products'
  columns = columns
}
</script>
