import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";

/**
 * Primary UI component for user interaction
 */
export var Button = function Button(_ref) {
  var _ref$primary = _ref.primary,
      primary = _ref$primary === void 0 ? false : _ref$primary,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      backgroundColor = _ref.backgroundColor,
      label = _ref.label,
      props = _objectWithoutPropertiesLoose(_ref, ["primary", "size", "backgroundColor", "label"]);

  var mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return /*#__PURE__*/_jsx("button", _extends({
    type: "button",
    className: ['storybook-button', "storybook-button--" + size, mode].join(' '),
    style: {
      backgroundColor: backgroundColor
    }
  }, props, {
    children: label
  }));
};
Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string,
  onClick: PropTypes.func
};
Button.displayName = 'Button';