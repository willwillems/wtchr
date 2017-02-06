<style lang="scss">
@import "../assets/sass/colors";
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
#main {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //color: $blue
    margin-top: 0px;
}

// User mouse selection
::selection {
    color: white;
    background: black;
}

body {
  background-color: white;
  margin: 0px; // normalize
}

.menu-bar {
  width: 100%;
  height: 5rem;
  margin: 0px;
  background-color: white;
  color: rgb(68, 68, 68);
  font-size: 2em;
  line-height: 5rem;
  padding: 0px 20px;
  position: fixed;
  z-index: 3;
  text-align: left;
  border-bottom: 1px solid lightgray;
  input {
    height: 2.7rem;
    position: absolute;
    top: 0px;
    left: 20px;
    border: none;
    font-size: 1em;
    border-bottom: 1px solid #CCC;
  }
  span {
    font-size: 0.4em;
    padding: 0px 80px;
    line-height: 3rem; // same as menu bar to centre
    vertical-align: middle;
    float: right;
    &:hover {
      background-color: lightgray;
    }
    i {
      vertical-align: middle;
    }
  }
}

.page-content {
  padding-top: 6em; // size of menu bar plus 1 em
  width: 100%;
}

// transistion
.top-enter-enter-active, .top-enter-leave-active {
    transition: opacity 1.8s;
    transition: transform .8s ease;
}
.top-enter-enter, .top-enter-leave-to /* .top-enter-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: rotate3d(1,0,0,90deg);
}
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  #main
    .menu-bar
      input(type="text", placeholder="Search", v-model="searchQuery")
      span
        i.material-icons face
        router-link(to="/login") login
      span(href="login")
        i.material-icons add
        router-link(to="/foo") Delete show
      span
        i.material-icons refresh
        i(@click="$store.dispatch('getShowData')") Refresh
    .page-content
      //transition-group(name="top-enter", appear)
      // 'show' must be a string here because of pug but in vanilla HTML would not be one
      spinner(:active="isActive")
      show-panel(v-for='show in searchedShows', :show='show', :key="show.id")
</template>
--------------------------------------------------------------------------------
<script>
import TorrentDropdown from './MainView/TorrentDropdown';
import ShowPanel from './MainView/ShowPanel';
import Spinner from './MainView/Spinner';

export default {
  name: 'main',
  data () {
    return {
      isActive: false,
      showdata: [],
      searchQuery: ''
    };
  },
  components: {
    TorrentDropdown,
    ShowPanel,
    Spinner
  },
  methods: {
    toggleSpinner: function (bool) {
      if (typeof bool === "undefined") {
        this.isActive = !this.isActive;
        return;
      };
      this.isActive = bool;
    }
  },
  computed: {
    searchedShows: function () {
      const vm = this;
      if (this.searchQuery === '') {
        return this.$store.getters.sortedShows;
      }
      return this.$store.getters.sortedShows.filter(function (show) {
        return show.title.startsWith(vm.searchQuery);
      });
    }
  }
};
</script>
