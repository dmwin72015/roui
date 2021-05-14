"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Button = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxRuntime = require("react/jsx-runtime");

/**
 * Primary UI component for user interaction
 */
var Button = function Button(_ref) {
  var _ref$primary = _ref.primary,
      primary = _ref$primary === void 0 ? false : _ref$primary,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      backgroundColor = _ref.backgroundColor,
      label = _ref.label,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["primary", "size", "backgroundColor", "label"]);
  var mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", (0, _extends2.default)({
    type: "button",
    className: ['storybook-button', "storybook-button--" + size, mode].join(' '),
    style: {
      backgroundColor: backgroundColor
    }
  }, props, {
    children: label
  }));
};

exports.Button = Button;
Button.propTypes = {
  primary: _propTypes.default.bool,
  backgroundColor: _propTypes.default.string,
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),
  label: _propTypes.default.string,
  onClick: _propTypes.default.func
};
Button.displayName = 'Button';