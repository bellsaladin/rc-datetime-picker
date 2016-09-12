/*
 * rc-datetime-picker v0.1.0
 * https://github.com/AllenWooooo/rc-datetime-picker
 *
 * (c) 2016 Allen Wu
 * License: MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var classNames = _interopDefault(require('classnames/bind'));
var blacklist = _interopDefault(require('blacklist'));
var moment = _interopDefault(require('moment'));
var ReactSlider = _interopDefault(require('react-slider'));
var reactDom = require('react-dom');

var WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var range = function (start, end) {
  var length = Math.max(end - start, 0);
  var result = [];

  while (length--) {
    result[length] = start + length;
  }

  return result;
};

var chunk = function (array, size) {
  var length = array.length;
  var index = 0;
  var resIndex = -1;
  var result = [];

  while (index < length) {
    result[++resIndex] = array.slice(index, index += size);
  }

  return result;
};

var Calendar = function (_Component) {
  babelHelpers.inherits(Calendar, _Component);

  function Calendar(props) {
    babelHelpers.classCallCheck(this, Calendar);

    var _this = babelHelpers.possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.changeMonth = function (dir) {
      _this.setState({
        moment: _this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
      });
    };

    _this.selectDate = function (day, isSelected, isPrevMonth, isNextMonth) {
      if (isSelected) return;

      var m = _this.state.moment;

      if (isPrevMonth) m.subtract(1, 'month');
      if (isNextMonth) m.add(1, 'month');

      m.date(day);

      _this.setState({
        moment: m.clone(),
        selected: m.clone()
      });
      _this.props.onChange && _this.props.onChange(m);
    };

    _this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
    return _this;
  }

  babelHelpers.createClass(Calendar, [{
    key: '_renderWeek',
    value: function _renderWeek(week) {
      return React__default.createElement(
        'th',
        { key: week },
        week
      );
    }
  }, {
    key: '_renderDay',
    value: function _renderDay(day, week) {
      var _this2 = this;

      var now = moment();
      var isPrevMonth = week === 0 && day > 7;
      var isNextMonth = week >= 4 && day <= 14;
      var isSelected = this.state.moment.isSame(this.state.selected, 'month') && this.state.selected.date() === day;
      var className = classNames({
        'prev-month': isPrevMonth,
        'next-month': isNextMonth,
        'selected': !isPrevMonth && !isNextMonth && isSelected,
        'today': !isPrevMonth && !isNextMonth && this.state.moment.isSame(now, 'month') && now.date() === day
      });

      return React__default.createElement(
        'td',
        { key: day, className: className, onClick: function () {
            return _this2.selectDate(day, isSelected, isPrevMonth, isNextMonth);
          } },
        day
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var m = this.state.moment;
      var firstDay = m.clone().date(1).day();
      var endOfThisMonth = m.clone().endOf('month').date();
      var endOfLastMonth = m.clone().subtract(1, 'month').endOf('month').date();
      var days = [].concat(range(endOfLastMonth - firstDay + 1, endOfLastMonth + 1), range(1, endOfThisMonth + 1), range(1, 42 - endOfThisMonth - firstDay + 1));
      var weeks = WEEKS;
      var className = classNames('calendar', this.props.className);

      return React__default.createElement(
        'div',
        { className: className },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: function () {
                return _this3.changeMonth('prev');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-left' })
          ),
          React__default.createElement(
            'span',
            { className: 'current-date' },
            m.format('MMMM YYYY')
          ),
          React__default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: function () {
                return _this3.changeMonth('next');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-right' })
          )
        ),
        React__default.createElement(
          'table',
          null,
          React__default.createElement(
            'thead',
            null,
            React__default.createElement(
              'tr',
              null,
              weeks.map(function (week) {
                return _this3._renderWeek(week);
              })
            )
          ),
          React__default.createElement(
            'tbody',
            null,
            chunk(days, 7).map(function (week, weekIdx) {
              return React__default.createElement(
                'tr',
                { key: weekIdx },
                week.map(function (day) {
                  return _this3._renderDay(day, weekIdx);
                })
              );
            })
          )
        )
      );
    }
  }]);
  return Calendar;
}(React.Component);

var Time = function (_Component) {
  babelHelpers.inherits(Time, _Component);

  function Time(props) {
    babelHelpers.classCallCheck(this, Time);

    var _this = babelHelpers.possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

    _this.handleChange = function (value, type) {
      var moment$$1 = _this.props.moment;


      moment$$1[type](value);

      _this.setState({
        moment: moment$$1
      });
      _this.props.onChange && _this.props.onChange(moment$$1);
    };

    _this.state = {
      moment: props.moment
    };
    return _this;
  }

  babelHelpers.createClass(Time, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var moment$$1 = this.state.moment;


      return React__default.createElement(
        'div',
        { className: 'time' },
        React__default.createElement(
          'div',
          { className: 'show-time' },
          React__default.createElement(
            'span',
            { className: 'text' },
            moment$$1.format('HH')
          ),
          React__default.createElement(
            'span',
            { className: 'separater' },
            ':'
          ),
          React__default.createElement(
            'span',
            { className: 'text' },
            moment$$1.format('mm')
          )
        ),
        React__default.createElement(
          'div',
          { className: 'sliders' },
          React__default.createElement(
            'span',
            { className: 'slider-text' },
            'Hours:'
          ),
          React__default.createElement(ReactSlider, { min: 0, max: 23, value: moment$$1.hour(), onChange: function (value) {
              return _this2.handleChange(value, 'hours');
            } }),
          React__default.createElement(
            'span',
            { className: 'slider-text' },
            'Minutes:'
          ),
          React__default.createElement(ReactSlider, { min: 0, max: 59, value: moment$$1.minute(), onChange: function (value) {
              return _this2.handleChange(value, 'minutes');
            } })
        )
      );
    }
  }]);
  return Time;
}(React.Component);

var Picker = function (_Component) {
  babelHelpers.inherits(Picker, _Component);

  function Picker() {
    babelHelpers.classCallCheck(this, Picker);

    var _this = babelHelpers.possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this));

    _this.changePanel = function (panel) {
      _this.setState({
        panel: panel
      });
    };

    _this.state = {
      panel: 'calendar'
    };
    return _this;
  }

  babelHelpers.createClass(Picker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = classNames('datetime-picker', {
        hide: !this.props.isOpen,
        split: this.props.splitPanel,
        'calendar-panel': this.state.panel === 'calendar',
        'time-panel': this.state.panel === 'time'
      });
      var props = blacklist(this.props, 'className', 'isOpen');

      return React__default.createElement(
        'div',
        { className: className },
        React__default.createElement(
          'div',
          { className: 'panel-nav' },
          React__default.createElement(
            'button',
            { type: 'button', onClick: function () {
                return _this2.changePanel('calendar');
              } },
            React__default.createElement('i', { className: 'fa fa-calendar-o' }),
            'Date'
          ),
          React__default.createElement(
            'button',
            { type: 'button', onClick: function () {
                return _this2.changePanel('time');
              } },
            React__default.createElement('i', { className: 'fa fa-clock-o' }),
            'Time'
          )
        ),
        React__default.createElement(Calendar, props),
        React__default.createElement(Time, props)
      );
    }
  }]);
  return Picker;
}(React.Component);

var Trigger = function (_Component) {
  babelHelpers.inherits(Trigger, _Component);

  function Trigger() {
    babelHelpers.classCallCheck(this, Trigger);

    var _this = babelHelpers.possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this));

    _this.handleDocumentClick = function (evt) {
      if (!reactDom.findDOMNode(_this).contains(evt.target)) {
        _this.togglePicker(false);
      }
    };

    _this.togglePicker = function (isOpen) {
      _this.setState({
        isOpen: isOpen
      });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  babelHelpers.createClass(Trigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var moment$$1 = _props.moment;
      var onChange = _props.onChange;
      var children = _props.children;


      return React__default.createElement(
        'div',
        { className: 'datetime-trigger' },
        React__default.createElement(
          'div',
          { onClick: function () {
              return _this2.togglePicker(true);
            } },
          children
        ),
        React__default.createElement(Picker, { isOpen: this.state.isOpen, moment: moment$$1, onChange: onChange })
      );
    }
  }]);
  return Trigger;
}(React.Component);

exports.Picker = Picker;
exports.Trigger = Trigger;