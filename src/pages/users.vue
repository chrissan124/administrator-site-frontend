<template>
  <CommonErrorBoundary>
    <UserMain />
  </CommonErrorBoundary>
</template>

<style lang="scss" scoped>
.main {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 1000px) {
  .main {
    width: 100%;
  }
}
</style>
