<template>
  <p>My ID: {{ me.id }}</p>
  <button @click="joinPlayerPrompt">Join Player</button>
  <button @click="setName">Set name</button>
  <ul>
    <li v-for="player in allPlayers">{{ player.name }} ({{ player.id }})</li>
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
      hostConn: null,
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
      this.hostConn = this.$peer.connect(id);
      this.hostConn.send(
        JSON.stringify({ msg: 'new-player', player: this.me })
      );
    },
    setName() {
      let name = window.prompt('Your new nickname');
      this.me.name = name;
    },
  },
};
</script>
