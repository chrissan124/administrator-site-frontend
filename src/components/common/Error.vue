<template>
  <a-result :status="status" :title="`${status}`" :sub-title="parsedStatus">
    <template #extra>
      <a-space>
        <nuxt-link to="/">
          <a-button type="primary"> Go back </a-button>
        </nuxt-link>
        <a-button v-if="showReload" @click="reload">Reload Page</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CommonError extends Vue {
  @Prop({ default: 'error' })
  statusCode!: string
  status = this.statusCode.toString()
  currentRoute = this.$router.currentRoute.path

  get showReload(): boolean {
    return !['404', '403'].includes(this.statusCode)
  }
  get parsedStatus() {
    switch (this.status) {
      case '404':
        return `Sorry, this page wasn't found.`
      case '403':
        return `Sorry, you don't have access to this page`
      default:
        return 'Sorry, something went wrong.'
    }
  }

  reload() {
    window.location.reload()
  }
}
</script>