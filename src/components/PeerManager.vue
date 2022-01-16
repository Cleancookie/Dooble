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
          JSON.stringify({ do: 'new-player', player: this.me })
        );
      });
      this.setupHostListeners(this.hostConn);
    },
    updatePlayer(player) {
      this.hostConn.send(
        JSON.stringify({ do: 'update-player', player: player })
      );
    },
    setupPlayerListeners(conn) {
      console.log('Setting up new connection');
      conn.on('open', console.log);
      conn.on('data', console.log);
      conn.on('close', console.log);
      conn.on('error', console.error);
    },
    setupHostListeners(conn) {
      this.me.host = true;
      console.log('Setting up new connection');
      conn.on('open', console.log);
      conn.on('data', (data) => {
        try {
          data = JSON.parse(data);
          this.players.push(data.player);
          console.log(data.player);
        } catch (e) {
          console.error(e);
        }
      });
      conn.on('close', console.log);
      conn.on('error', console.error);
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
      this.conns.push(conn);
      this.setupPlayerListeners(conn);
    });
    this.$peer.on('data', console.log);
  },
};
</script>
