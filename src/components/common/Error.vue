<template>
  <a-result
    :status="status"
    :title="`${status}`"
    :sub-title="
      status === '404'
        ? `Sorry, this page wasn't found.`
        : 'Sorry, something went wrong.'
    "
  >
    <template #extra>
      <a-space>
        <nuxt-link to="/">
          <a-button type="primary"> Go back </a-button>
        </nuxt-link>
        <a-button v-if="status !== '404'" @click="reload">Reload Page</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CommonForm extends Vue {
  @Prop({ default: 'error' })
  statusCode!: string
  status = this.statusCode.toString()
  currentRoute = this.$router.currentRoute.path
  reload() {
    window.location.reload()
  }
}
</script>