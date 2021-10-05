<template>
  <div>
    <a-card
      :bordered="false"
      :bodyStyle="{
        padding: 0,
      }"
      class="card"
    >
      <img
        class="logo_back"
        src="~/assets/img/cacao/logo_cacao_white.png"
        alt="logo"
      />
      <a-row style="height: 100%" align="middle" justify="center">
        <a-col class="flex">
          <div class="flex" style="flex: 1">
            <h1 class="title">Account Setup</h1>
            <AuthRegisterForm :callback="signIn" />
          </div>
          <p class="footer">
            If you didn't ask to be signed up, click
            <span class="link">here</span>
          </p>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">
import { mixins, Component, Prop } from 'nuxt-property-decorator'
import { User } from '~/src/types/user'
import WindowListener from '../../mixins/windowListener'
@Component({})
export default class AuthLogin extends mixins(WindowListener) {
  @Prop({ default: null })
  encoded!: string
  token: string | null = null
  created() {
    this.token = this.$jwt.decodeToken(this.encoded)
    if (!this.token) {
      this.$router.replace('/')
    }
  }
  async signIn(user: User) {
    const key = 'key'
    try {
      this.$message.loading({ content: 'Signing Up...', key })
      const config = { headers: { Authorization: `Bearer ${this.encoded}` } }
      const res = await this.$axios.put('/auth/me', { user }, config)
      if (res.status === 200) {
        /*DESCOMENTAR
        await this.$axios.get('auth/logout', config)
        */
        this.$message.success({ content: 'Signed Up', key })
        this.$router.replace('/login')
      } else throw new Error()
    } catch (error) {
      this.$message.error({
        content: `Couldn't sign in, try again later.`,
        key,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: block;
  margin: 25vh auto;
  margin-top: 25vh;
  border-radius: 10px;
  width: 28rem;
  height: 26rem;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
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

.footer {
  margin-bottom: 2rem;
  opacity: 0.9;
}
.link {
  color: $primary;
  cursor: pointer;
}
.title {
  padding-top: 2rem;
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
@media screen and (max-width: 900px) {
  .card {
    width: 22rem;
  }
}
@media screen and (max-width: 600px) {
  .card {
    width: 95vw;
  }
}
</style>