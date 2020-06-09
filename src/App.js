import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0
    }
  }

  renderClickButton() {
    return (
      <div className='clicker'>
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

const mapDispatchToProps = (dispatch) => {return};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
