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
  import store from 'src/vuex/store';

  export default {
    store
  };
</script>
