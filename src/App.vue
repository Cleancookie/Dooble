<template>
  <PlayArea />
</template>

<script>
import PlayArea from './components/PlayArea.vue';
// import PlayerList from './components/PlayerList.vue';

export default {
  name: 'App',
  components: {
    PlayArea,
    // PlayerList,
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
