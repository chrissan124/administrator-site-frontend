<template>
  <a-space align="center">
    <a-icon class="icon" style="font-size: 1.5em" type="bell" />
    <a-icon type="setting" class="icon" style="font-size: 1.5em" />
    <h1>Welcome, {{ name }}</h1>
  </a-space>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class NavHeader extends Vue {
  name: string = 'Luis A.'
}
</script>
<style scoped>
.icon:hover {
  cursor: pointer;
}
</style>