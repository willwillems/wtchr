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
  .menu-button {
    height: 100%;
    vertical-align: middle;
    float: right;
    padding: 0px 10px;
    &:first-of-type {
      padding-right: 20px;
    }
    .material-icons {
      padding: 7px;
      color: darkgray;
      border-width: 2px;
      border-color: darkgray;
      border-style: solid;
      border-radius: 50%;
      transition: all .4s ease-in-out;
    }

    &:hover {
      .material-icons {
        color: $prim-red;
        &.refresh {
          transform: rotate(360deg) scale(1.1);
        }
        &.login {
          transform: scale(1.1);
        }
      }
      // .menu-text {
      //   display: block;
      // }
    }
    .menu-text {
      font-size: 8px;
      display: none;
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
      span.menu-button(@click="$router.push('/login')")
        i.material-icons.login perm_identity
        .menu-text Login
      // span(href="login")
        i.material-icons add
        router-link(to="/foo") Add show
      span.menu-button(@click="$store.dispatch('getShowData')")
        i.material-icons.refresh refresh
        .menu-text Refresh
    .page-content
      //transition-group(name="top-enter", appear)
      // 'show' must be a string here because of pug but in vanilla HTML would not be one
      spinner(:active="$store.state.appstate.spinnerActive")
      show-panel(v-for='show in searchedShows', :show='show', :key="show.id")
</template>
--------------------------------------------------------------------------------
<script>
import ShowPanel from './MainView/ShowPanel';
import Spinner from './MainView/Spinner';

export default {
  name: 'main',
  data () {
    return {
      showdata: [],
      searchQuery: ''
    };
  },
  components: {
    ShowPanel,
    Spinner
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
