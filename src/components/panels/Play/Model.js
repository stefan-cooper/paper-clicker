import {useEffect} from 'react'

export const usePlayModel = ({defaults, play}) => {

  let {
    updateAutoClickers,
    updateMoney,
    updateWood,
    updatePaper,
    updateStock,
    updateStage,
    // updatePaperMakerLevel,
    money,
    wood,
    stock,
    paper,
    stage,
    autoClickers,
    paperMakerLevel
  } = play;

  /*
  *   Run on App Load, check if any existing auto clickers saved and add an interval for every single one
  *   Then start the infinite selling loop
  */
  useEffect(() => {
    let interval;
    if (autoClickers > 0) {
      // Simulate level of auto clickers from previous save
      interval = window.setInterval(() => click(), (1000 / paperMakerLevel) / autoClickers)
    }

    return () => {
      if (interval) clearInterval(interval)
    };
  }, [autoClickers, paperMakerLevel, paper, stock, wood]);

  // Add a new auto clicker
  const autoClickerAdd = () => {
    updateAutoClickers(autoClickers + 1);
    updateMoney(money-25);
    // After adding new clicker, add manual interval to the timer
    window.setInterval(() => click(), 1000 / paperMakerLevel)
  }

  // Add more wood
  const chopWood = () => {
    updateWood(wood + 800);
    updateMoney(money - 50);
  }

  // Add paper to the paper total
  const click = () => {
    if (wood > 0) {
      var randomWood = wood - Math.random()
      updatePaper(paper+1);
      updateStock(stock+1);
      updateWood(randomWood > 0 ? randomWood : 0);
    }
  }

  const researchTeam = () => {
    updateStage(2)
    updateMoney(money - 1000)
  }

  return {
    // Play 
    click,
    chopWood,
    autoClickerAdd,
    researchTeam,

    // Data
    paper,
    stage,
    wood,
    autoClickers,
    money
  }
}