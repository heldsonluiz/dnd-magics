import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import App from '@/App';
import Vuetify from 'vuetify';

// Helpers
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken1,
    secondary: colors.green.lighten4,
    accent: colors.indigo.base,
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
