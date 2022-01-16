<template>
  <button @click="setRandomCards">Generate random cards</button>
  <DoobleCard v-for="card in cards" :card="card" @clicked="symbolClicked" />
</template>

<script>
import GenerateCardsMixin from './Cards/GenerateCardsMixin.vue';
import DoobleCard from './Cards/DoobleCard.vue';
import HelloWorld from './HelloWorld.vue';

export default {
  name: 'PlayArea',
  components: { DoobleCard },
  mixins: [GenerateCardsMixin],
  data: function () {
    return {
      cards: [],
    };
  },
  computed: {
    allCards() {
      return this.generateCards;
    },
  },
  methods: {
    getRandomCard() {
      return collect(this.allCards()).shuffle().first();
    },
    symbolClicked(symbol) {
      console.log(`Clicked on ${symbol}`);
      if (this.checkOthersForSymbol(symbol).length > 1) {
        this.setRandomCards();
      }
    },
    setRandomCards() {
      this.cards = [this.getRandomCard(), this.getRandomCard()];
    },
    checkOthersForSymbol(symbol) {
      return this.cards.filter((card) => {
        return collect(card).contains(symbol);
      });
    },
  },
};
</script>
