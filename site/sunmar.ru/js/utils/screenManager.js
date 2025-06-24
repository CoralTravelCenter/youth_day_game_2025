export function goToScreen(screenName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    if (screen.classList.contains(`screen--${screenName}`)) {
      screen.style.display = 'flex';
    } else {
      screen.style.display = 'none';
    }
  });
}

export function goToGame(currentScreen) {
  goToScreen('game');
  const video = document.querySelector('.vimeo-video-box');
  if (video) {
    video.style.display = 'none';
  }
}

export function goToIntro() {
  goToScreen('intro');
}

export function goToFinal() {
  goToScreen('final');
}

export function endGameBtnInsert() {
  const endGameBtn = document.querySelector('.screen--game .prime-btn');
  if (endGameBtn) {
    endGameBtn.style.display = 'flex';
  }
}
