<template>
  <div class="card">
    <span
      v-for="symbol in card"
      :key="symbol"
      class="symbol"
      v-on:click="$emit('clicked', symbol)"
    >
      {{ symbol }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    card: {},
  },
  methods: {
    getIconScale() {
      const scale = Math.random() * 2;
      return scale > 0.75 ? scale : 0.75;
    },
  },
};
</script>

<style lang="scss">
.card {
  display: flex;
  outline: 4px dashed var(--black);
  flex-wrap: wrap;
  max-width: 20em;
  align-items: center;
  align-content: space-evenly;
  border-radius: 1.5em;
  padding: 1em;
  background-color: var(--lighter-bg);
  margin: 1em;
}

.symbol {
  --padding: 1.5rem;
  flex: 1 0 calc(33% - (2 * var(--padding)));
  font-size: 2em;
  padding: var(--padding);
  text-align: center;
  outline: 1px solid transparent;
  transition: 200ms;
  border-radius: 0.25em;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
}
</style>
