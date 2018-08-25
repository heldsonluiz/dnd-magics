import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import App from '@/App';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  theme: {
    abjuration: '#1E88E5',
    divination: '#78909C',
    conjuration: '#FB8C00',
    enchantment: '#8E24AA',
    evocation: '#E53935',
    illusion: '#5E35B1',
    necromancy: '#43A047',
    transmutation: '#F9A825',
  },
  iconfont: 'fa4',
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
