import React, { useState, useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import Finance from './Finance';
import Research from './Research';
import Play from './Play';
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

  return (
    <div className="app">
      <div className={paper > 10 ? "finances" : "finances hidden"}>
        <Finance defaults={props} finance={financeData} />
      </div>
      <div className="play">
        <Play defaults={props} play={playData} />
      </div>
      <div className={stage > 1 ? "researchTeam" : "researchTeam hidden"}>
        <Research defaults={props} researchData={researchData} />
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
