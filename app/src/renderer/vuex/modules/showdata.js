import Vue from 'vue'; // required for Vue.set

import { produceShowData, getEpisodes, getFavoriteShowIDs, setCredentials } from '../../api';

// We'll later restructure this so instead of a list and object its one object like this: {123143: {title: "homeland" ---}, ----}
const state = {
  shows: []
};

const getters = {
  sortedShows: state => {
    return state.shows.slice().sort((a, b) => {
      try {
        return new Date(b.episodes.selectedEpisode.firstAired) - new Date(a.episodes.selectedEpisode.firstAired);
      } catch (e) {
        if (e instanceof TypeError) {
          return state.shows;
        } else {
          throw e;
        }
      }
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
  },
  deleteShowFromShows (state, id) {
    state.shows = state.shows.filter(show => {
      return show.id !== id;
    });
  }
};

const actions = {
  getShowData ({ commit, dispatch, state, rootState }) {
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
      });
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
         console.log(error, 'error');
       });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
