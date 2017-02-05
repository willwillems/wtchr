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

// Shamelesly copied from: http://codepen.io/anon/pen/egKded
.material {
	position: relative;
	padding: 0;
	margin: 5px;
	border: none;
	overflow: visible;

	input {
		box-sizing: border-box;
		width: 100%;
		padding: 12px 10px 8px;
		border: none;
		border-radius: 0;
		box-shadow: none;
		border-bottom: 1px solid #DDD;
		font-size: 120%;
		outline: none;
		cursor: text;

		&::-webkit-input-placeholder {
			transition: color 300ms ease;
		}
		&:not(:focus)::-webkit-input-placeholder {
			color: transparent;
		}
	}

	hr {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 2px;
		border: none;
		background: $prim-red;
		font-size: 1px;
		will-change: transform, visibility;
		transition: all 200ms ease-out;
		transform: scaleX(0);
		visibility: hidden;
		z-index: 10;
	}
	input:focus ~ hr {
		transform: scaleX(1);
		visibility: visible;
	}

	label {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 120%;
		color: $prim-red;
		transform-origin: 0 -150%;
		transition: transform 300ms ease;
		pointer-events: none;
	}
	input:focus ~ label,
	input:valid ~ label {
		transform: scale(0.6);
	}
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
      fieldset(class="material")
        input(v-model="APIKey", type="text", placeholder="e.g. VYFIKA2D1FMHMOP7", required)
        hr
        label APIkey
      fieldset(class="material")
        input(v-model="username", type="text", placeholder="e.g. stormagddn123", required)
        hr
        label Username
      fieldset(class="material")
        input(v-model="userkey", type="text", placeholder="e.g. 841212", required)
        hr
        label Userkey
    router-link(class="back-button", to="/")
      i(class="material-icons") arrow_back
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
