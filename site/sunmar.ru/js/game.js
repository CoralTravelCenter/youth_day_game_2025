import {cardGenerator, iconsGenerator} from "./utils/cardGenerator";
import {COUNTRIES, COUNTRIES_PAIRS, ICONS} from "./gameData";
import {hostReactAppReady, vimeoAutoPlay} from "../../common/js/usefuls";
import {endGameBtnInsert, goToGame} from "./utils/screenManager";
import {animateCardFields} from "./utils/animations";

(async () => {
  await hostReactAppReady();
  vimeoAutoPlay()
  const questionContainer = document.querySelector('.screen--game .game-board__question');
  const associationContainer = document.querySelector('.screen--game .game-board__associations');
  const iconsContainer = document.querySelector('.screen--game .game-board__icons');
  cardGenerator(COUNTRIES, questionContainer)
  cardGenerator(COUNTRIES_PAIRS, associationContainer)
  iconsGenerator(ICONS, iconsContainer)

  const goToGameBtn = document.querySelector('.btn--start-game');
  goToGameBtn.addEventListener('click', (e) => {
    goToGame(e.currentTarget)
    animateCardFields()
  })


  setTimeout(() => endGameBtnInsert(), 600000)
})()
