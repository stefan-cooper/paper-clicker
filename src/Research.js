import React, { useCallback } from 'react';
import './App.scss';

const Research = ({defaults, researchData}) => {

  let {
    updateEmployees,
    updateMoney,
    updateThinkSpeed,
    updatePaperMakerLevel,
    updateResearch,
    updateNotebooksResearched,
    employees,
    money,
    thinkSpeed,
    research,
    paperMakerLevel,
    stage,
    notebooksResearched
  } = researchData;

  const think = useCallback(() => {
    updateResearch(research + 1);
  }, [research, updateResearch])

  const thinker = useCallback(() => {
    const interval = window.setInterval(() => think(),
      (1000 / Math.pow(thinkSpeed, employees + thinkSpeed)))

    return () => {
      clearInterval(interval)
    }
  }, [think, thinkSpeed, employees])

  const hireEmployees = () => {
    updateEmployees(employees + 1);
    updateMoney(money - 500);
    thinker();
  }
      
  const trainEmployees = () => {
    updateThinkSpeed(thinkSpeed + 1);
    updateMoney(money - 1000);
    thinker();
  }

  const upgradePaperMaker = () => {
    updatePaperMakerLevel(paperMakerLevel + 1)
    updateResearch(research - (Math.pow(paperMakerLevel,2) * 500))
  }

  const researchNotebooks = () => {
    updateResearch(research - 1000);
    updateNotebooksResearched(true);
  }

  const renderResearchNotebooks = () => {
    return (
      <div className={research > 1000 ? 'clicker' : 'clicker disabled'} onClick={research > 1000 ? () => researchNotebooks() : ''}>
        Research Notebooks (1000 Research)
      </div>
    )
  }

  const renderUpgradePaperMaker = () => {
    return (
      <div className={research > Math.pow(paperMakerLevel,2) * 500 ? 'clicker' : 'clicker disabled'} onClick={research > Math.pow(paperMakerLevel,2) * 500 ? () => upgradePaperMaker() : ''}>
        Upgrade Paper Makers ({Math.pow(paperMakerLevel,2) * 500} Research)
      </div>
    )
  }

  return (
    <div>
      <p className='clicks'>
        Research: {research}
      </p>
      <p className='clicks'>
        Employees: {employees}
      </p>
      <p className='clicks'>
        Think Speed: {thinkSpeed}
      </p>
      {stage > 1 ?
        <div> 
          <div className={money >= 500 ? 'clicker' : 'clicker disabled'} onClick={money >= 500 ? () => hireEmployees() : ''}>
          Hire Employees (£500)
          </div>
          <div className={money >= 1000 ? 'clicker' : 'clicker disabled'} onClick={money >= 1000 ? () => trainEmployees() : ''}>
            Train Employees (£1000)
          </div>
        </div>
      : ''}
      {renderUpgradePaperMaker()}
      {notebooksResearched ? '' : renderResearchNotebooks()}
    </div>
  )
}

export default Research;
