<template>
  <div class="card">
    <span v-for="symbol in card" :key="symbol" class="symbol">{{
      symbol
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    card: [],
  },
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  outline: 1px solid black;
  flex-wrap: wrap;
  max-width: 22em;
  min-height: 22em;
}

.symbol {
  flex: 1 0 calc(33% - 2rem);
  font-size: 3em;
  padding: 1rem;

  &:hover {
    outline: 1px solid black;
    cursor: pointer;
  }
}
</style>
