import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { updPaper, updAutoClickers, updMoney, updSalePrice } from './store';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paper: this.props.paper || 0,
      autoClickers: this.props.autoClickers || 0,
      money: this.props.money || 0,
      salePrice: this.props.salePrice || 0.25,
      selling: false
    }
  }

  saleModifier() {
    return 10000 * this.state.salePrice * Math.random()
  }

  /*
  *   Run on App Load, check if any existing auto clickers saved and add an interval for every single one
  *   Then start the infinite selling loop
  */
  componentDidMount() {
    for (var i=0; i < this.state.autoClickers; i++) {
      window.setInterval(() => this.clickerAdd(), 1000)
    }
    this.setState({selling: true})
    window.setTimeout(() => this.sellPaper(), this.saleModifier())
  }

  // Add paper to the paper total
  clickerAdd() {
    this.setState({paper: this.state.paper + 1}, () => {
      this.props.updatePaper(this.state.paper)
    })
    if (!this.state.selling) {
      this.setState({selling: true})
      window.setTimeout(() => this.sellPaper(), this.saleModifier())
    }
  }

  // Add a new auto clicker
  autoClickerAdd() {
    this.setState({autoClickers: this.state.autoClickers + 1}, () => {
      this.props.updateAutoClickers(this.state.autoClickers)
    })
    window.setInterval(() => this.clickerAdd(), 1000)
  }

  // Sell paper infinite loop on timeout
  sellPaper() {
    if (this.state.paper > 0) {
      this.setState({paper: this.state.paper - 1, money: this.state.money + this.state.salePrice}, () => {
        this.props.updateMoney(this.state.money)
      })
      window.setTimeout(() => this.sellPaper(), this.saleModifier())
    } else {
      this.setState({selling: false})
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
      <div className='clicker' onClick={() => this.clickerAdd()}>
        Make Paper
      </div>
    )
  }

  renderAutoClickButton() {
    return (
      <div className='clicker' onClick={() => this.autoClickerAdd()}>
        Buy Auto Paper Maker
      </div>
    )
  }

  renderSaleButtons() {
    return (
      <div className='saleButtons'>
        <div className='clicker' onClick={() => this.increaseSalePrice()}>
          Increase Price
        </div>
        <div className='clicker' onClick={() => this.decreaseSalePrice()}>
          Decrease Price
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
          Money: £{this.state.money.toFixed(2)}
        </p>
        <p className='clicks'>
          Selling Price: £{this.state.salePrice.toFixed(2)}
        </p>
        <p className='clicks'>
          Paper Per Second: {this.state.autoClickers}
        </p>
      </div>      
    )
  }

  render() {
    return (
      <div className="app">
        <div className="playSide">
          {this.renderClickButton()}
          {/*this.renderAutoClickButton()*/}
          {this.renderSaleButtons()}
        </div>
        <div className="statSide">
          {this.renderPaper()}
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
    }
  }};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
