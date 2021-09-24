<template>
  <a-space align="center" size="middle">
    <a-icon class="icon" style="font-size: 1.5em" type="bell" />
    <a-icon type="setting" class="icon" style="font-size: 1.5em" />
    <a-icon type="logout" class="icon" style="font-size: 1.5em" />
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
<style lang="scss" scoped>
.icon {
  @include icon-hover;
}
</style>