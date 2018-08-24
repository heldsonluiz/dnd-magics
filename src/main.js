import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import App from '@/App';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  theme: {
    abjuration: '#90CAF9',
    divination: '#B0BEC5',
    conjuration: '#FFA726',
    enchantment: '#CE93D8',
    evocation: '#E57373',
    illusion: '#AB47BC',
    necromancy: '#66BB6A',
    transmutation: '#66BB6A',
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
