<template><span></span></template>

<script>
export default {
  name: 'PeerManager',
  methods: {
    setMyId(id) {
      this.me.id = id;
    },
    connect(id) {
      this.hostConn = this.$peer.connect(id);
      this.hostConn.on('open', () => {
        this.hostConn.send(
          JSON.stringify({ do: 'newPlayer', player: this.me })
        );
      });
      this.setupHostListeners(this.hostConn);
    },
    updatePlayer(player) {
      if (this.hostConn === null) {
        return;
      }
      this.hostConn.send(
        JSON.stringify({ do: 'updatePlayer', player: player })
      );
    },
    setupPlayerListeners(conn) {
      console.log('Setting up new player connection');
      conn.on('open', console.log);
      conn.on('data', (data) => {
        try {
          data = JSON.parse(data);
          let actionHandler =
            'host' + data.do[0].toUpperCase() + data.do.slice(1);
          console.log(`Doing: ${actionHandler}`);
          this[actionHandler](data);
        } catch (e) {
          console.error(e);
        }
      });
      conn.on('close', console.log);
      conn.on('error', console.error);
    },
    setupHostListeners(conn) {
      console.log('Setting up new host connection');
      conn.on('open', console.log);
      conn.on('data', (data) => {
        try {
          data = JSON.parse(data);
          let actionHandler =
            'player' + data.do[0].toUpperCase() + data.do.slice(1);
          console.log(`Doing: ${actionHandler}`);
          this[actionHandler](data);
        } catch (e) {
          console.error(e);
        }
      });
      conn.on('close', console.log);
      conn.on('error', console.error);
    },
    hostNewPlayer(data) {
      this.players.push(data.player);
      this.conns.forEach((conn) => {
        conn.send(
          JSON.stringify({
            do: 'updatePlayers',
            players: [this.me, ...this.players],
          })
        );
      });
    },
    playerUpdatePlayers(data) {
      this.players = data.players.filter((player) => {
        return player.id !== this.me.id;
      });
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
