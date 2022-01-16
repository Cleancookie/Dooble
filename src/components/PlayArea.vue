<template>
  <div class="play-area">
    <DoobleCard v-for="card in cards" :card="card" @clicked="symbolClicked" />
  </div>
  <PlayerList :cards="cards" @newCards="setCards" />
</template>

<script>
import GenerateCardsMixin from './Cards/GenerateCardsMixin.vue';
import DoobleCard from './Cards/DoobleCard.vue';
import HelloWorld from './HelloWorld.vue';
import PlayerList from './PlayerList.vue';

export default {
  name: 'PlayArea',
  components: { DoobleCard, PlayerList },
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
    setCards(cards) {
      this.cards = cards;
    },
  },
  mounted() {
    this.setRandomCards();
  },
};
</script>

<style>
.play-area {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--white);
}
</style>
