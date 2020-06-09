import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { update, updateAC } from './store';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: this.props.clicks || 0,
      autoClickers: this.props.autoClickers || 0
    }
  }

  componentDidMount() {
    for (var i=0; i <= this.state.autoClickers; i++) {
      window.setInterval(() => this.clickerAdd(), 1000)
    }
  }

  clickerAdd() {
    this.setState({clicks: this.state.clicks + 1}, () => {
      this.props.updateClicks(this.state.clicks)
    })
  }

  autoClickerAdd() {
    this.setState({autoClickers: this.state.autoClickers + 1}, () => {
      this.props.updateAutoClickers(this.state.autoClickers)
    })
    window.setInterval(() => this.clickerAdd(), 1000)
  }

  renderClickButton() {
    return (
      <div className='clicker' onClick={() => this.clickerAdd()}>
        Click for Clicks
      </div>
    )
  }

  renderAutoClickButton() {
    return (
      <div className='clicker' onClick={() => this.autoClickerAdd()}>
        Auto Clicker
      </div>
    )
  }

  renderClicks() {
    return (
      <div>
        <p className='clicks'>
          Clicks: {this.state.clicks}
        </p>
        <p className='clicks'>
          Clicks Per Second: {this.state.autoClickers}
        </p>
      </div>      
    )
  }

  render() {
    return (
      <div className="app">
        <div className="playSide">
          
          {this.renderClickButton()}
          {this.renderAutoClickButton()}
        </div>
        <div className="statSide">
          {this.renderClicks()}
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
    updateClicks: (clicks) => {
      dispatch(update(clicks))
    },
    updateAutoClickers: (autoClickers) => {
      dispatch(updateAC(autoClickers))
    }
  }};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
