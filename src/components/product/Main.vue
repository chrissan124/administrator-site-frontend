<template>
  <div>
    <CommonTableLayout
      :selected="selected"
      :header="{ title: 'Products', icon: 'appstore' }"
    >
      <a-table
        :columns="columns"
        :row-key="(record) => record.productId"
        :data-source="items"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        :row-selection="rowSelection()"
        style="background-color: white; padding: 1.5em"
      >
        <span slot="status" slot-scope="status">
          <a-tag :color="status === 'ACTIVE' ? 'green' : 'red'">
            {{ status }}
          </a-tag>
        </span>
        <CommonTableActions
          slot="actions"
          slot-scope="actions"
          :selected="actions"
          :current="selectedRowKeys[0]"
          :defaultButtons="{ details: false }"
        />
      </a-table>
    </CommonTableLayout>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Crud from '../../mixins/crud'
import { Product } from '../../types/product'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
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
  {
    title: '',
    align: 'center',
    dataIndex: 'productId',
    scopedSlots: {
      customRender: 'actions',
    },
  },
]
@Component({})
export default class ProductMain extends mixins(Crud) {
  path = '/products'
  columns = columns
  created() {
    this.rowKey = 'productId'
  }
  test() {
    console.log(this.path)
  }
}
</script>
