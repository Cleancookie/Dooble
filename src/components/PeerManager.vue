<template><span></span></template>

<script>
export default {
  name: 'PeerManager',
  emits: ['newCards', 'setPlayers', 'setMe'],

  methods: {
    setMyId(id) {
      this.me.id = id;
    },
    sendMsg(action = '', data = {}) {
      // send a msg to host
      this.hostConn.send({
        do: action,
        data: data,
        auth: this.me,
      });
    },
    broadcast(action = '', data = {}) {
      this.conns.forEach((conn) => {
        conn.send({
          do: action,
          data: data,
          auth: this.me,
        });
      });
    },
    connect(id) {
      this.hostConn = this.$peer.connect(id, { serialization: 'json' });
      this.hostConn.on('open', () => {
        this.sendMsg('newPlayer', { player: this.me });
      });
      this.setupHostListeners(this.hostConn);
    },
    updatePlayer(player) {
      if (this.hostConn === null) {
        return;
      }
      this.sendMsg('updatePlayer', { player: player });
    },
    setupPlayerListeners(conn) {
      // conn is a player, i am a host
      console.log('Setting up new player connection');
      conn.on('open', () => {
        conn.send({
          do: 'newCards',
          cards: collect(this.cards).toArray(),
        });
      });
      conn.on('data', (data) => {
        try {
          let actionHandler =
            'host' + data.do[0].toUpperCase() + data.do.slice(1);
          console.log(`Doing: ${actionHandler}`);
          this[actionHandler](data); // lowkey dangerous
        } catch (e) {
          console.error(e);
        }
      });
      conn.on('close', console.log);
      conn.on('error', console.error);
    },
    setupHostListeners(conn) {
      // conn is the host, i am a player
      console.log('Setting up new host connection');
      conn.on('open', console.log);
      conn.on('data', (data) => {
        try {
          let actionHandler =
            'player' + data.do[0].toUpperCase() + data.do.slice(1);
          console.log(`Doing: ${actionHandler}`);
          this[actionHandler](data); // lowkey dangerous
        } catch (e) {
          console.error(e);
        }
      });
      conn.on('close', console.log);
      conn.on('error', console.error);
    },
    hostNewPlayer(data) {
      this.players.push(data.data.player);
      this.broadcast('updatePlayers', { players: [this.me, ...this.players] });
    },
    playerUpdatePlayers(data) {
      this.$emit(
        'setPlayers',
        data.data.players.filter((player) => {
          return player.id !== this.me.id;
        })
      );
    },
    playerNewCards(data) {
      this.$emit('newCards', data.cards);
    },
  },
  data() {
    return {
      conns: [],
      hostConn: null,
    };
  },
  mounted() {
    this.$peer.on('open', this.setMyId);
    this.$peer.on('connection', (conn) => {
      this.me.host = true;
      this.conns.push(conn);
      this.setupPlayerListeners(conn);
    });
    this.$peer.on('data', console.log);
  },
};
</script>
