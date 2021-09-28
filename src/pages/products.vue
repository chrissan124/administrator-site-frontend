<template>
  <CommonErrorBoundary>
    <ProductMain />
  </CommonErrorBoundary>
</template>
<script lang="ts">
import { NuxtAxiosInstance } from '@nuxtjs/axios'
export default {
  /*async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
    const products = await $axios.$get('products')
    return { products }
  },*/
}
</script>