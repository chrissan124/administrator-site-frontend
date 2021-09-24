<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      v-model:collapsed="collapsed"
      collapsed-width="80"
      :trigger="null"
      collapsible
    >
      <img
        class="logo"
        src="~/assets/cacao/Logo_Cacao_ONLY_White.png"
        alt="logo"
      />
      <a-menu mode="vertical" theme="dark" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <a-icon type="home"></a-icon>
          <span class="nav-text">Home</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="contacts" />
          <span class="nav-text">Clients</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="bank" />
          <span class="nav-text">Contracts</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="cluster" />
          <span class="nav-text">Products</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="audit" />
          <span class="nav-text">Hirings</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="user" />
          <span class="nav-text">Users</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="folder-open" />
          <span class="nav-text">Templates</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div class="header">
          <a-icon
            class="trigger"
            type="menu"
            @click="() => (collapsed = !collapsed)"
          />
          <NavHeader style="margin-left: auto; margin-right: 2rem" />
        </div>
      </a-layout-header>
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
@Component({})
export default class NavSideBar extends Vue {
  collapsed = false
  selectedKeys = ['1']
}
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
.header {
  display: flex;
  align-items: center;
}
.logo {
  width: 80%;
  margin: 1rem auto;
  text-align: center;
}
</style>