<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/colors";

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
        font-size: 1.5em;
        padding: 0px 5px;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 800;
    }
    .episode-name {
        font-size: 0.8em;
        padding: 0px 5px 4px 5px;
        color: #5d5d5d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &.active {
        height: 8rem; // twice original
    }
    .episode-date {
        font-size: 0.5em;
        font-style: italic;
        padding: 0px 0px 2px 5px;
        color: gray;
    }
}
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  .season-panel(@click="showpanelIsActive = !showpanelIsActive", :class="{ active: showpanelIsActive }")
      .episode(:class="{ active: showpanelIsActive }")
          .season-number S{{selectedEpisode.airedSeason}} E{{selectedEpisode.airedEpisodeNumber}}
          .episode-date {{selectedEpisode.firstAired}}
          .episode-name {{selectedEpisode.episodeName}}
      .episode(v-for="episode in episodes", :class="{ active: showpanelIsActive }", @click="$store.commit('setSelectedEpisode', {id: show.id, episode});")
          .season-number S{{selectedEpisode.airedSeason}} E{{episode.airedEpisodeNumber}}
          .episode-date {{selectedEpisode.firstAired}}
          .episode-name {{episode.episodeName}}
</template>
--------------------------------------------------------------------------------
<script>
export default {
  name: 'seasonSelector',
  props: [
    'show'
  ],
  data () {
    return {
      showpanelIsActive: false,
      activeSeason: ''
    };
  },
  created: function () { // this below here is temporairy , i think this attribute is normaly empty now
    this.activeSeason = Math.max.apply(Math, this.show.seasons); // Math.max cant be used because not every element in the array can be converted into a number (observer el)
    this.getEpisodes();
  },
  methods: {
    getEpisodes: function () {
      this.$store.dispatch('getEpisodes', {
        id: this.show.id,
        season: this.activeSeason
      });
    }
  },
  computed: {
    episodes () {
      return this.show.episodes.seasons[this.activeSeason];
    },
    selectedEpisode () {
      return this.show.episodes.selectedEpisode;
    }
  }
};
</script>
