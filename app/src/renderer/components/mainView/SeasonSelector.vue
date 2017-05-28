<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/colors";

.container {
  z-index: 1;
}

.season-list {
  text-align: end;
  padding: 0px 4px 4px 0px;

  b {
    color: white;
    border-radius: 50%;
    margin: 4px;
    text-align: center;
  }
}

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
  .container
    .season-list
      b(v-for="season in seasons", @click="setActiveSeason(season)") {{season}}
    .season-panel(@click="seasonPanelIsActive = !seasonPanelIsActive", :class="{ active: seasonPanelIsActive }")
        .episode(:class="{ active: seasonPanelIsActive }")
            .season-number S{{selectedEpisode.airedSeason}} E{{selectedEpisode.airedEpisodeNumber}}
            .episode-date {{selectedEpisode.firstAired}}
            .episode-name {{selectedEpisode.episodeName}}
        .episode(v-for="episode in airedEpisodes", :class="{ active: seasonPanelIsActive }", @click="$store.commit('setSelectedEpisode', {id: show.id, episode});")
            .season-number S{{episode.airedSeason}} E{{episode.airedEpisodeNumber}}
            .episode-date {{episode.firstAired}}
            .episode-name {{episode.episodeName}}
</template>
--------------------------------------------------------------------------------
<script>
import { mapState } from 'vuex';

export default {
  name: 'seasonSelector',
  props: [
    'show'
  ],
  data () {
    return {
      seasonPanelIsActive: false
    };
  },
  created () {
    if (!this.activeSeason) {
      this.setActiveSeasonToNewest();
    };
  },
  methods: {
    setActiveSeason: function (season) {
      this.$store.commit('setActiveSeason', {
        id: this.show.id,
        season
      });
      // If there are no episodes of the current active season yet, fetch them
      if (this.episodes === []) {
        this.getEpisodes();
      };
    },
    setActiveSeasonToNewest: function () {
      this.$store.commit('setActiveSeasonToNewest', {
        id: this.show.id
      });
      // If there are no episodes of the current active season yet, fetch them
      if (this.episodes === []) {
        this.getEpisodes();
      };
    },
    getEpisodes: function () {
      this.$store.dispatch('getEpisodes', {
        id: this.show.id,
        season: this.activeSeason
      });
    }
  },
  computed: {
    activeSeason () {
      try {
        return this.showAppState[this.show.id].activeSeason;
      } catch (e) {
        if (e instanceof TypeError) {
          return undefined;
        }
      };
    },
    episodes () {
      // If there is no active season there are no eps avaliable
      if (typeof this.activeSeason === "undefined") {
        return [];
      };
      // To prevent vue from getting properties from undefined in the template
      if (typeof this.show.episodes.seasons[this.activeSeason] === 'undefined') {
        return [];
      };
      if (this.show.episodes.seasons[this.activeSeason] === null) {
        return [];
      };
      return this.show.episodes.seasons[this.activeSeason];
    },
    seasons () {
      // zero values (special eps) fuck everything up, fix later
      return Object.values(this.show.seasons).filter(e => e != 0).sort();
    },
    airedEpisodes () {
      try {
        return this.episodes.filter((eps) => new Date(eps.firstAired) < new Date());
      } catch (e) {
        console.log(e)
        return [];
      };
    },
    selectedEpisode () {
      // To prevent vue from getting properties from undefined in the template
      if (typeof this.showAppState[this.show.id] === 'undefined' ||
          typeof this.showAppState[this.show.id].selectedEpisode === "undefined") {
        return {};
      };
      return this.showAppState[this.show.id].selectedEpisode;
    },
    ...mapState({
      showAppState: state => state.showdata.showAppState
    })
  },
  watch: {
    airedEpisodes: function (val) {
      // If there are no aired episodes but there are episodes
      // and the active season is not the first season
      const previousSeason = this.activeSeason - 1;
      console.log(this.episodes)
      if (val.length === 0 && this.episodes.length === 0) {
        // First get the episodes for the previous season,
        // then set the active season
        this.$store.dispatch('getEpisodes', {
          id: this.show.id,
          season: this.activeSeason
        });
      } else if (val.length === 0 && this.episodes.length > 0 && previousSeason >= 1) {
        // First get the episodes for the previous season,
        // then set the active season
        this.$store.dispatch('getEpisodes', {
          id: this.show.id,
          season: previousSeason
        })
        .then(() => {
          this.$store.commit('setActiveSeason', {
            id: this.show.id,
            season: previousSeason
          });
        });
      } else if (typeof val[0] !== "undefined") {
        // If the list of airedEpisodes changes update the selected eps to the newest
        this.$store.commit('setSelectedEpisode', {
          id: this.show.id,
          episode: val[0]
        });
      };
    }
  }
};
</script>
