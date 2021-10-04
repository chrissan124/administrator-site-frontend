<template>
  <div>
    <CommonTableLayout
      :selected="selected"
      :header="{ title: 'Products', icon: 'appstore' }"
      :recycleProps="{
        url: this.path,
        id: 'productId',
        column: [this.columns[0]],
        remove: true,
      }"
      @revive="get"
    >
      <ProductForm slot="form" :callback="create" />
      <a-table
        :columns="columns"
        :row-key="(record) => record.productId"
        :data-source="items"
        :loading="loading"
        layout="auto"
        :scroll="{ x: 'max-content' }"
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
          slot-scope="actions, record"
          :selected="actions"
          :current="selectedRowKeys[0]"
          @update="showModal"
          @suspend="suspend(true)"
          @activate="suspend(false)"
          @delete="handleDelete"
          :defaultButtons="{ details: false }"
          :extraButtons="extraActions(record)"
        />
      </a-table>
    </CommonTableLayout>
    <CommonFormModal
      title="Edit Product"
      :handleCancel="handleCancel"
      :visible="visible"
    >
      <ProductForm :callback="handleUpdate" :initialState="selected" />
    </CommonFormModal>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Modal from '../../mixins/modal'
import Crud from '../../mixins/crud'
import { Product } from '../../types/product'
import { ButtonProps } from '../common/table/Actions.vue'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    sorter: true,
  },
  {
    title: 'Created',
    dataIndex: 'createdAt_short',
    sorter: true,
    responsive: ['md'],
  },
  {
    title: 'Updated',
    dataIndex: 'updatedAt',
    sorter: true,
    responsive: ['md'],
  },
  {
    title: 'Status',
    dataIndex: 'Status.name',
    responsive: ['md'],
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '',
    align: 'center',
    fixed: 'right',
    dataIndex: 'productId',
    responsive: ['md'],
    scopedSlots: {
      customRender: 'actions',
    },
  },
]
@Component({})
export default class ProductMain extends mixins(Crud, Modal) {
  path = '/products'
  columns = columns
  sort = 'name'
  extraActions(product: Product): ButtonProps[] {
    const statuses = this.$store.getters['statusStore/status']
    if (product.statusFk === statuses.ACTIVE) {
      return [
        {
          text: 'Suspend',
          icon: 'frown',
          event: 'suspend',
        },
      ]
    } else if (product.statusFk === statuses.SUSPENDED) {
      return [
        {
          text: 'Activate',
          icon: 'smile',
          event: 'activate',
        },
      ]
    }

    return []
  }
  handleUpdate(item: Product) {
    this.update({ productId: item.productId, name: item.name })
  }
  async suspend(suspend: boolean = true) {
    if (this.selected) {
      await this.updateStatus(suspend ? 'suspended' : 'active')
    }
  }
  created() {
    this.rowKey = 'productId'
  }
}
</script>
