<template>
  <Tutorial />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData(ctx) {
    console.log(ctx.store.getters['statusStore/status'])
  },
})
</script>
