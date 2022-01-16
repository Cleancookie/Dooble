<template>
  <p>{{ me.id }}</p>
  <button @click="joinPlayerPrompt">Join Player</button>
  <button @click="setName">Set name</button>
  <ul>
    <li v-for="player in allPlayers">
      {{ player.name }} ({{ player.id }})
      <span v-if="player.host">(host)</span>
      <span v-if="player.id === me.id">(me)</span>
      <span>({{ player.score }})</span>
    </li>
  </ul>
</template>

<script>
import PeerManager from './PeerManager';
export default {
  name: 'PlayerList',
  mixins: [PeerManager],
  props: {
    cards: {
      type: Array,
      requred: true,
    },
    me: {
      type: Object,
    },
    players: {
      type: Array,
    },
  },
  emits: ['setMe'],
  mounted() {
    this.setMyId(this.$peer.id);
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
      let newMe = this.me;
      newMe.name = name;
      this.$emit('setMe', newMe);
      this.updatePlayer(this.me);
    },
  },
};
</script>
