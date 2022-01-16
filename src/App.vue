<template>
  <PlayArea />
</template>

<script>
import PlayArea from './components/PlayArea.vue';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    PlayArea,
  },
};
</script>

<style>
body {
  --black: black;
  --white: white;

  --lighter-bg: rgb(252, 252, 252);
  --light-bg: rgb(232, 232, 232);
  --dark-bg: rgb(42, 42, 42);
}
</style>
