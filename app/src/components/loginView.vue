<style lang="scss">
@import "../assets/sass/colors";
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300,800);

#login {
  // font-family: "Open Sans", sans-serif;
  font: 14px/1.21 Roboto, 'Helvetica Neue', arial, helvetica, sans-serif;
  font-weight: 100;
  color: grey;
}

.input-wrapper {
  position: relative;
  display: inline-block;
  margin: 15px 10px;
}

.form-wrapper {
  width: 260px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.settings-title {
  font-size: 15px;
  text-align: center;
  &:hover:first-letter {
    color: $prim-red;
  }
}

.back-button {
  position: absolute;
  left: 15px;
  top: 15px;
  color: black;
  :hover {
    color: $prim-red
  }
}
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  #login
    .form-wrapper
      div(class="settings-title")
        h1 Settings
      material-input(v-model="APIKey", :label="'APIkey'", :placeholder="'e.g. VYFIKA2D1FMHMOP7'")
      material-input(v-model="username", :label="'Username'", :placeholder="'e.g. stormagddn123'")
      material-input(v-model="userkey", :label="'Userkey'", :placeholder="'e.g. 841212'")
    router-link(class="back-button", to="/")
      i(class="material-icons") arrow_back
</template>
--------------------------------------------------------------------------------
<script>
import MaterialInput from './LoginView/MaterialInput';

export default {
  name: 'login',
  data () {
    return {
    };
  },
  components: {
    MaterialInput
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
