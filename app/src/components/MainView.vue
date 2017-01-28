<style lang="scss">
@import "../assets/sass/colors";
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
#app {
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
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  #app
    .menu-bar
      input(type="text", placeholder="Search", v-model="searchQuery")
      span
        i.material-icons face
        d Flame
      span(href="login")
        i.material-icons add
        d Add show
      span
        i.material-icons search
        d Search
    .page-content
      // 'show' must be a string here because of pug but in vanilla HTML would not be one
      show-panel(v-for='show in searchedShows', :show='show')
</template>
--------------------------------------------------------------------------------
<script>
import TorrentDropdown from './MainView/TorrentDropdown';
import ShowPanel from './MainView/ShowPanel';

export default {
  name: 'app',
  data () {
    return {
      isActive: true,
      showdata: [],
      searchQuery: ''
    };
  },
  components: {
    TorrentDropdown,
    ShowPanel
  },
  methods: {
    classchange: function () {
      this.isActive = !this.isActive;
    }
  },
  computed: {
    searchedShows: function () {
      const vm = this;
      if (this.searchQuery === '') {
        return this.$store.state.showdata.shows;
      }
      return this.$store.state.showdata.shows.filter(function (show) {
        return show.title.startsWith(vm.searchQuery);
      });
    }
  },
  created: function () {
    this.$store.dispatch('getShowData');
  }
};
</script>
