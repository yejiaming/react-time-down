import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
/**
 * 该组件是用于倒计时的组件
 */
export class TimeDown extends Component {
  constructor(props) {
    super(props)
    this.timer = null;
    this.state = {
      date: this.formatDate(props.date),
      timeString: ''
    }
  }
  componentWillMount() {
    this.intervalTimeDown();
  }
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
  // 格式化时间成时间戳
  formatDate(date) {
    date = date == undefined ? new Date() : date;
    // 目的是解决IOS时间问题，但出现2006-07-02这样的需要做解析
    if (typeof date == 'string' && date.indexOf('T') < 0) {
      date = date.replace(/\-/g, "/");
    }
    date = (typeof date == 'number' || typeof date == 'string') ? new Date(date) : date;
    return new Date(date).getTime();
  }
  // 将时间差转换成，年，月，日，天
  getFomatDate(diffTime) {
    // 计算出天数
    var days = Math.floor(diffTime / (24 * 3600 * 1000))
    //计算出小时数  
    var leave1 = diffTime % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数  
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数  
    var leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数  
    var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数  
    var seconds = Math.round(leave3 / 1000)
    return `${days}天${hours}小时${minutes}分钟${seconds}秒`;
  }

  intervalTimeDown() {
    let { date } = this.state;
    this.timer = setInterval(() => {
      let startDate = new Date().getTime();
      let diffTime = parseInt(date - startDate);
      diffTime = diffTime > 0 ? diffTime : 0;
      let str = this.getFomatDate(diffTime);
      this.setState({
        timeString: str
      })
    }, 1000);
  }

  render() {
    let { className = '' } = this.props;
    let { timeString } = this.state;
    return (
      <span className={"time-down " + className}>
        {timeString}
      </span>
    )
  }
}

// 设置参数类型
TimeDown.propTypes = {
  className: PropTypes.string,        // 自定义样式名称
  date: PropTypes.instanceOf(Date),   // 截止时间，必须是日期格式的
  separate: PropTypes.array,          // 天，小时，分钟，秒隔符
}

// 设置参数默认值
TimeDown.defaultProps = {
  date: new Date(),
  className: '',
  separate: ['天', '小时', '分钟', '秒']
}