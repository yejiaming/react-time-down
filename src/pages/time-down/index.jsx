import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TimeDown } from '@components';
// import { TimeDown } from 'react-time-down';
require('./style.less');

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }
  render() {
    return (
      <div className='App' key="app">
        双十一倒计时：<TimeDown date={new Date(2018,10,11)} />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

// react-hot-loader
if (module.hot) {
  module.hot.accept();
}