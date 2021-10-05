<template>
  <a-card
    :bordered="false"
    :bodyStyle="{
      width: proportions.width,
      height: proportions.height,
      padding: 0,
    }"
    class="card"
  >
    <a-row class="default" style="height: 100%" align="middle" justify="center">
      <a-col :span="10" class="flex">
        <div class="flex" style="flex: 1">
          <h1 class="title">Sign in</h1>
          <AuthLoginForm />
        </div>
        <p class="footer">
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
          src="~/assets/img/cacao/logo_cacao_white.png"
          alt=""
        />
      </a-col>
    </a-row>
    <div class="responsive">
      <img
        class="logo_back"
        src="~/assets/img/cacao/logo_cacao_white.png"
        alt=""
      />
      <a-row align="middle" class="responsive wide" justify="center">
        <a-col>
          <div class="flex">
            <h1 class="title">Sign in</h1>
            <AuthLoginForm />
            <p style="text-align: center; margin-top: 1rem" class="footer">
              Don't have an account? Please contact an administrator
            </p>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator'
import WindowListener from '../../mixins/windowListener'
@Component({})
export default class AuthLogin extends mixins(WindowListener) {
  get proportions() {
    return {
      width:
        this.windowWidth < 600
          ? '90vw'
          : this.windowWidth < 900
          ? '30rem'
          : '60rem',
      height: this.windowWidth < 900 ? '20rem' : '30rem',
    }
  }
}
</script>

<style lang="scss" scoped>
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

.responsive {
  display: none;
}
.footer {
  margin-bottom: 2rem;
  opacity: 0.9;
}
@media screen and (max-width: 900px) {
  .image {
    display: none;
  }

  .default {
    display: none;
  }
  .responsive {
    display: block;
  }
  .wide {
    height: 100%;
    width: 100%;
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
  .title {
    padding-top: 2rem;
  }
}
</style>