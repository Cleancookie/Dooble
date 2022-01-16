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
      this.setupDataConnectionListeners(this.hostConn);

      setTimeout(() => {
        this.hostConn.send(
          JSON.stringify({ do: 'new-player', player: this.me })
        );
      }, 500);
    },
    updatePlayer(player) {
      this.hostConn.send(
        JSON.stringify({ do: 'update-player', player: player })
      );
    },
    setupDataConnectionListeners(conn) {
      console.log('Setting up new connection');
      conn.on('open', console.log);
      conn.on('data', console.log);
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
      console.log('New connection');
      this.conns.push(conn);
      this.setupDataConnectionListeners(conn);
    });
    this.$peer.on('data', console.log);
  },
};
</script>
