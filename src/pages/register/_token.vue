<template>
  <AuthRegister :encoded="token" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'guest',
  auth: 'guest',
  async asyncData(ctx) {
    const token = ctx.params.token
    return {
      token,
    }
  },
})
</script>
