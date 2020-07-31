import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { updPaper, updAutoClickers, updMoney, updSalePrice, updStock, updWood, updStage, updEmployees, updResearch, updThinkSpeed, updPaperMakerLevel } from './store';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paper: this.props.paper || 0,
      stock: this.props.stock || 0,
      autoClickers: this.props.autoClickers || 0,
      money: this.props.money || 0,
      salePrice: this.props.salePrice || 0.25,
      interest: 0.08/this.props.salePrice,
      wood: this.props.wood === 0 ? 0 : this.props.wood || 1000,
      stage: this.props.stage || 1,
      employees: this.props.employees || 1,
      research: this.props.research || 0,
      thinkSpeed: this.props.thinkSpeed || 1,
      paperMakerLevel: this.props.paperMakerLevel || 1
    }
  }

  /*
  *   Run on App Load, check if any existing auto clickers saved and add an interval for every single one
  *   Then start the infinite selling loop
  */
  componentDidMount() {
    if (this.state.autoClickers > 0) {
      // Simulate level of auto clickers from previous save
      window.setInterval(() => this.click(), (1000 / this.state.paperMakerLevel) / this.state.autoClickers)
    }
    if (this.state.stage > 1) {
      this.updateThinker()
    }
    this.timedEvents()
  }

  // Interest in paper, more things can be added to this when we add more boosts and marketing etc.
  calculateInterest() {
    this.setState({interest: 0.08 / this.state.salePrice})
  }

  // These events are run every tenth of a second
  timedEvents() {
    window.setInterval(() => {
      this.calculateInterest()
      if (Math.random() < 0.08/this.state.salePrice) {
        this.sellPaper(Math.floor( Math.random() / this.state.salePrice ))
      }
    }, 100)
  }

  // Add paper to the paper total
  click() {
    if (this.state.wood > 0) {
      var randomWood = Math.random()
      this.setState({paper: this.state.paper + 1, stock: this.state.stock + 1, wood: this.state.wood - randomWood > 0 ? this.state.wood - randomWood : 0}, () => {
        this.props.updatePaper(this.state.paper)
        this.props.updateStock(this.state.stock)
        this.props.updateWood(this.state.wood)
      })
    }
  }

  think() {
    this.setState({research: this.state.research + 1}, () => {
      this.props.updateResearch(this.state.research)
    })
  }

  updateThinker() {
    if (this.timerId) {
      window.clearInterval(this.timerId)
    }
    this.timerId = window.setInterval(() => {this.think()}
      ,(1000 / Math.pow(this.state.thinkSpeed, this.state.employees + this.state.thinkSpeed))
    )
  }

  // Add a new auto clicker
  autoClickerAdd() {
    this.setState({autoClickers: this.state.autoClickers + 1, money: this.state.money - 25}, () => {
      this.props.updateAutoClickers(this.state.autoClickers)
      this.props.updateMoney(this.state.money)
    })
    // After adding new clicker, add manual interval to the timer
    window.setInterval(() => this.click(), 1000 / this.state.paperMakerLevel)
  }

  // Add more wood
  chopWood() {
    this.setState({wood: this.state.wood + 800, money: this.state.money - 50}, () => {
      this.props.updateWood(this.state.wood)
      this.props.updateMoney(this.state.money)
    })
    window.setInterval(() => this.click(), 1000)
  }

  // Sell paper
  sellPaper(selling) {
    var toBeSold = selling > 10 ? 10 : selling
    if (this.state.stock > 0) {
        this.setState({stock: toBeSold < this.state.stock ? this.state.stock - toBeSold : 0, 
        money: toBeSold < this.state.stock ? this.state.money + (this.state.salePrice * toBeSold) 
        : this.state.money + (this.state.salePrice * toBeSold - (((this.state.stock - toBeSold) * -1) * this.state.salePrice))}, () => {
          this.props.updateMoney(this.state.money)
          this.props.updateStock(this.state.stock)
        })
      }
  }

  hireEmployees() {
    this.setState({employees: this.state.employees + 1, money: this.state.money - 500}, () => {
      this.props.updateEmployees(this.state.employees)
      this.props.updateMoney(this.state.money)
      this.updateThinker()
    })
  }

  trainEmployees() {
    this.setState({thinkSpeed: this.state.thinkSpeed + 1, money: this.state.money - 1000}, () => {
      this.props.updateThinkSpeed(this.state.thinkSpeed)
      this.props.updateMoney(this.state.money)
      this.updateThinker()
    })
  }

  // Increase sale price
  increaseSalePrice() {
    this.setState({salePrice: this.state.salePrice + 0.01}, () => {
      this.props.updateSalePrice(this.state.salePrice)
    })
  }

  // Decrease Sale Price
  decreaseSalePrice() {
    if (this.state.salePrice > 0.01) {
      this.setState({salePrice: this.state.salePrice - 0.01}, () => {
        this.props.updateSalePrice(this.state.salePrice)
      })
    }
  }

  upgradePaperMaker() {
    this.setState({research: this.state.research - (Math.pow(this.state.paperMakerLevel,2) * 500), paperMakerLevel: this.state.paperMakerLevel + 1}, () => {
      this.props.updatePaperMakerLevel(this.state.paperMakerLevel)
      this.props.updateResearch(this.state.research)
    })
  }

  renderClickButton() {
    return (
      <div className='clicker' onClick={() => this.click()}>
        Make Paper
      </div>
    )
  }

  renderAutoClickButton() {
    return (
      <div className={this.state.money > 25 ? 'clicker' : 'clicker disabled'} onClick={this.state.money > 25 ? () => this.autoClickerAdd() : ''}>
        Buy Auto Paper Maker (£25)
      </div>
    )
  }

  renderChopWoodButton() {
    return (
      <div className={this.state.money > 50 ? 'clicker' : 'clicker disabled'} onClick={this.state.money > 50 ? () => this.chopWood() : ''}>
        Chop Down Wood (£50)
      </div>
    )
  }

  renderResearchTeamButton() {
    return (
      <div className={this.state.money > 1000 ? 'clicker' : 'clicker disabled'} onClick={this.state.money > 1000 ? () => {
        this.setState({stage: 2, money: this.state.money - 1000}, () => {
          this.props.updateStage(this.state.stage)
          this.props.updateMoney(this.state.money)
        })
      } : ''}>
        Buy Research Team (£1000)
      </div>
    )
  }

  renderUpgradePaperMaker() {
    return (
      <div className={this.state.research > Math.pow(this.state.paperMakerLevel,2) * 500 ? 'clicker' : 'clicker disabled'} onClick={this.state.research > Math.pow(this.state.paperMakerLevel,2) * 500 ? () => this.upgradePaperMaker() : ''}>
        Upgrade Paper Makers ({Math.pow(this.state.paperMakerLevel,2) * 500} Research)
      </div>
    )
  }

  renderSaleButtons() {
    return (
      <div className='saleButtons'>
        <div className='clicker' onClick={() => this.decreaseSalePrice()}>
          Decrease Price
        </div>
        <div className='clicker' onClick={() => this.increaseSalePrice()}>
          Increase Price
        </div>
      </div>
    )
  }

  renderPlaySection() {
    return (
      <div>
        <p className='clicks'>
          Total Paper: {this.state.paper}
        </p>
        <p className='clicks'>
          Paper Per Second: {this.state.autoClickers}
        </p>
        <p className='clicks'> 
          Remaining Wood: {this.state.wood.toFixed(2)}
        </p>
        {this.renderClickButton()}
        {this.state.paper > 100 ? this.renderAutoClickButton() : ''}
        {this.state.paper > 500 ? this.renderChopWoodButton() : ''}
        {this.state.paper > 2000 && this.state.stage === 1 ? this.renderResearchTeamButton() : ''}
        {this.state.stage > 1 ?
          <div> 
            <div className={this.state.money >= 500 ? 'clicker' : 'clicker disabled'} onClick={this.state.money >= 500 ? () => this.hireEmployees() : ''}>
            Hire Employees (£500)
            </div>
            <div className={this.state.money >= 1000 ? 'clicker' : 'clicker disabled'} onClick={this.state.money >= 1000 ? () => this.trainEmployees() : ''}>
              Train Employees (£1000)
            </div>
          </div>
          : ''}
      </div>      
    )
  }

  renderFinancesSection() {
    return (
      <div>
        <p className='clicks'>
        Stock: {this.state.stock}
        </p>
        <p className='clicks'>
          Money: £{this.state.money.toFixed(2)}
        </p>
        <p className='clicks'>
          Public Interest: {(this.state.interest*100).toFixed(2)}%
        </p>
        <p className='clicks'>
          Selling Price: £{this.state.salePrice.toFixed(2)}
        </p>
        {this.renderSaleButtons()}
      </div>
    )
  }

  renderResearchSection() {
    return (
      <div>
        <p className='clicks'>
          Research: {this.state.research}
        </p>
        <p className='clicks'>
          Employees: {this.state.employees}
        </p>
        <p className='clicks'>
          Think Speed: {this.state.thinkSpeed}
        </p>
        {this.renderUpgradePaperMaker()}
      </div>
    )
  }

  render() {
    return (
      <div className="app">
        <div className={this.state.paper > 10 ? "finances" : "finances hidden"}>
          {this.renderFinancesSection()}
        </div>
        <div className="play">
          {this.renderPlaySection()}
        </div>
        <div className={this.state.stage > 1 ? "researchTeam" : "researchTeam hidden"}>
          {this.renderResearchSection()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePaper: (paper) => {
      dispatch(updPaper(paper))
    },
    updateAutoClickers: (autoClickers) => {
      dispatch(updAutoClickers(autoClickers))
    },
    updateMoney: (money) => {
      dispatch(updMoney(money))
    },
    updateSalePrice: (price) => {
      dispatch(updSalePrice(price))
    },
    updateStock: (stock) => {
      dispatch(updStock(stock))
    },
    updateWood: (wood) => {
      dispatch(updWood(wood))
    },
    updateStage: (stage) => {
      dispatch(updStage(stage))
    },
    updateEmployees: (employees) => {
      dispatch(updEmployees(employees))
    },
    updateResearch: (research) => {
      dispatch(updResearch(research))
    },
    updateThinkSpeed: (thinkSpeed) => {
      dispatch(updThinkSpeed(thinkSpeed))
    },
    updatePaperMakerLevel: (paperMakerLevel) => {
      dispatch(updPaperMakerLevel(paperMakerLevel))
    }
  }};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
