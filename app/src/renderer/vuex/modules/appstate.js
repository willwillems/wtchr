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

export default {
  state,
  mutations
};
