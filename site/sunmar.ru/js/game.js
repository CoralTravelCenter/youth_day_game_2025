import {cardGenerator, iconsGenerator} from "./utils/cardGenerator";
import {COUNTRIES, COUNTRIES_PAIRS, ICONS} from "./gameData";
import {hostReactAppReady, vimeoAutoPlay} from "../../common/js/usefuls";
import {endGameBtnInsert, goToFinal, goToGame} from "./utils/screenManager";
import {animateCardFields} from "./utils/animations";
import {resetGame} from "./utils/handleCardClick";

(async () => {
  await hostReactAppReady();
  vimeoAutoPlay()
  const questionContainer = document.querySelector('.screen--game .game-board__question');
  const associationContainer = document.querySelector('.screen--game .game-board__associations');
  const iconsContainer = document.querySelector('.screen--game .screen__visual');
  cardGenerator(COUNTRIES, questionContainer)
  cardGenerator(COUNTRIES_PAIRS, associationContainer)
  iconsGenerator(ICONS, iconsContainer)

  const goToGameBtn = document.querySelector('.btn--start-game');
  goToGameBtn.addEventListener('click', (e) => {
    goToGame(e.currentTarget)
    animateCardFields()
    ym(215233, 'reachGoal', 'den-molodezhi-start')
    setTimeout(() => endGameBtnInsert(), 300000)
  })

  const reset = document.querySelector('.game-reset');
  reset.addEventListener('click', () => {
    resetGame();
    ym(215233, 'reachGoal', 'den-molodezhi-final', {'click': 'play_again'})
  });
  const loose = document.querySelector('.loose');
  loose.addEventListener('click', (e) => {
    goToFinal()
    ym(215233, 'reachGoal', 'den-molodezhi-skip')
  })

  const chooseTour = document.querySelector('.choose-tour');
  chooseTour.addEventListener('click', (e) => {
    e.preventDefault();
    ym(215233, 'reachGoal', 'den-molodezhi-final', {'click': 'select_tour'})
  })
})()
