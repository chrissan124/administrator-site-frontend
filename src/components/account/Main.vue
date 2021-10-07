<template>
  <a-tabs
    style="width: 100%"
    tabPosition="top"
    defaultActiveKey="1"
    type="line"
  >
    <a-tab-pane key="1">
      <span slot="tab"> <a-icon type="user" /> Account </span>
      <AccountForm :initialState="initialState" :callback="save" />
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab"> <a-icon type="lock" /> Password </span>
      <AccountPassword />
    </a-tab-pane>
    <a-tab-pane key="3">
      <span slot="tab"> <a-icon type="warning" /> Erase </span>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { User } from '~/src/types/user'
import { parseError } from '../../utils/error-parser'

@Component({})
export default class UserAccount extends Vue {
  initialState: Object = { ...this.$auth.user }

  async save(user: User, ctx: { update: boolean }) {
    const key = '1'
    this.$message.loading({ content: 'Saving account changes...', key })
    try {
      await this.$axios.put('/auth/me', {
        ...user,
        userId: (this.initialState as User).userId,
      })
      await this.$auth.fetchUser()
      this.initialState = { ...this.$auth.user }
      ctx.update = false
      this.$message.success({ content: 'Account updated', key })
    } catch (error) {
      this.$message.error({ content: parseError(error), key })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>