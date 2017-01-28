import Vue from 'vue'; // required for Vue.set

import { produceShowData, getEpisodes } from '../../testapi.js';

// We'll later restructure this so instead of a list and object its one object like this: {123143: {title: "homeland" ---}, ----}
const state = {
  shows: []
};

const getters = {
  sortedShows: state => {
    return state.shows.slice().sort((a, b) => {
      return new Date(b.episodes.selectedEpisode.firstAired) - new Date(a.episodes.selectedEpisode.firstAired);
    });
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
    state.shows.find(show => show.id === id).episodes.selectedEpisode = episode;
  }
};

const actions = {
  async getShowData ({ commit }) {
    commit('setShows', await produceShowData());
  },
  getEpisodes ({ commit }, { id, season }) {
    getEpisodes(id, season)
       .then(function (response) {
         // console.log('getEpisodes response: showid:', id, 'season:', season, 'data:', response);
         const list = response
                         .filter((eps) => new Date(eps.firstAired).valueOf() < new Date().valueOf())
                         .map((eps) => {
                           // convert episode nr's to strings and fixed lenght of two
                           eps.airedEpisodeNumber = eps.airedEpisodeNumber < 10 ? '0' + eps.airedEpisodeNumber : String(eps.airedEpisodeNumber);
                           eps.airedSeason = eps.airedSeason < 10 ? '0' + String(eps.airedSeason) : String(eps.airedSeason);
                           return eps;
                         });
         list.reverse(); // So the list is ordered most recent -> old
         commit('setEpisodes', {
           id,
           season,
           list
         });
         commit('setSelectedEpisode', {
           id,
           episode: list[0]
         });
       })
       .catch(function (error) {
         console.log(error, "error");
       });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
