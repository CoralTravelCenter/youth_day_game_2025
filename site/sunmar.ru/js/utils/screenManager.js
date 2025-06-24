export function goToGame(currentScreen) {
  const gameScreen = document.querySelector('.game-screen');
  const video = document.querySelector('.vimeo-video-box');

  currentScreen.closest('.screen').style.display = 'none';
  gameScreen.style.display = 'flex';
  video.style.display = 'none';

  ym(215233, 'reachGoal', 'den-molodezhi-start')
}

export function endGameBtnInsert() {
  const endGameBtn = document.querySelector('.game-screen .prime-btn');
  endGameBtn.style.display = 'flex';
}
