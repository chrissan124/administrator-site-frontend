<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      v-model:collapsed="collapsed"
      :collapsed-width="proportions.collapsedWidth"
      :width="proportions.width"
      :trigger="null"
      class="sider"
      collapsible
      style="display: flex; flex-direction: column; align-items: center"
    >
      <img
        :class="`logo`"
        src="~/assets/img/cacao/Logo_Cacao_ONLY_White.png"
        alt="logo"
      />
      <a-menu
        :class="menuHidden"
        mode="vertical"
        theme="dark"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item v-for="(tab, index) in tabs" :key="index + 1">
          <Nuxt-Link :to="tab.route || '/'">
            <a-icon :style="menuItems.style" :type="tab.icon"></a-icon>
            <span :class="`nav-text ${menuItems.class}`">{{ tab.name }}</span>
          </Nuxt-Link>
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
      <a-layout-content class="content" :style="{ margin: '24px 16px 0' }">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Cacao's Admin Site ©{{ year }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import WindowListener from '../../mixins/windowListener'
const tabs = [
  { name: 'Home', icon: 'home', route: '/' },
  { name: 'Clients', icon: 'contacts', route: '/clients' },
  { name: 'Contracts', icon: 'bank', route: '/contracts' },
  { name: 'Products', icon: 'appstore', route: '/products' },
  { name: 'Hirings', icon: 'audit', route: '/hirings' },
  { name: 'Users', icon: 'user', route: '/users' },
  { name: 'Templates', icon: 'folder-open', route: '/templates' },
]
@Component({})
export default class NavSideBar extends mixins(WindowListener) {
  collapsed = false
  selectedKeys = ['1']
  tabs = tabs
  year = new Date().getFullYear()
  selected() {
    const index = this.tabs.findIndex((value) => {
      return this.$router.currentRoute.matched.find((route) => {
        return route.path === value.route
      })
    })
    console.log('INDEX: ', index)
    this.selectedKeys = [`${index ? index + 1 : 1}`]
  }
  get proportions() {
    return {
      width: this.windowWidth <= 1000 ? 80 : 200,
      collapsedWidth: this.windowWidth <= 1000 ? 0 : 80,
    }
  }
  get menuHidden() {
    if (this.windowWidth <= 1000 && this.collapsed) {
      return 'hidden icon-big'
    }
    return 'default'
  }

  get menuItems() {
    if (this.windowWidth <= 1000) {
      return {
        class: 'hidden',
        style: 'font-size:1.5em;margin-left: 0.8rem;',
      }
    }
    return { class: 'default', style: {} }
  }
}
</script>

<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  @include icon-hover;
  padding: 0 24px;
}

.header {
  display: flex;
  align-items: center;
}
.logo {
  width: 75%;
  margin: 12px;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.content {
  height: fit-content;
}
.hidden {
  display: none;
}
.icon-big {
  font-size: 2em;
}
</style>