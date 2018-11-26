"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _portalNode = _interopRequireDefault(require("kad-rtc/lib/node/portalNode"));

var _network = _interopRequireDefault(require("./network"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConnectPotalnode =
/*#__PURE__*/
function (_Network) {
  _inherits(ConnectPotalnode, _Network);

  function ConnectPotalnode(myport, target) {
    _classCallCheck(this, ConnectPotalnode);

    var node = new _portalNode.default(myport, target);
    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectPotalnode).call(this, node.kad));
  }

  return ConnectPotalnode;
}(_network.default);

exports.default = ConnectPotalnode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3J0YWxub2RlLnRzIl0sIm5hbWVzIjpbIkNvbm5lY3RQb3RhbG5vZGUiLCJteXBvcnQiLCJ0YXJnZXQiLCJub2RlIiwiUG9ydGFsTm9kZSIsImthZCIsIk5ldHdvcmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxnQjs7Ozs7QUFDbkIsNEJBQVlDLE1BQVosRUFBNEJDLE1BQTVCLEVBQXVFO0FBQUE7O0FBQ3JFLFFBQU1DLElBQUksR0FBRyxJQUFJQyxtQkFBSixDQUFlSCxNQUFmLEVBQXVCQyxNQUF2QixDQUFiO0FBRHFFLHlGQUUvREMsSUFBSSxDQUFDRSxHQUYwRDtBQUd0RTs7O0VBSjJDQyxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb3J0YWxOb2RlIGZyb20gXCJrYWQtcnRjL2xpYi9ub2RlL3BvcnRhbE5vZGVcIjtcbmltcG9ydCBOZXR3b3JrIGZyb20gXCIuL25ldHdvcmtcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29ubmVjdFBvdGFsbm9kZSBleHRlbmRzIE5ldHdvcmsge1xuICBjb25zdHJ1Y3RvcihteXBvcnQ6IG51bWJlciwgdGFyZ2V0OiB7IGFkZHJlc3M6IHN0cmluZzsgcG9ydDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBub2RlID0gbmV3IFBvcnRhbE5vZGUobXlwb3J0LCB0YXJnZXQpO1xuICAgIHN1cGVyKG5vZGUua2FkKTtcbiAgfVxufVxuIl19