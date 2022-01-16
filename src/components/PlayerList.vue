<template>
  <p>My ID: {{ me.id }}</p>
  <button @click="joinPlayerPrompt">Join Player</button>
  <button @click="setName">Set name</button>
  <ul>
    <li v-for="player in allPlayers">
      {{ player.name }} ({{ player.id }}) <span v-if="player.host">(host)</span>
    </li>
  </ul>
</template>

<script>
import PeerManager from './PeerManager';
export default {
  name: 'PlayerList',
  mixins: [PeerManager],
  mounted() {
    this.setMyId(this.$peer.id);
  },
  data() {
    return {
      me: {
        id: null,
        name: 'Me',
        host: false,
      },
      players: [],
    };
  },
  computed: {
    allPlayers() {
      return [this.me, ...this.players];
    },
  },
  methods: {
    joinPlayerPrompt() {
      let id = window.prompt('Please enter their ID');
      this.connect(id);
    },
    setName() {
      let name = window.prompt('Your new nickname');
      this.me.name = name;
      this.updatePlayer(this.me);
    },
  },
};
</script>
