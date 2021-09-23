<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      v-model:collapsed="collapsed"
      collapsed-width="80"
      collapsible
    >
      <a-menu mode="vertical" theme="dark" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <span class="nav-text">Home</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span class="nav-text">Clients</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span class="nav-text">Products</span>
        </a-menu-item>
        <a-menu-item key="4">
          <span class="nav-text">Hirings</span>
        </a-menu-item>
        <a-menu-item key="5">
          <span class="nav-text">Users</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Cacao's Admin Site ©2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
//import { HomeOutlined } from '@ant-design/icons-vue'
@Component({
  /*components: { HomeOutlined } */
})
export default class CommonSideBar extends Vue {
  collapsed = false
  selectedKeys = ['1']
}
</script>