import localforage from 'localforage';

var settingsStorage = localforage.createInstance({
  name: 'settings'
});

const state = {
  theTVDBLogin: {
    APIKey: '',
    username: '',
    userkey: ''
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

const getters = {
  loginInfoIsPresent: state => {
    return (!!state.theTVDBLogin.APIKey && !!state.theTVDBLogin.username && !!state.theTVDBLogin.userkey);
  }
};

const actions = {
  getLocalData ({ commit }) {
    return settingsStorage.iterate(function (value, key) {
      commit(key, value);
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
