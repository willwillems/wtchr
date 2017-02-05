import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as getters from './getters';
import modules from './modules';

import localStoragePlugin from './plugins/localStoragePlugin';

Vue.use(Vuex);

export default new Vuex.Store({
  // actions,
  // getters,
  modules,
  plugins: [localStoragePlugin],
  strict: true
});
