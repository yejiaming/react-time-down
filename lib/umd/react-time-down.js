(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (factory((global.ReactTimeDown = {}),global.React,global.PropTypes));
}(this, (function (exports,React,PropTypes) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".time-down {\n  font-size: 3.2vw;\n}\n";
  styleInject(css);

  /**
   * 该组件是用于倒计时的组件
   */

  var TimeDown =
  /*#__PURE__*/
  function (_Component) {
    _inherits(TimeDown, _Component);

    function TimeDown(props) {
      var _this;

      _classCallCheck(this, TimeDown);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeDown).call(this, props));
      _this.timer = null;
      _this.state = {
        date: _this.formatDate(props.date),
        timeString: ''
      };
      return _this;
    }

    _createClass(TimeDown, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.intervalTimeDown();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.clearInterval(this.timer);
      } // 格式化时间成时间戳

    }, {
      key: "formatDate",
      value: function formatDate(date) {
        date = date == undefined ? new Date() : date; // 目的是解决IOS时间问题，但出现2006-07-02这样的需要做解析

        if (typeof date == 'string' && date.indexOf('T') < 0) {
          date = date.replace(/\-/g, "/");
        }

        date = typeof date == 'number' || typeof date == 'string' ? new Date(date) : date;
        return new Date(date).getTime();
      } // 将时间差转换成，年，月，日，天

    }, {
      key: "getFomatDate",
      value: function getFomatDate(diffTime) {
        // 计算出天数
        var days = Math.floor(diffTime / (24 * 3600 * 1000)); //计算出小时数  

        var leave1 = diffTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数  

        var hours = Math.floor(leave1 / (3600 * 1000)); //计算相差分钟数  

        var leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数  

        var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差秒数

        var leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数  

        var seconds = Math.round(leave3 / 1000);
        return "".concat(days, "\u5929").concat(hours, "\u5C0F\u65F6").concat(minutes, "\u5206\u949F").concat(seconds, "\u79D2");
      }
    }, {
      key: "intervalTimeDown",
      value: function intervalTimeDown() {
        var _this2 = this;

        var date = this.state.date;
        this.timer = setInterval(function () {
          var startDate = new Date().getTime();
          var diffTime = parseInt(date - startDate);
          diffTime = diffTime > 0 ? diffTime : 0;

          var str = _this2.getFomatDate(diffTime);

          _this2.setState({
            timeString: str
          });
        }, 1000);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props$className = this.props.className,
            className = _this$props$className === void 0 ? '' : _this$props$className;
        var timeString = this.state.timeString;
        return React__default.createElement("span", {
          className: "time-down " + className
        }, timeString);
      }
    }]);

    return TimeDown;
  }(React.Component); // 设置参数类型

  TimeDown.propTypes = {
    className: PropTypes.string,
    // 自定义样式名称
    date: PropTypes.instanceOf(Date),
    // 截止时间，必须是日期格式的
    separate: PropTypes.array // 天，小时，分钟，秒隔符
    // 设置参数默认值

  };
  TimeDown.defaultProps = {
    date: new Date(),
    className: '',
    separate: ['天', '小时', '分钟', '秒']
  };

  exports.TimeDown = TimeDown;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
