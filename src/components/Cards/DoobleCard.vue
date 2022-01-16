<template>
  <div class="card">
    <span
      v-for="symbol in card"
      :key="symbol"
      class="symbol"
      v-on:click="$emit('clicked', symbol)"
      >{{ symbol }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    card: {},
  },
};
</script>

<style lang="scss">
.card {
  display: flex;
  outline: 4px dashed var(--black);
  flex-wrap: wrap;
  max-width: 22em;
  align-items: center;
  align-content: space-evenly;
  border-radius: 1.5em;
  padding: 1em;
  background-color: var(--lighter-bg);
}

.symbol {
  --padding: 1.5rem;
  flex: 1 0 calc(33% - (2 * var(--padding)));
  font-size: 3em;
  padding: var(--padding);
  text-align: center;
  outline: 1px solid transparent;
  transition: 300ms;
  border-radius: 0.25em;

  &:hover {
    background-color: var(--light-bg);
    cursor: pointer;
  }
}
</style>
