import React from 'react';
import { Button } from '../../elements';
import { useResearchModel } from './Model';

const Research = ({defaults, researchData}) => {
  const {
    // Actions
    hireEmployees,
    trainEmployees,
    upgradePaperMaker,
    researchNotebooks,

    // Data
    employees,
    money,
    thinkSpeed,
    research,
    paperMakerLevel,
    stage,
    notebooksResearched
  } = useResearchModel({defaults, researchData});


  const renderResearchNotebooks = () => {
    return <Button
      text={'Research Notebooks (1000 Research)'}
      disabled={research < 1000}
      onClick={() => researchNotebooks()}
    />
  }

  const renderUpgradePaperMaker = () => {
    return <Button
      text={'Upgrade Paper Maker (1000 Research)'}
      disabled={research < Math.pow(paperMakerLevel,2) * 500}
      onClick={() => upgradePaperMaker()}
    />
  }

  return (
    <div>
      <p>Research: {research}</p>
      <p>Employees: {employees}</p>
      <p>Think Speed: {thinkSpeed}</p>
      {stage > 1 ?
        <>
          <Button
            text={'Hire Employees (£500)'}
            disabled={money < 500}
            onClick={() => hireEmployees()}
          />
          <Button
            text={'Train Employees (£1000)'}
            disabled={money < 1000}
            onClick={() => trainEmployees()}
          />
        </>
      : ''}
      {renderUpgradePaperMaker()}
      {notebooksResearched ? '' : renderResearchNotebooks()}
    </div>
  )
}

export default Research;
