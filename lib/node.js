"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("kad-rtc/lib/node/node"));

var _network = _interopRequireDefault(require("./network"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConnectNode =
/*#__PURE__*/
function (_Network) {
  _inherits(ConnectNode, _Network);

  function ConnectNode(target, opt) {
    _classCallCheck(this, ConnectNode);

    var node = new _node.default(target, opt);
    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectNode).call(this, node.kad));
  }

  return ConnectNode;
}(_network.default);

exports.default = ConnectNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ub2RlLnRzIl0sIm5hbWVzIjpbIkNvbm5lY3ROb2RlIiwidGFyZ2V0Iiwib3B0Iiwibm9kZSIsIk5vZGUiLCJrYWQiLCJOZXR3b3JrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7QUFDbkIsdUJBQ0VDLE1BREYsRUFFRUMsR0FGRixFQUdFO0FBQUE7O0FBQ0EsUUFBTUMsSUFBSSxHQUFHLElBQUlDLGFBQUosQ0FBU0gsTUFBVCxFQUFpQkMsR0FBakIsQ0FBYjtBQURBLG9GQUVNQyxJQUFJLENBQUNFLEdBRlg7QUFHRDs7O0VBUHNDQyxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlIGZyb20gXCJrYWQtcnRjL2xpYi9ub2RlL25vZGVcIjtcbmltcG9ydCBOZXR3b3JrIGZyb20gXCIuL25ldHdvcmtcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29ubmVjdE5vZGUgZXh0ZW5kcyBOZXR3b3JrIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdGFyZ2V0OiB7IGFkZHJlc3M6IHN0cmluZzsgcG9ydDogc3RyaW5nIH0sXG4gICAgb3B0PzogeyBwdWJrZXk6IHN0cmluZzsgc2Vja2V5OiBzdHJpbmcgfVxuICApIHtcbiAgICBjb25zdCBub2RlID0gbmV3IE5vZGUodGFyZ2V0LCBvcHQpO1xuICAgIHN1cGVyKG5vZGUua2FkKTtcbiAgfVxufVxuIl19