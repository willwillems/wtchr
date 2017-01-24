<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/colors";
@import url('https://fonts.googleapis.com/css?family=Fira+Sans');

// A wrapper is neccecairy because some decorative elements spill outside the actual panel
.main-wrapper {
    width: 100%;
    height: 250px;
    position: relative;
    margin: 0px;
}

.panel {
    background-color: black; // When image is loading
    background-size: cover;
    background-position: top center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: box-shadow 0.3s ease-in-out;
    width: 97%;
    margin: 0 1.5%;
    height: 90%;
    position: relative;
    padding: 0px; // Larger padding is larger bg image
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
    }
}

#dropdown {
    top: calc(100% - 20px - 2rem); // From top so it drops down instead of up an 2rem is the height of the element
    right: 20px;
    max-width: calc(97% - 20px - 5px); // Prevents div-spilling, 97% is width of div, minus the space on the right, no idea why '- 5px'
}

#seasonselector {
    position: absolute;
    top: 10px;
    right: 1.5%;
}

.show-title {
    position: absolute;
    top: 10px;
    left: 5px;
    height: 3rem;
    min-width: 20px;
    padding: 0px 10px 0px 0px;
    line-height: 3rem;
    font-size: 3em;
    background-color: white;
    z-index: 1;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 800;
    font-style: italic;
}

.fliepeltje {
    position: absolute;
    width: 1.8rem;
    height: 7px;
    top: calc(10px + 3rem + 30px);
    left: 5px;
    background-color: $prim-red;
    z-index: 1;
}

.description {
    position: absolute;
    top: calc(10px + 3rem + 20px);
    left: 40px;
    max-width: 22rem;
    width: calc(100% - 80px - 30px); // 80px = 2* left position, 30px = 2* padding
    height: 4rem;
    overflow-y: scroll;
    background-color: white;
    font-size: 10px;
    padding: 15px;
    z-index: 1;
}

</style>
--------------------------------------------------------------------------------
<template lang="pug">
  .main-wrapper
    .show-title {{show.title}}
    .fliepeltje
    .description {{show.description}}
    season-selector(id="seasonselector", :episodes="episodes", :show="show", @changeEp="changeEp")
    .panel(:style="{'background-image': 'url(' + show.image + ')'}")
      torrent-dropdown(id="dropdown", width="500px", :episode='selectedEpisode', :title='show.title')
</template>
--------------------------------------------------------------------------------
<script>
import TorrentDropdown from './TorrentDropdown';
import SeasonSelector from './SeasonSelector';

export default {
  name: 'hello',
  props: [
    'show'
  ],
  data () {
    return {
      selectedEpisode: {season: '', episode: ''}
    };
  },
  components: {
    TorrentDropdown,
    SeasonSelector
  },
  methods: {
    changeEp: function (ep) {
      this.selectedEpisode = ep;
    }
  },
  watch: {
  }
};
</script>
