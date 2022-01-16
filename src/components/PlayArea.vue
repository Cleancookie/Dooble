<template>
  <div class="play-area">
    <DoobleCard v-for="card in cards" :card="card" @clicked="symbolClicked" />
  </div>
  <PlayerList
    :cards="cards"
    @newCards="setCards"
    :me="me"
    :players="players"
    @setMe="setMe"
    @setPlayers="setPlayers"
  />
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
  emits: ['increaseScore', 'foundMatch'],
  data: function () {
    return {
      cards: [],
      me: {
        id: null,
        name: 'Me',
        host: false,
        score: 0,
      },
      players: [],
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
      // Game logic check
      console.log(`Clicked on ${symbol}`);
      if (this.checkOthersForSymbol(symbol).length > 1) {
        this.me.score++;
        this.$emit('foundMatch');
      } else {
        this.me.score--;
      }
      this.setRandomCards();
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
    setMe(me) {
      this.me = me;
    },
    setPlayers(players) {
      this.players = players;
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
  background-color: var(--bg);
}
</style>
