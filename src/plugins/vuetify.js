import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import 'vue-snack/dist/vue-snack.min.css'
import VueSnackbar from 'vue-snack'
import axios from 'axios'
Vue.use(Vuetify);
Vue.use(VueSnackbar, { time: 4000 })

Object.defineProperty(Vue.prototype, '$axios', { value: axios });

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
});
