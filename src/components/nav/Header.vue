<template>
  <a-space align="center" size="middle">
    <a-icon class="icon" style="font-size: 1.5em" type="bell" />
    <a-icon type="setting" class="icon" style="font-size: 1.5em" />
    <a-icon
      type="logout"
      @click="logout"
      class="icon"
      style="font-size: 1.5em"
    />
    <h3>Welcome, {{ name }}</h3>
  </a-space>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
const key = 'out'
@Component({})
export default class NavHeader extends Vue {
  name = this.$auth.user?.firstName || 'user'
  async logout() {
    this.$message.loading({ content: 'Signing out', key })
    await this.$auth.logout()
    this.$message.success({ content: 'Signed out', key, duration: 1 })
  }
}
</script>
<style lang="scss" scoped>
.icon {
  @include icon-hover;
}
</style>