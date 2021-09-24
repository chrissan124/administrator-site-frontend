<template>
  <a-card
    :bordered="false"
    :bodyStyle="{ width: '60rem', height: '30rem', padding: 0 }"
    class="card"
  >
    <a-row style="height: 100%" align="middle" justify="center">
      <a-col :span="10" class="flex">
        <div class="flex" style="flex: 1">
          <h1 class="title">Sign in</h1>
          <AuthLoginForm />
        </div>
        <p style="margin-bottom: 2rem; opacity: 0.9">
          Don't have an account? Please contact an administrator
        </p>
      </a-col>

      <a-col class="image" :span="14">
        <h1 class="cacao-title">Cacao's Admin Site</h1>
        <p>
          A private site designed to manage CacaoenBytes' business resources.
        </p>
        <img
          class="logo"
          src="~/assets/cacao/Logo_Cacao_ONLY_White.png"
          alt=""
        />
      </a-col>
    </a-row>
  </a-card>
</template>
<style scoped>
.card {
  margin: auto;
  border-radius: 10px;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.image {
  height: 100%;
  background: url('~assets/login_photo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #fff;
  padding: 2rem;
  font-size: 1.5rem;
  /* text-shadow: 0px 0.5px 1px white;*/

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cacao-title {
  color: inherit;
  font-size: 3rem;
  margin-top: auto;
}
.logo {
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 1rem;
  width: 10rem;
}
</style>