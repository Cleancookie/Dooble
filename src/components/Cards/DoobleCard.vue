<template>
  <div>
    <span v-for="symbol in symbols" :key="symbol">{{ symbol }}</span>
  </div>
</template>

<script>
export default {
  props: ['symbols'],
};
</script>
