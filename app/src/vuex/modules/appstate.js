const state = {
  spinnerActive: false
};

const mutations = {
  toggleSpinner (state) {
    state.spinnerActive = !state.spinnerActive;
  },
  setSpinner (state, payload) {
    state.spinnerActive = payload;
  }
};

const actions = {
  activateSpinner ({ commit }) {
    commit('setSpinner', true);
  },
  deactivateSpinner ({ commit }) {
    commit('setSpinner', false);
  }
};

export default {
  state,
  mutations,
  actions
};
