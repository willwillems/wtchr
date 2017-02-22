<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/colors";
.spinner {
  width: 40px;
  height: 40px;
  display: none;
  position: fixed;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  z-index: 10;
  &.active {
    display: block;
  }
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: $prim-red;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

</style>
--------------------------------------------------------------------------------
<template lang="pug">
    .spinner(:class="{ active }")
        .double-bounce1
        .double-bounce2
</template>
--------------------------------------------------------------------------------
<script>
export default {
  name: 'spinner',
  props: [
    'active'
  ]
};
</script>
