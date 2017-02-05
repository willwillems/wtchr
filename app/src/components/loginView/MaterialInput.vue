<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/colors";

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
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  fieldset(class="material")
    input(v-bind:value="value",
          v-on:input="updateValue($event.target.value)",
          type="text",
          :placeholder="placeholder",
          required)
    hr
    label {{label}}
</template>
--------------------------------------------------------------------------------
<script>
export default {
  name: 'seasonSelector',
  props: [
    'value',
    'label',
    'placeholder'
  ],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    }
  }
};
</script>
