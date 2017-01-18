<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "../assets/sass/colors";
$prim-red: red;
$clouds: #ecf0f1;
.season-panel {
    float: left;
    width: 10rem;
    height: 4rem;
    background-color: white;
    overflow-y: scroll;
    z-index: 1;
    text-align: left;
    transition: height 0.5s ease-in-out;
    box-shadow: 7px 0px $prim-red; // For the side bar
    .episode {
        width: 10rem;
        height: 4rem;
        display: none;
        &:first-of-type {
            display: block;
        }
        &.active {
            display: block;
        }
        &.active:hover {
            background-color: $clouds;
        }
    }
    .season-number {
        font-size: 1.8em;
        padding: 0px 5px;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 800;
    }
    .episode-name {
        font-size: 0.8em;
        padding: 0px 5px;
        color: gray;
    }
    &.active {
        height: 8rem; // twice original
    }
}
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  .season-panel(@click="showpanelIsActive = !showpanelIsActive", :class="{ active: showpanelIsActive }")
      .episode(:class="{ active: showpanelIsActive }")
          .season-number S{{selectedEpisode.airedSeason}} E{{selectedEpisode.airedEpisodeNumber}}
          .episode-name {{selectedEpisode.episodeName}}
      .episode(v-for="episode in episodes", :class="{ active: showpanelIsActive }", @click="selectedEpisode = episode;")
          .season-number S{{selectedEpisode.airedSeason}} E{{episode.airedEpisodeNumber}}
          .episode-name {{episode.episodeName}}
</template>
--------------------------------------------------------------------------------
<script>
import {getEpisodes} from '../../testapi';
import axios from 'axios';

export default {
  name: 'seasonSelector',
  props: [
    'show'
  ],
  data () {
    return {
      showpanelIsActive: false,
      selectedEpisode: {},
      episodes: [
        {airedEpisodeNumber: '01', episodeName: 'Episode Name'},
        {airedEpisodeNumber: '03', episodeName: 'Lorem Ipsum'},
        {airedEpisodeNumber: '04', episodeName: 'Concrete'}
      ]
    };
  },
  created: function () { // this below here is temporairy , i think this attribute is normaly empty now
    this.getEpisodes(Math.max.apply(Math, this.show.seasons)); // Math.max cant be used because not every element in the array can be converted into a number (observer el)
  },
  methods: {
    getEpisodes: function (season) {
      var vm = this;
      getEpisodes(this.show.id, season)
      .then(function (response) {
        const data = response;
        // console.log('getEpisodes response: showid:', vm.show.id, 'season:', season, 'data:', data);
        vm.episodes = data
                        .filter((eps) => new Date(eps.firstAired).valueOf() < new Date().valueOf())
                        .map((eps) => {
                          // convert episode nr's to strings and fixed lenght of two
                          eps.airedEpisodeNumber = eps.airedEpisodeNumber < 10 ? '0' + eps.airedEpisodeNumber : String(eps.airedEpisodeNumber);
                          eps.airedSeason = eps.airedSeason < 10 ? '0' + String(eps.airedSeason) : String(eps.airedSeason);
                          return eps;
                        });
        vm.episodes.reverse(); // So the list is ordered most recent -> old
        vm.selectedEpisode = vm.episodes[0];
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    }
  },
  watch: {
    selectedEpisode: function () {
      this.$emit('changeEp', {season: this.selectedEpisode.airedSeason, episode: this.selectedEpisode.airedEpisodeNumber});
    }
  }
};
</script>
