<template>
  <DoobleCard :card="getRandomCard()" />
  <DoobleCard :card="getRandomCard()" />
</template>

<script>
import GenerateCardsMixin from './Cards/GenerateCardsMixin.vue';
import DoobleCard from './Cards/DoobleCard.vue';
import HelloWorld from './HelloWorld.vue';

export default {
  name: 'PlayArea',
  components: { DoobleCard },
  mixins: [GenerateCardsMixin],
  computed: {
    allCards() {
      return this.generateCards;
    },
  },
  methods: {
    getRandomCard() {
      return collect(this.allCards()).shuffle().first();
    },
  },
};
</script>
