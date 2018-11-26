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

  function ConnectPotalnode(target) {
    _classCallCheck(this, ConnectPotalnode);

    var node = new _portalNode.default(20000, target);
    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectPotalnode).call(this, node.kad));
  }

  return ConnectPotalnode;
}(_network.default);

exports.default = ConnectPotalnode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3J0YWxub2RlLnRzIl0sIm5hbWVzIjpbIkNvbm5lY3RQb3RhbG5vZGUiLCJ0YXJnZXQiLCJub2RlIiwiUG9ydGFsTm9kZSIsImthZCIsIk5ldHdvcmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxnQjs7Ozs7QUFDbkIsNEJBQVlDLE1BQVosRUFBdUQ7QUFBQTs7QUFDckQsUUFBTUMsSUFBSSxHQUFHLElBQUlDLG1CQUFKLENBQWUsS0FBZixFQUFzQkYsTUFBdEIsQ0FBYjtBQURxRCx5RkFFL0NDLElBQUksQ0FBQ0UsR0FGMEM7QUFHdEQ7OztFQUoyQ0MsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9ydGFsTm9kZSBmcm9tIFwia2FkLXJ0Yy9saWIvbm9kZS9wb3J0YWxOb2RlXCI7XG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi9uZXR3b3JrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbm5lY3RQb3RhbG5vZGUgZXh0ZW5kcyBOZXR3b3JrIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0OiB7IGFkZHJlc3M6IHN0cmluZzsgcG9ydDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBub2RlID0gbmV3IFBvcnRhbE5vZGUoMjAwMDAsIHRhcmdldCk7XG4gICAgc3VwZXIobm9kZS5rYWQpO1xuICB9XG59XG4iXX0=