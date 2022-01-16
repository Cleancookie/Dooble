<template>
  <p>My ID: {{ id }}</p>
  <ul>
    <li v-for="player in players">{{ player.name }}</li>
  </ul>
</template>

<script>
export default {
  name: 'PlayerList',
  data() {
    return {
      id: null,
      players: [
        {
          id: 123,
          name: 'Me',
        },
      ],
    };
  },
};
</script>
