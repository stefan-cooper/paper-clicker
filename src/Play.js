import React, { useEffect } from 'react';

const Play = ({defaults, play}) => {

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

  const renderClickButton = () => {
    return (
      <div className='clicker' onClick={() => click()}>
        Make Paper
      </div>
    )
  }

  const renderAutoClickButton = () => {
    return (
      <div className={money > 25 ? 'clicker' : 'clicker disabled'} onClick={money > 25 ? () => autoClickerAdd() : ''}>
        Buy Auto Paper Maker (£25)
      </div>
    )
  }

  const renderChopWoodButton = () => {
    return (
      <div className={money > 50 ? 'clicker' : 'clicker disabled'} onClick={money > 50 ? () => chopWood() : ''}>
        Chop Down Wood (£50)
      </div>
    )
  }

  const renderResearchTeamButton = () => {
    return (
      <div className={money > 1000 ? 'clicker' : 'clicker disabled'} 
      onClick={money > 1000 ? () => {
        updateStage(2)
        updateMoney(money - 1000)} : ''}
      >
        Buy Research Team (£1000)
      </div>
    )
  }

  return (
    <div>
      <p className='clicks'>
        Total Paper: {paper}
      </p>
      <p className='clicks'>
        Paper Per Second: {autoClickers}
      </p>
      <p className='clicks'> 
        Remaining Wood: {wood.toFixed(2)}
      </p>
      {renderClickButton()}
      {paper > 100 ? renderAutoClickButton() : ''}
      {paper > 500 ? renderChopWoodButton() : ''}
      {paper > 2000 && stage === 1 ? renderResearchTeamButton() : ''}
    </div>      
  )
}

export default Play;
