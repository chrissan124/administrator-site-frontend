<template>
  <div>
    <CommonTableLayout
      :selected="selected"
      :privilege="privilege"
      :header="{ title: 'Users', icon: 'user' }"
      :recycleProps="{
        url: this.path,
        id: 'userId',
        column: [this.columns[0]],
        remove: true,
      }"
      @revive="get"
    >
      <UserForm slot="form" :callback="create" />
      <a-table
        :columns="columns"
        :row-key="(record) => record.userId"
        :data-source="items"
        :loading="loading"
        layout="auto"
        :scroll="{ x: 'max-content' }"
        :pagination="pagination"
        @change="handleTableChange"
        :row-selection="rowSelection()"
        style="background-color: white; padding: 1.5em"
      >
        <span slot="name" slot-scope="name, record">
          {{ name }} {{ record.lastName }}
          <span style="font-weight: bolder">{{
            record.userId === currentUser ? '(You)' : ''
          }}</span>
        </span>
        <span slot="status" slot-scope="status">
          <a-tag :color="status === 'ACTIVE' ? 'green' : 'red'">
            {{ status }}
          </a-tag>
        </span>
        <CommonTableActions
          slot="actions"
          :privilege="privilege"
          slot-scope="actions, record"
          :selected="actions"
          v-if="record.userId !== currentUser"
          :current="selectedRowKeys[0]"
          @update="showModal"
          @suspend="suspend(true)"
          @activate="suspend(false)"
          @delete="
            handleDelete(
              'Users can be restored if desired, by going to the recycling bin.'
            )
          "
          :defaultButtons="{ details: false }"
          :extraButtons="extraActions(record)"
        />
      </a-table>
    </CommonTableLayout>
    <CommonFormModal
      title="Edit User"
      :handleCancel="handleCancel"
      :visible="visible"
    >
      <UserUpdateForm :callback="handleUpdate" :initialState="selected" />
    </CommonFormModal>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Modal from '../../mixins/modal'
import Crud from '../../mixins/crud'
import { User } from '../../types/user'
import { ButtonProps } from '../common/table/Actions.vue'
const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
    width: '30%',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    sorter: true,
    scopedSlots: {
      customRender: 'name',
    },
  },
  {
    title: 'Role',
    dataIndex: 'Role.name',
    sorter: true,
  },
  {
    title: 'Updated',
    dataIndex: 'updatedAt',
    sorter: true,
  },
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
    fixed: 'right',
    dataIndex: 'userId',
    scopedSlots: {
      customRender: 'actions',
    },
  },
]
@Component({})
export default class UserMain extends mixins(Crud, Modal) {
  path = '/users'
  privilege = 'user'
  columns = columns
  sort = 'email'

  get currentUser(): undefined | string {
    return this.$auth.user?.userId as undefined | string
  }

  extraActions(user: User): ButtonProps[] {
    const statuses = this.$store.getters['statusStore/status']
    if (user.statusFk === statuses.ACTIVE) {
      return [
        {
          text: 'Suspend',
          icon: 'frown',
          event: 'suspend',
          action: 'U',
        },
      ]
    } else if (user.statusFk === statuses.SUSPENDED) {
      return [
        {
          text: 'Activate',
          icon: 'smile',
          event: 'activate',
          action: 'U',
        },
      ]
    }
    return []
  }
  handleUpdate(item: User) {
    this.update({ ...item })
  }
  async suspend(suspend: boolean = true) {
    if (this.selected) {
      const fullName =
        (this.selected as User).firstName +
        ' ' +
        (this.selected as User).lastName
      this.$confirm({
        title: suspend ? 'Block user?' : 'Unblock user?',
        content: suspend
          ? `${fullName} will not be able to access their account any longer.`
          : `${fullName} will regain access to their account and its privileges.`,
        onOk: () => {
          this.updateStatus(suspend ? 'suspended' : 'active')
        },
      })
    }
  }
  created() {
    this.rowKey = 'userId'
  }
}
</script>
