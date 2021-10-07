<template>
  <div>
    <CommonTableLayout
      :selected="selected"
      :header="{ title: 'Roles', icon: 'team' }"
      :privilege="privilege"
    >
      <RoleForm slot="form" :callback="create" />
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
        <CommonTableActions
          slot="actions"
          slot-scope="actions, record"
          :defaultButtons="{ delete: false }"
          :extraButtons="extraActions(record)"
          :privilege="privilege"
          :selected="actions"
          :current="selectedRowKeys[0]"
          @update="showModal"
          @details="showDetail"
          @delete="handleDelete('Deleted roles cannot be restored')"
        />
      </a-table>
    </CommonTableLayout>
    <CommonFormModal
      title="Edit Role"
      :handleCancel="handleCancel"
      :visible="visible"
    >
      <RoleForm
        :callback="handleUpdate"
        :initialState="{ ...mappedSelected }"
      />
    </CommonFormModal>
    <CommonTableDetails
      v-if="selected"
      :item="selected"
      :keys="['name', 'createdAt', 'updatedAt', 'description', 'Permissions']"
      :config="{ description: { span: 3 }, Permissions: { span: 3 } }"
      title="Role Info"
      :visible="detailVisible"
      :handleCancel="hideDetail"
    >
      <template slot="Permissions" slot-scope="prop">
        <a-tag
          style="
            width: 6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
          v-for="perm in prop"
          :key="perm.permissionId"
        >
          <a-icon :type="mapIcon(perm.type)" /> {{ perm.name }}
        </a-tag>
      </template>
    </CommonTableDetails>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Modal from '../../mixins/modal'
import Crud from '../../mixins/crud'
import DetailModal from '../../mixins/detailModal'
import { Permission, Role } from '../../types/user'
import { ButtonProps } from '../common/table/Actions.vue'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: 'Privileges',
    dataIndex: 'Permissions.length',
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
    dataIndex: 'roleId',
    scopedSlots: {
      customRender: 'actions',
    },
  },
]
@Component({})
export default class RoleMain extends mixins(Crud, Modal, DetailModal) {
  path = '/roles'
  getPath = '/roles/perms'
  privilege = 'role'
  columns = columns
  sort = 'name'
  permissions: Array<Permission> = []
  permNames: Set<String> = new Set()

  get mappedSelected() {
    if (!this.selected) {
      return null
    }
    const sel = this.selected as Role
    return {
      roleId: sel.roleId,
      name: sel.name,
      description: sel.description,
      perms: sel.Permissions.map((perm) => perm.permissionId),
    }
  }
  mapIcon(action: string) {
    switch (action) {
      case 'C':
        return 'plus-circle'
      case 'U':
        return 'edit'
      case 'D':
        return 'delete'
      default:
        return 'info-circle'
    }
  }
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
  }
  async handleUpdate(item: Role) {
    await this.update({ ...item })
    this.selected = null
    this.selectedRowKeys = []
  }

  created() {
    this.rowKey = 'roleId'
    this.permissions = this.$store.getters['permissionStore/permission']
    this.permNames = this.$store.getters['permissionStore/name']
  }
}
</script>
