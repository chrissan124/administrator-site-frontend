<template>
  <div>
    <CommonTableLayout
      :selected="selected"
      :privilege="privilege"
      :header="{ title: propTitle, icon: 'contacts' }"
      :recycleProps="{
        url: this.path,
        id: 'clientId',
        column: [this.columns[0]],
        remove: true,
      }"
      @revive="get"
      :showCreate="{ closeIcon: true }"
    >
      <ClientForm slot="form" :callback="handleCreate" />

      <a-table
        :columns="columns"
        :row-key="(record) => record.clientId"
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
          <Nuxt-Link :to="`clients/${record.clientId}`">
            {{ name }}
          </Nuxt-Link>
        </span>
        <span slot="status" slot-scope="status">
          <a-tag :color="status | color">
            {{ status }}
          </a-tag>
        </span>
        <CommonTableActions
          slot="actions"
          :privilege="privilege"
          slot-scope="actions"
          :selected="actions"
          :current="selectedRowKeys[0]"
          @update="showModal"
          @delete="
            handleDelete(
              'Clients can be restored if desired, by going to the recycling bin.'
            )
          "
          :defaultButtons="{ details: false }"
        />
      </a-table>
    </CommonTableLayout>
    <CommonFormModal
      title="Edit Client"
      :handleCancel="handleCancel"
      :visible="visible"
      :closable="true"
    >
      <ClientForm :callback="handleUpdate" :initialState="mappedCurrent" />
    </CommonFormModal>
  </div>
</template>
<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import Modal from '../../mixins/modal'
import Crud from '../../mixins/crud'
import { Client, FlatClient } from '../../types/client'
import { deleteKeys, flattenObject } from '../../utils/flat-object'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    scopedSlots: {
      customRender: 'name',
    },
  },
  {
    title: 'Legal ID',
    dataIndex: 'legalIdentifier',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
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
    dataIndex: 'clientId',
    scopedSlots: {
      customRender: 'actions',
    },
  },
]
@Component({})
export default class ClientMain extends mixins(Crud, Modal) {
  @Prop({default:'/contracts'})
  propPath!:string 

  @Prop({default:'Contracts'})
  propTitle!:string

  path = this.propPath
  privilege = 'client'
  columns = columns
  sort = 'name'

  handleCreate(client: FlatClient) {
    this.create(this.mapFlatClient(client))
  }

  get mappedCurrent() {
    if (!this.selected) return {}
    const client = { ...this.selected } as Client
    let flatClient = deleteKeys(client, ['createdAt, updatedAt', 'Status'])
    flatClient = flattenObject(flatClient)
    console.log(flatClient)
    return flatClient
  }
  mapFlatClient(client: FlatClient, created = false) {
    const mappedClient: Client = {
      name: client.name,
      legalIdentifier: client.legalIdentifier,
      phone: client.phone,
      email: client.email,
      ...(client.clientId && { clientId: client.clientId }),
      ...(client.statusFk && { statusFk: client.statusFk }),
      clientId: client.clientId,
      Address: {
        addressId: client.addressId,
        primaryLine: client.primaryLine,
        secondaryLine: client.secondaryLine,
        state: client.state,
        country: client.country,
        city: client.city,
        zipCode: client.zipCode,
      },
    }
    return mappedClient
  }
  handleUpdate(item: FlatClient) {
    this.update({ ...this.mapFlatClient(item) })
  }

  created() {
    this.rowKey = 'clientId'
  }
}
</script>