<template>
  <a-space align="center" size="middle">
    <a-badge :count="1" :dot="true">
      <a-icon class="icon" style="font-size: 1.5em" type="bell" />
    </a-badge>
    <Nuxt-Link class="notLink" to="/account">
      <a-icon class="icon" type="setting" style="font-size: 1.5em" />
    </Nuxt-Link>
    <a-icon
      type="logout"
      @click="logout"
      class="icon"
      style="font-size: 1.5em"
    />
    <h3 class="welcome">Welcome, {{ name }}</h3>
  </a-space>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
const key = 'out'
@Component({})
export default class NavHeader extends Vue {
  get name() {
    return this.$auth.user?.firstName || 'user'
  }
  async logout() {
    this.$message.loading({ content: 'Signing out', key })
    await this.$auth.logout()
    this.$message.success({ content: 'Signed out', key, duration: 1 })
  }
}
</script>
<style lang="scss" scoped>
.notLink {
  fill: inherit;
  color: inherit;
}
.icon {
  @include icon-hover;
}
.welcome {
  font-size: small;
}
@media screen and (max-width: 990px) {
  .welcome {
    width: 6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>