"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.y = exports.x = exports.C = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var C = function C() {
  var _this = this;

  _classCallCheck(this, C);

  _defineProperty(this, "x", 10);

  _defineProperty(this, "getX", function () {
    return _this.x;
  });

  _defineProperty(this, "setX", function (newVal) {
    _this.x = newVal;
  });
};

exports.C = C;
var x = new C();
exports.x = x;

var y = _objectSpread({}, {
  some: "value"
});

exports.y = y;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJDIiwieCIsIm5ld1ZhbCIsInkiLCJzb21lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQWFBLEM7Ozs7OzZCQUNHLEU7O2dDQUNMO0FBQUEsV0FBTSxLQUFJLENBQUNDLENBQVg7QUFBQSxHOztnQ0FDQSxVQUFDQyxNQUFELEVBQW9CO0FBQUUsSUFBQSxLQUFJLENBQUNELENBQUwsR0FBU0MsTUFBVDtBQUFrQixHOzs7O0FBRzVDLElBQUlELENBQUMsR0FBRyxJQUFJRCxDQUFKLEVBQVI7OztBQUNBLElBQUlHLENBQUMscUJBQVE7QUFBRUMsRUFBQUEsSUFBSSxFQUFFO0FBQVIsQ0FBUixDQUFMIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEMge1xuICAgIHByaXZhdGUgeCA9IDEwXG4gICAgZ2V0WCA9ICgpID0+IHRoaXMueDtcbiAgICBzZXRYID0gKG5ld1ZhbDogbnVtYmVyKSA9PiB7IHRoaXMueCA9IG5ld1ZhbDsgfVxufVxuXG5leHBvcnQgbGV0IHggPSBuZXcgQygpO1xuZXhwb3J0IGxldCB5ID0geyAuLi57IHNvbWU6IFwidmFsdWVcIiB9IH1cbiJdfQ==