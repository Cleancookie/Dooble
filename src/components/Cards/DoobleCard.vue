<template>
  <div>
    <span v-for="symbol in card" :key="symbol">{{ symbol }}</span>
  </div>
</template>

<script>
export default {
  props: {
    card: [],
  },
};
</script>
