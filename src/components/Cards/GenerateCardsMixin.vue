<template><span></span></template>

<script>
export default {
  computed: {
    symbols: () => {
      return [
        '🐶',
        '🐺',
        '🐱',
        '🐭',
        '🐹',
        '🐰',
        '🐸',
        '🐯',
        '🐨',
        '🐻',
        '🐷',
        '🐽',
        '🐮',
        '🐗',
        '🐵',
        '🐒',
        '🐴',
        '🐑',
        '🐘',
        '🐼',
        '🐧',
        '🐦',
        '🐤',
        '🐥',
        '🐣',
        '🐔',
        '🐍',
        '🐢',
        '🐛',
        '🐝',
        '🐜',
        '🐞',
        '🐌',
        '🐙',
        '🐚',
        '🐠',
        '🐟',
        '🐬',
        '🐳',
        '🐋',
        '🐄',
        '🐏',
        '🐀',
        '🐃',
        '🐅',
        '🐇',
        '🐉',
        '🐎',
        '🐐',
        '🐓',
        '🐕',
        '🐖',
        '🐁',
        '🐂',
        '🐲',
        '🐡',
        '🐊',
        '🐫',
        '🐪',
        '🐆',
        '🐈',
        '🐩',
      ];
    },
  },
  methods: {
    generateCards() {
      // https://www.101computing.net/the-dobble-algorithm/
      let cards = [];
      const numberOfSymbolsOnCard = 8;
      const prime = numberOfSymbolsOnCard - 1;
      const numberOfCards = prime ** 2 + prime + 1;

      // Add first set of 8 cards
      for (let i = 0; i < numberOfSymbolsOnCard; i++) {
        cards.push([1]);
        for (let j = 0; j < prime; j++) {
          cards[i].push(j + 1 + i * prime + 1);
        }
      }

      // Add the remaining sets
      for (let i = 0; i < prime; i++) {
        for (let j = 0; j < prime; j++) {
          cards.push([i + 2]);
          for (let k = 0; k < prime; k++) {
            let val = prime + 1 + prime * k + ((i * k + j) % prime) + 1; // ??
            cards[cards.length - 1].push(val);
          }
        }
      }

      // Convert from numbers to symbols
      cards = cards.map((card) => {
        return card.map((number) => {
          return this.symbols[number];
        });
      });

      // Shuffle symbols on cards
      cards = cards.map((card) => {
        return collect(card).shuffle().values();
      });

      return cards;
    },
  },
};
</script>
