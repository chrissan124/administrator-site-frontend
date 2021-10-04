<template>
  <div>
    <CommonTableLayout
      :selected="selected"
      :header="{ title: 'Roles', icon: 'user' }"
    >
      <!-- <UserForm slot="form" :callback="create" /> -->
      <a-table
        :columns="columns"
        :row-key="(record) => record.roleId"
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
          slot-scope="actions"
          :selected="actions"
          :current="selectedRowKeys[0]"
          @update="showModal"
          @delete="handleDelete('Deleted roles cannot be restored')"
        />
      </a-table>
    </CommonTableLayout>
    <CommonFormModal
      title="Edit Role"
      :handleCancel="handleCancel"
      :visible="visible"
    >
      <!--       <ProductForm :callback="handleUpdate" :initialState="selected" /> -->
    </CommonFormModal>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Modal from '../../mixins/modal'
import Crud from '../../mixins/crud'
import { Role } from '../../types/user'
import { ButtonProps } from '../common/table/Actions.vue'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '30%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    scopedSlots: {
      customRender: 'description',
    },
  },
  {
    title: 'Updated',
    dataIndex: 'updatedAt',
    sorter: true,
  },
  {
    title: '',
    align: 'center',
    fixed: 'right',
    dataIndex: 'userId',
    scopedSlots: {
      customRender: 'actions',
    },
  },
]
@Component({})
export default class RoleMain extends mixins(Crud, Modal) {
  path = '/users'
  columns = columns
  sort = 'email'
  extraActions(role: Role): ButtonProps[] {
    if (role.deletable) {
      return [
        {
          text: 'Delete',
          icon: 'delete',
          event: 'delete',
        },
      ]
    } else {
      return []
    }

    return []
  }
  handleUpdate(item: Role) {
    this.update({ ...item })
  }

  created() {
    this.rowKey = 'roleId'
  }
}
</script>
