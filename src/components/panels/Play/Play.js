import React from 'react';
import { Button } from '../../elements';
import {usePlayModel} from './Model'

const Play = ({defaults, play}) => {

  const {
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
  } = usePlayModel({defaults, play});

  const renderClickButton = () => {
    return <Button
      text='Make Paper'
      onClick={() => click()} 
    />
  }

  const renderAutoClickButton = () => {
    return <Button 
      text='Add Auto Clicker (£25)' 
      disabled={money < 25} 
      onClick={() => autoClickerAdd()}
    />
  }

  const renderChopWoodButton = () => {
    return <Button
      text={'Chop Wood (£50)'}
      disabled={money < 50}
      onClick={() => chopWood()}
    />
  }

  const renderResearchTeamButton = () => {
    return <Button 
      text={'Research Team (£1000)'}
      disabled={money < 1000}
      onClick={() => researchTeam()}
    />
  }

  return (
    <>
      <div>
        <p>Total Paper: {paper}</p>
        <p>Paper Per Second: {autoClickers}</p>
        <p>Remaining Wood: {wood.toFixed(2)}</p>
        {renderClickButton()}
        {paper > 100 ? renderAutoClickButton() : ''}
        {paper > 500 ? renderChopWoodButton() : ''}
        {(paper > 2000 && stage === 1) ? renderResearchTeamButton() : ''}
      </div>
    </>      
  )
}

export default Play;
