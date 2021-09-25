import Sass from 'sass'
import Fiber from 'fibers'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cacao-admin-site',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css'],

  styleResources: {
    scss: ['~assets/scss/mixins.scss', '~assets/scss/variables.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/antd-ui',
    '~/plugins/antd-message',
    '~/plugins/axios-date',
  ],

  srcDir: 'src/',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  //Auth module configuration
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/access' },
          logout: { url: '/auth/logout' },
          user: { url: '/auth/me', method: 'get' },
        },
      },
    },
  },
  //nav guard
  router: {
    middleware: ['auth'],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: Sass,

        sassOptions: {
          fiber: Fiber,
        },
      },
    },
  },
}
