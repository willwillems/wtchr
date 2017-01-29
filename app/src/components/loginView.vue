<style lang="scss">
@import "../assets/sass/colors";
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300,800);

#login {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  color: #fff;
}

.input-wrapper {
  position: relative;
  display: inline-block;
  margin: 30px 10px;
}

.form-wrapper {
  width: 215px;
}

.inputty {
  display: inline-block;
  width: 215px;
  padding: 10px 0 10px 18px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: grey;
  border-width: 2px;
  border-color: black;
  border-style: solid;
  text-indent: 60px; // Arbitrary.
  transition: all .3s ease-in-out;
  vertical-align: middle;

  + label {
     display: inline-block;
     position: absolute;
     top: 7px;
     left: 0;
     bottom: 8px;
     padding: 5px 15px;
     color: #032429;
     font-size: 11px;
     font-weight: 700;
     text-transform: uppercase;
     text-shadow: 0 1px 0 rgba(19,74,70,0);
     transition: all .3s ease-in-out;

     &:after {
       position: absolute;
       content: "";
       width: 0;
       height: 0;
       top: 100%;
       left: 50%;
       margin-left: -3px;
       transition: all .3s ease-in-out;
     }
  }
}
.inputty:focus,
.inputty:active {
  color: black;
  text-indent: 0;

  &::-webkit-input-placeholder {
    color: #aaa;
  }
  + label {
    transform: translateY(-30px);
  }
}
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  #login
    .form-wrapper
      span.input-wrapper
        input(v-model="APIKey", class="inputty", id="state", type="text", placeholder="Liquid, solid, gaseous...")
        label(for="state") APIkey
      span.input-wrapper
        input(v-model="username", class="inputty", id="planet", type="text", placeholder="Probably Earth")
        label(for="planet") Username
      span.input-wrapper
        input(v-model="userkey", class="inputty", id="planet", type="text", placeholder="Probably Earth")
        label(for="planet") Userkey
      router-link(to="/") home
</template>
--------------------------------------------------------------------------------
<script>
export default {
  name: 'login',
  data () {
    return {
    };
  },
  computed: {
    APIKey: {
      get () {
        return this.$store.state.settings.theTVDBLogin.APIKey;
      },
      set (value) {
        this.$store.commit('setTVDBAPIKey', value);
      }
    },
    username: {
      get () {
        return this.$store.state.settings.theTVDBLogin.username;
      },
      set (value) {
        this.$store.commit('setTVDBUsername', value);
      }
    },
    userkey: {
      get () {
        return this.$store.state.settings.theTVDBLogin.userkey;
      },
      set (value) {
        this.$store.commit('setTVDBUserkey', value);
      }
    }
  }
};
</script>
