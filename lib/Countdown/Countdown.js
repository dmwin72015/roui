"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxRuntime = require("react/jsx-runtime");

var COUNT_SECOND = 60;
var COUNT_FORMAT = '重新发送(SSs)';
var COUNT_DEFAULT = '发送验证码';

/**
 * 倒计时
 * @param props CountDownProps
 * @returns
 */
var CountDown = function CountDown(props) {
  var startNum = props.startNum,
      starting = props.starting,
      defaultText = props.defaultText,
      request = props.request,
      format = props.format,
      disabled = props.disabled;

  var _useState = (0, _react.useState)(starting),
      counting = _useState[0],
      setCounting = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      requesting = _useState2[0],
      setRequesting = _useState2[1];

  var _useState3 = (0, _react.useState)(startNum || COUNT_SECOND),
      showTime = _useState3[0],
      setShowTime = _useState3[1];

  var timerRef = (0, _react.useRef)();
  var timeValRef = (0, _react.useRef)();
  timeValRef.current = showTime; // 第一次好使，每次执行，都会有一个新的闭包，count
  // count 保存了上一次闭包的值

  var count = function count() {
    clearTimeout(timerRef.current);
    setCounting(true);

    if (timeValRef.current <= 0) {
      clearCount();
      return;
    }

    setShowTime(timeValRef.current - 1);
    timerRef.current = window.setTimeout(function () {
      count();
    }, 1000);
  };

  var clearCount = function clearCount() {
    clearTimeout(timerRef.current);
    setCounting(false);
    timeValRef.current = startNum || COUNT_SECOND;
  };

  var currTime = (0, _react.useMemo)(function () {
    return formatWord(showTime);
  }, [showTime]);
  (0, _react.useEffect)(function () {
    if (counting) {
      count();
    }

    return clearCount;
  }, []);

  function formatWord(timeVal) {
    return (format || COUNT_FORMAT).replace('SS', timeVal);
  }

  function handleClick() {
    if (disabled || requesting || counting) {
      return;
    }

    setRequesting(true);
    count();

    if (!request) {
      return;
    }

    request().then(function (resp) {
      console.log(resp);
    }).finally(function () {
      return setRequesting(false);
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: (0, _classnames.default)('count-down', {
      disable: counting || disabled
    }),
    onClick: handleClick,
    children: counting ? currTime : defaultText || COUNT_DEFAULT
  });
};

CountDown.propTypes = {
  /**
   * 手机号码
   */
  mobile: _propTypes.default.string,

  /**
   * 是否立即开始
   */
  starting: _propTypes.default.bool,

  /**
   * 默认显示内容
   */
  defaultText: _propTypes.default.string,

  /**
   * 是否禁用
   */
  disabled: _propTypes.default.bool,

  /**
   * 请求函数，返回一个promise
   */
  request: _propTypes.default.func,

  /**
   * 倒计时格式化
   */
  format: _propTypes.default.string,

  /**
   * 开始倒计时数据，与starting配合使用，starting = false时，无效
   */
  startNum: _propTypes.default.number
};
CountDown.defaultProps = {
  disabled: false,
  defaultText: COUNT_DEFAULT,
  format: COUNT_FORMAT
};
CountDown.displayName = 'CountDown';
var _default = CountDown;
exports.default = _default;