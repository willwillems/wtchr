const state = {
  theTVDBLogin: {
    APIKey: "",
    username: "",
    userkey: ""
  }
};

const mutations = {
  setTVDBAPIKey (state, payload) {
    state.theTVDBLogin.APIKey = payload;
  },
  setTVDBUsername (state, payload) {
    state.theTVDBLogin.username = payload;
  },
  setTVDBUserkey (state, payload) {
    state.theTVDBLogin.userkey = payload;
  }
};

export default {
  state,
  mutations
};
