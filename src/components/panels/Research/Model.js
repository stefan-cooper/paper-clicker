import { useCallback } from 'react'

export const useResearchModel = ({defaults, researchData}) => {
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

  return {
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
  }
}
