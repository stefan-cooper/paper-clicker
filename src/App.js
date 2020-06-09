import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { update } from './store';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: this.props.clicks || 0
    }
  }

  clickerAdd() {
    this.setState({clicks: this.state.clicks + 1}, () => {
      this.props.updateClicks(this.state.clicks)
    })
    
  }

  renderClickButton() {
    return (
      <div className='clicker' onClick={() => this.clickerAdd()}>
        Click for Clicks
      </div>
    )
  }

  renderClicks() {
    return (
      <p className='clicks'>
        {this.state.clicks}
      </p>
    )
  }

  render() {
    return (
      <div className="app">
        {this.renderClicks()}
        {this.renderClickButton()}
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
    }
  }};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
