export default function checkPair(card1, card2) {
  if (!card1 || !card2) return false;
  return card1.dataset.pairId === card2.dataset.pairId;
}
