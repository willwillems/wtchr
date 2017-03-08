import Vue from 'vue'; // required for Vue.set

import { produceShowData, getEpisodes, getFavoriteShowIDs, setCredentials } from '../../api';

// We'll later restructure this so instead of a list and object its one object like this: {123143: {title: "homeland" ---}, ----}
const state = {
  shows: [],
  showAppState: {}
};

const getters = {
  sortedShows: state => {
    return state.shows.slice().sort((a, b) => {
      try {
        // sort on most recently aired episode (first element in last element of seasons array)
        return new Date(b.episodes.seasons[b.episodes.seasons.length - 1][0].firstAired) - new Date(a.episodes.seasons[a.episodes.seasons.length - 1][0].firstAired);
      } catch (e) {
        if (e instanceof TypeError) {
          return state.shows;
        } else {
          throw e;
        }
      }
    });
  },
  mostRecentSeason: (state) => (id) => {
    return Math.max.apply(Math, state.shows.find(show => show.id === id).seasons);
  }
};

const mutations = {
  setShows (state, payload) {
    state.shows = payload;
  },
  setEpisodes (state, {id, season, list}) {
    // The following is not possible cuz Vue cannot detect property addition or
    // deletion or directly setting a list item with the index
    // state.shows.find(show => show.id === id).episodes.seasons[season] = list;
    Vue.set(state.shows.find(show => show.id === id).episodes.seasons, season, list);
  },
  setSelectedEpisode (state, {id, episode}) {
    if (typeof state.showAppState[id] === "undefined") {
      // Create the object if it does not exist
      Vue.set(state.showAppState, id, {});
    }
    Vue.set(state.showAppState[id], "selectedEpisode", episode);
  },
  setActiveSeason (state, {id, season}) {
    if (typeof state.showAppState[id] === "undefined") {
      // Create the object if it does not exist
      Vue.set(state.showAppState, id, {});
    }
    Vue.set(state.showAppState[id], "activeSeason", parseInt(season));
  },
  setActiveSeasonToNewest (state, {id}) {
    // Math.max cant be used because not every element in the array can be converted into a number (observer el)
    const seasons = state.shows.find(show => show.id === id).seasons;
    const newestSeason = Math.max.apply(Math, seasons);
    if (typeof state.showAppState[id] === "undefined") {
      // Create the object if it does not exist
      Vue.set(state.showAppState, id, {});
    }
    Vue.set(state.showAppState[id], "activeSeason", newestSeason);
  },
  deleteShowFromShows (state, id) {
    state.shows = state.shows.filter(show => {
      return show.id !== id;
    });
  }
};

const actions = {
  getShowData ({ commit, dispatch, state, rootState }) {
    return new Promise(function (resolve, reject) {
      setCredentials(rootState.settings);
      getFavoriteShowIDs()
        .then(ids => {
          // return only the id's of the shows that are not already present
          return ids.filter(id => {
            return (typeof state.shows.find(show => show.id === parseInt(id)) === 'undefined');
          });
        })
        .then(produceShowData)
        .then(shows => {
          commit('setShows', [...state.shows, ...shows]);
          shows.forEach(show => dispatch('getEpisodes', {
            id: show.id,
            season: Math.max.apply(Math, show.seasons)
          }));
        })
        .then(resolve);
    });
  },
  getEpisodes ({ commit }, { id, season }) {
    return new Promise(function (resolve, reject) {
      getEpisodes(id, season)
        .then(function (response) {
          // console.log('getEpisodes response: showid:', id, 'season:', season, 'data:', response);
          const list = response
            .map((eps) => {
              // convert episode nr's to strings and fixed lenght of two
              eps.airedEpisodeNumber = eps.airedEpisodeNumber < 10 ? '0' + eps.airedEpisodeNumber : String(eps.airedEpisodeNumber);
              eps.airedSeason = eps.airedSeason < 10 ? '0' + String(eps.airedSeason) : String(eps.airedSeason);
              return eps;
            });
          list.reverse(); // So the list is ordered most recent -> old
          // setActiveSeason does not belong here
          commit('setEpisodes', {
            id,
            season,
            list
          });
        })
        .then(resolve)
        .catch(reject);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
