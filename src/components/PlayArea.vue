<script setup>
import DoobleCard from './Cards/DoobleCard.vue';
import GenerateCards from './Cards/GenerateCards.js';
const cards = GenerateCards();
</script>

<template>
  <DoobleCard :symbols="getRandomCard()" />
  <DoobleCard :symbols="getRandomCard()" />
</template>

<script>
export default {
  computed: {
    allCards() {
      return GenerateCards();
    },
  },
  methods: {
    getRandomCard() {
      const cards = this.allCards;
      return cards[Math.floor(Math.random() * cards.length)];
    },
  },
};
</script>
