import React, { useState, useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import Finance from './components/panels/Finance/Finance';
import Research from './components/panels/Research/Research';
import Play from './components/panels/Play/Play';
import { updPaper, updAutoClickers, updMoney, updSalePrice, updStock, updWood, updStage, updEmployees, updResearch, updThinkSpeed, updPaperMakerLevel, updNotebooksResearched } from './store';

const App = (props) => {
  const [paper, updatePaper] = useState(props.paper || 0);
  const [stock, updateStock] = useState(props.stock || 0);
  const [autoClickers, updateAutoClickers] = useState(props.autoClickers || 0);
  const [money, updateMoney] = useState(props.money || 0);
  const [salePrice, updateSalePrice] = useState(props.salePrice || 0.25);
  const [wood, updateWood] = useState(props.wood === 0 ? 0 : props.wood || 1000);
  const [stage, updateStage] = useState(props.stage || 1);
  const [employees, updateEmployees] = useState(props.employees || 1);
  const [research, updateResearch] = useState(props.research || 0);
  const [thinkSpeed, updateThinkSpeed] = useState(props.thinkSpeed || 1);
  const [paperMakerLevel, updatePaperMakerLevel] = useState(props.paperMakerLevel || 1);
  const [notebooksResearched, updateNotebooksResearched] = useState(props.notebooksResearched || false);

  useEffect(() => {
    props.savePaper(paper);
    props.saveStock(stock);
    props.saveAutoClickers(autoClickers);
    props.saveMoney(money);
    props.saveSalePrice(salePrice);
    props.saveWood(wood);
    props.saveStage(stage);
    props.saveEmployees(employees);
    props.saveResearch(research);
    props.saveThinkSpeed(thinkSpeed);
    props.savePaperMakerLevel(paperMakerLevel);
    props.saveNotebooksResearched(notebooksResearched);
  }, [props, paper, stock, autoClickers, money, salePrice, wood, stage, employees, research, thinkSpeed, paperMakerLevel, notebooksResearched])


  const playData = {
    updateAutoClickers,
    updateMoney,
    updateWood,
    updatePaper,
    updateStock,
    updateStage,
    updatePaperMakerLevel,
    money,
    wood,
    stock,
    paper,
    stage,
    autoClickers,
    paperMakerLevel
  }

  const financeData = {
    updateMoney,
    updateStock,
    updateSalePrice,
    salePrice,
    notebooksResearched,
    stock,
    money,
    paper,
    wood
  }

  const researchData = {
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
  };
  const renderDevToolbar = () => {
    return <div className={'devToolbar'}>
      <label>Stage: <input type='text' value={stage} onChange={(e) => updateStage(parseInt(e.target.value) || 1)} /></label>
      <label>Paper: <input type='text' value={paper} onChange={(e) => updatePaper(parseInt(e.target.value))} /></label>
      <label>Wood: <input type='text' value={wood} onChange={(e) => updateWood(parseInt(e.target.value))} /></label>
      <label>Stock: <input type='text' value={stock} onChange={(e) => updateStock(parseInt(e.target.value))} /></label>
      <label>Money: <input type='text' value={money} onChange={(e) => updateMoney(parseInt(e.target.value))} /></label>
      <label>paperMakerLevel: <input type='text' value={paperMakerLevel} onChange={(e) => updatePaperMakerLevel(parseInt(e.target.value))} /></label>
      <label>autoClickers: <input type='text' value={autoClickers} onChange={(e) => updateAutoClickers(parseInt(e.target.value))} /></label>
      <label>thinkSpeed: <input type='text' value={thinkSpeed} onChange={(e) => updateThinkSpeed(parseInt(e.target.value))} /></label>
      <label>employees: <input type='text' value={employees} onChange={(e) => updateEmployees(parseInt(e.target.value))} /></label>
      <label>notebooksResearched: <input type='checkbox' value={notebooksResearched} onChange={(e) => updateNotebooksResearched(e.target.value)} /></label>
      <div onClick={() => {
        updateStage(1)
        updatePaper(0)
        updateWood(1000)
        updateStock(0)
        updateMoney(0)
        updatePaperMakerLevel(1)
        updateAutoClickers(0)
        updateThinkSpeed(1)
        updateEmployees(0)
        updateNotebooksResearched(false)
        updateSalePrice(0.25)
      }}>Reset</div>
    </div>
  }

  return (
    <div className="app">
      {process.env.NODE_ENV === 'development' && renderDevToolbar()}
      <div className="play">
        <Play defaults={props} play={playData} />
      </div>
      <div className={paper > 10 ? "play" : "play hidden"}>
        <Finance defaults={props} finance={financeData} />
      </div>
      <div className={stage > 1 ? "play" : "play hidden"}>
        <Research defaults={props} researchData={researchData} />
        {/* Research Center with all the researchables from research team
          QOL Researchables:
            [x] - Notebooks
            []  - Cheaper paper
            []  - Cheaper autoclickers
            []  - 
          Marketing:
            []  - Increase public interest
          Notoriety (World interest in you specifically):
            []  - Increase notoriety
          Other resource types:
            []  - Etc
          Monopolies:
            []  - View other competing companies
            []  - Sabotage other competing companies
            []  - Buy other competing companies
          Stock Market:
            []  - Buy and sell stocks
            []  - Integration with monopolies for manipulation
          Crypto
            []  - Buy and sell crypto
            []  - Integration with notoriety
            []  - Advertise / scam for pump and dumps
          High society:
            []  - Based from money/notoriety
            []  - Access to high stakes casinos
            []  - Access to insider knowledge
            []  - Influence government decisions
          World order (Helping world issues):
            []  - Climate change
            []  - Space exploration
            []  - War (?)
            []  - 
        */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    savePaper: (paper) => {
      dispatch(updPaper(paper))
    },
    saveAutoClickers: (autoClickers) => {
      dispatch(updAutoClickers(autoClickers))
    },
    saveMoney: (money) => {
      dispatch(updMoney(money))
    },
    saveSalePrice: (price) => {
      dispatch(updSalePrice(price))
    },
    saveStock: (stock) => {
      dispatch(updStock(stock))
    },
    saveWood: (wood) => {
      dispatch(updWood(wood))
    },
    saveStage: (stage) => {
      dispatch(updStage(stage))
    },
    saveEmployees: (employees) => {
      dispatch(updEmployees(employees))
    },
    saveResearch: (research) => {
      dispatch(updResearch(research))
    },
    saveThinkSpeed: (thinkSpeed) => {
      dispatch(updThinkSpeed(thinkSpeed))
    },
    savePaperMakerLevel: (paperMakerLevel) => {
      dispatch(updPaperMakerLevel(paperMakerLevel))
    },
    saveNotebooksResearched: (notebooksResearched) => {
      dispatch(updNotebooksResearched(notebooksResearched))
    }
  }};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
