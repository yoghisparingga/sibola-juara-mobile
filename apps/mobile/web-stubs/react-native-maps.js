const React = require('react');
const RN = require('react-native');

const Stub = (props) => React.createElement(RN.View, props, props.children);

module.exports = Stub;
module.exports.default = Stub;
module.exports.Marker = Stub;
module.exports.PROVIDER_DEFAULT = 'default';
module.exports.PROVIDER_GOOGLE = 'google';
