<template>
  <a-card
    :bordered="false"
    :bodyStyle="{
      padding: 0,
    }"
    class="card"
  >
    <img
      class="logo_back responsive"
      src="~/assets/img/cacao/logo_cacao_white.png"
      alt=""
    />
    <a-row class="row" align="middle" justify="center">
      <a-col :lg="10" :xs="24" :flex="1" class="flex">
        <div class="flex" style="flex: 1">
          <h1 class="title">Sign in</h1>
          <AuthLoginForm />
        </div>
        <p class="footer">
          Don't have an account? Please contact an administrator
        </p>
      </a-col>

      <a-col class="image default" :lg="14" :xs="0">
        <h1 class="cacao-title">Cacao's Admin Site</h1>
        <p>
          A private site designed to manage CacaoenBytes' business resources.
        </p>
        <img
          class="logo"
          src="~/assets/img/cacao/logo_cacao_white.png"
          alt=""
        />
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class AuthLogin extends Vue {}
</script>

<style lang="scss" scoped>
.card {
  margin: auto;
  border-radius: 10px;
  width: 60rem;
  height: 30rem;
}
.row {
  height: 30rem;
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
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)),
    url('~assets/img/login_photo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #fff;
  padding: 2rem;
  font-size: 1.5rem;
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

.responsive {
  display: none;
}
.footer {
  margin-bottom: 2rem;
  opacity: 0.9;
}
@media screen and (max-width: 992px) {
  .card {
    width: 28rem;
    height: 26rem;
  }
  .flex {
    height: 26rem;
  }
  .responsive {
    display: block;
  }
  .image {
    display: none;
  }
  .logo_back {
    width: 12rem;
    position: absolute;
    top: -20%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }
  /* .title {
    padding-top: 2rem;
  }*/
  .footer {
    text-align: center;
  }
  @media screen and (max-width: 576px) {
    .card {
      width: 90vw;
    }
  }
}
</style>