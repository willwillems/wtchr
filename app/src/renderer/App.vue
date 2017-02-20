<style lang="scss">
  // @import '../../assets/sass/colors';
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
</style>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './vuex/store';

  export default {
    store,
    created: function () {
      // This can't be in the mainview component because then it constantly
      // updates while navigating between login and main
      this.$store.commit('setSpinner', true);
      this.$store.dispatch('getLocalData')
        .then(() => this.$store.dispatch('getShowData'))
        .then(() => this.$store.commit('setSpinner', false));
    }
  };
</script>
