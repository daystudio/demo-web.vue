import Vue from 'vue'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  el: '#app',
  router,
  data: {
    API_ROOT: (process.env.NODE_ENV === 'production') ? 'https://flowchurch.hk/shepherd' /* PROD */ : 'http://m.jarvis.today:7070/shepherd' /* DEV */
  },
  render: h => h(App)
}).$mount('#app')
