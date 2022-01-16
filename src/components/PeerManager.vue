<template><span></span></template>

<script>
export default {
  name: 'PeerManager',
  methods: {
    setMyId(id) {
      this.me.id = id;
    },
  },
  data() {
    return {
      conns: [],
    };
  },
  mounted() {
    this.$peer.on('open', this.setMyId);
    this.$peer.on('connection', (conn) => {
      console.log('New player!');
      this.conns.push(conn);
    });
  },
};
</script>
