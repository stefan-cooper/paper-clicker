import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { updPaper, updAutoClickers, updMoney, updSalePrice, updStock, updWood } from './store';

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
      wood: this.props.wood || 1000
    }
  }

  /*
  *   Run on App Load, check if any existing auto clickers saved and add an interval for every single one
  *   Then start the infinite selling loop
  */
  componentDidMount() {
    if (this.state.autoClickers > 0) {
      window.setInterval(() => this.click(), 1000 / this.state.autoClickers)
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

  // Add a new auto clicker
  autoClickerAdd() {
    this.setState({autoClickers: this.state.autoClickers + 1, money: this.state.money - 25}, () => {
      this.props.updateAutoClickers(this.state.autoClickers)
      this.props.updateMoney(this.state.money)
    })
    window.setInterval(() => this.click(), 1000)
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

  renderClickButton() {
    return (
      <div className='clicker' onClick={() => this.click()}>
        Make Paper
      </div>
    )
  }

  renderAutoClickButton() {
    return (
      <div className={this.state.money > 25 ? 'clicker' : 'clicker-disabled'} onClick={this.state.money > 25 ? () => this.autoClickerAdd() : ''}>
        Buy Auto Paper Maker (£25)
      </div>
    )
  }

  renderChopWoodButton() {
    return (
      <div className={this.state.money > 50 ? 'clicker' : 'clicker-disabled'} onClick={this.state.money > 50 ? () => this.chopWood() : ''}>
        Chop Down More Wood (£50)
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

  renderPaper() {
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

  render() {
    return (
      <div className="app">
        <div className="finances">
          {this.renderFinancesSection()}
        </div>
        <div className="play">
          {this.renderPaper()}
          {this.renderClickButton()}
          {this.state.paper > 100 ? this.renderAutoClickButton() : ''}
          {this.state.paper > 500 ? this.renderChopWoodButton() : ''}
        </div>
        <div className="researchTeam">

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
    }
  }};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
