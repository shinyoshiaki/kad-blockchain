"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _broadcast = _interopRequireDefault(require("kad-rtc/lib/node/broadcast"));

var _blockchainTs = _interopRequireDefault(require("blockchain-ts"));

var _responder = require("blockchain-ts/lib/blockchain/responder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Network =
/*#__PURE__*/
function () {
  function Network(kad, phrase) {
    var _this = this;

    _classCallCheck(this, Network);

    _defineProperty(this, "kad", void 0);

    _defineProperty(this, "broadcast", void 0);

    _defineProperty(this, "blockchain", void 0);

    this.kad = kad;
    this.broadcast = new _broadcast.default(kad);
    this.blockchain = new _blockchainTs.default({
      phrase: phrase,
      callback: {
        listenConfilict: this.listenConflict,
        answerConflict: this.answerConflict
      }
    });

    this.broadcast.events.broadcast["network.ts"] = function (network) {
      var json = JSON.parse(network);

      _this.blockchain.responder.runRPC(json);
    };
  }

  _createClass(Network, [{
    key: "listenConflict",
    value: function listenConflict(rpc) {
      var str = JSON.stringify(rpc);
      this.broadcast.broadcast(str);
    }
  }, {
    key: "answerConflict",
    value: function answerConflict(rpc) {
      var str = JSON.stringify(rpc);
      this.broadcast.broadcast(str);
    }
  }, {
    key: "transaction",
    value: function transaction(recipent, amount, data) {
      var tran = this.blockchain.makeTransaction(recipent, amount, data);
      if (!tran) return;
      var rpc = {
        type: _responder.typeRPC.TRANSACRION,
        body: tran
      };
      var str = JSON.stringify(rpc);
      this.broadcast.broadcast(str);
    }
  }, {
    key: "mine",
    value: function () {
      var _mine = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var block, rpc, str;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.blockchain.mine();

              case 2:
                block = _context.sent;
                rpc = {
                  type: _responder.typeRPC.NEWBLOCK,
                  body: block
                };
                str = JSON.stringify(rpc);
                this.broadcast.broadcast(str);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function mine() {
        return _mine.apply(this, arguments);
      };
    }()
  }]);

  return Network;
}();

exports.default = Network;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXR3b3JrLnRzIl0sIm5hbWVzIjpbIk5ldHdvcmsiLCJrYWQiLCJwaHJhc2UiLCJicm9hZGNhc3QiLCJCcm9hZGNhc3QiLCJibG9ja2NoYWluIiwiQmxvY2tDaGFpbkFwcCIsImNhbGxiYWNrIiwibGlzdGVuQ29uZmlsaWN0IiwibGlzdGVuQ29uZmxpY3QiLCJhbnN3ZXJDb25mbGljdCIsImV2ZW50cyIsIm5ldHdvcmsiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uZGVyIiwicnVuUlBDIiwicnBjIiwic3RyIiwic3RyaW5naWZ5IiwicmVjaXBlbnQiLCJhbW91bnQiLCJkYXRhIiwidHJhbiIsIm1ha2VUcmFuc2FjdGlvbiIsInR5cGUiLCJ0eXBlUlBDIiwiVFJBTlNBQ1JJT04iLCJib2R5IiwibWluZSIsImJsb2NrIiwiTkVXQkxPQ0siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7O0FBSW5CLG1CQUFZQyxHQUFaLEVBQTJCQyxNQUEzQixFQUE0QztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUMxQyxTQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLRSxTQUFMLEdBQWlCLElBQUlDLGtCQUFKLENBQWNILEdBQWQsQ0FBakI7QUFDQSxTQUFLSSxVQUFMLEdBQWtCLElBQUlDLHFCQUFKLENBQWtCO0FBQ2xDSixNQUFBQSxNQUFNLEVBQU5BLE1BRGtDO0FBRWxDSyxNQUFBQSxRQUFRLEVBQUU7QUFDUkMsUUFBQUEsZUFBZSxFQUFFLEtBQUtDLGNBRGQ7QUFFUkMsUUFBQUEsY0FBYyxFQUFFLEtBQUtBO0FBRmI7QUFGd0IsS0FBbEIsQ0FBbEI7O0FBUUEsU0FBS1AsU0FBTCxDQUFlUSxNQUFmLENBQXNCUixTQUF0QixDQUFnQyxZQUFoQyxJQUFnRCxVQUFBUyxPQUFPLEVBQUk7QUFDekQsVUFBTUMsSUFBUyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsT0FBWCxDQUFsQjs7QUFDQSxNQUFBLEtBQUksQ0FBQ1AsVUFBTCxDQUFnQlcsU0FBaEIsQ0FBMEJDLE1BQTFCLENBQWlDSixJQUFqQztBQUNELEtBSEQ7QUFJRDs7OzttQ0FFc0JLLEcsRUFBVTtBQUMvQixVQUFNQyxHQUFHLEdBQUdMLElBQUksQ0FBQ00sU0FBTCxDQUFlRixHQUFmLENBQVo7QUFDQSxXQUFLZixTQUFMLENBQWVBLFNBQWYsQ0FBeUJnQixHQUF6QjtBQUNEOzs7bUNBRXNCRCxHLEVBQVU7QUFDL0IsVUFBTUMsR0FBRyxHQUFHTCxJQUFJLENBQUNNLFNBQUwsQ0FBZUYsR0FBZixDQUFaO0FBQ0EsV0FBS2YsU0FBTCxDQUFlQSxTQUFmLENBQXlCZ0IsR0FBekI7QUFDRDs7O2dDQUVXRSxRLEVBQWtCQyxNLEVBQWdCQyxJLEVBQXdCO0FBQ3BFLFVBQU1DLElBQUksR0FBRyxLQUFLbkIsVUFBTCxDQUFnQm9CLGVBQWhCLENBQWdDSixRQUFoQyxFQUEwQ0MsTUFBMUMsRUFBa0RDLElBQWxELENBQWI7QUFDQSxVQUFJLENBQUNDLElBQUwsRUFBVztBQUNYLFVBQU1OLEdBQVEsR0FBRztBQUFFUSxRQUFBQSxJQUFJLEVBQUVDLG1CQUFRQyxXQUFoQjtBQUE2QkMsUUFBQUEsSUFBSSxFQUFFTDtBQUFuQyxPQUFqQjtBQUNBLFVBQU1MLEdBQUcsR0FBR0wsSUFBSSxDQUFDTSxTQUFMLENBQWVGLEdBQWYsQ0FBWjtBQUNBLFdBQUtmLFNBQUwsQ0FBZUEsU0FBZixDQUF5QmdCLEdBQXpCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7dUJBR3FCLEtBQUtkLFVBQUwsQ0FBZ0J5QixJQUFoQixFOzs7QUFBZEMsZ0JBQUFBLEs7QUFDQWIsZ0JBQUFBLEcsR0FBVztBQUFFUSxrQkFBQUEsSUFBSSxFQUFFQyxtQkFBUUssUUFBaEI7QUFBMEJILGtCQUFBQSxJQUFJLEVBQUVFO0FBQWhDLGlCO0FBQ1haLGdCQUFBQSxHLEdBQU1MLElBQUksQ0FBQ00sU0FBTCxDQUFlRixHQUFmLEM7QUFDWixxQkFBS2YsU0FBTCxDQUFlQSxTQUFmLENBQXlCZ0IsR0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgS2FkZW1saWEgZnJvbSBcImthZC1ydGNcIjtcbmltcG9ydCBCcm9hZGNhc3QgZnJvbSBcImthZC1ydGMvbGliL25vZGUvYnJvYWRjYXN0XCI7XG5pbXBvcnQgQmxvY2tDaGFpbkFwcCBmcm9tIFwiYmxvY2tjaGFpbi10c1wiO1xuaW1wb3J0IHsgSVRyYW5zYWN0aW9uRGF0YSB9IGZyb20gXCJibG9ja2NoYWluLXRzL2xpYi9ibG9ja2NoYWluL2Jsb2NrY2hhaW5cIjtcbmltcG9ydCB7IFJQQywgdHlwZVJQQyB9IGZyb20gXCJibG9ja2NoYWluLXRzL2xpYi9ibG9ja2NoYWluL3Jlc3BvbmRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrIHtcbiAga2FkOiBLYWRlbWxpYTtcbiAgYnJvYWRjYXN0OiBCcm9hZGNhc3Q7XG4gIGJsb2NrY2hhaW46IEJsb2NrQ2hhaW5BcHA7XG4gIGNvbnN0cnVjdG9yKGthZDogS2FkZW1saWEsIHBocmFzZT86IHN0cmluZykge1xuICAgIHRoaXMua2FkID0ga2FkO1xuICAgIHRoaXMuYnJvYWRjYXN0ID0gbmV3IEJyb2FkY2FzdChrYWQpO1xuICAgIHRoaXMuYmxvY2tjaGFpbiA9IG5ldyBCbG9ja0NoYWluQXBwKHtcbiAgICAgIHBocmFzZSxcbiAgICAgIGNhbGxiYWNrOiB7XG4gICAgICAgIGxpc3RlbkNvbmZpbGljdDogdGhpcy5saXN0ZW5Db25mbGljdCxcbiAgICAgICAgYW5zd2VyQ29uZmxpY3Q6IHRoaXMuYW5zd2VyQ29uZmxpY3RcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnJvYWRjYXN0LmV2ZW50cy5icm9hZGNhc3RbXCJuZXR3b3JrLnRzXCJdID0gbmV0d29yayA9PiB7XG4gICAgICBjb25zdCBqc29uOiBSUEMgPSBKU09OLnBhcnNlKG5ldHdvcmspO1xuICAgICAgdGhpcy5ibG9ja2NoYWluLnJlc3BvbmRlci5ydW5SUEMoanNvbik7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuQ29uZmxpY3QocnBjOiBSUEMpIHtcbiAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeShycGMpO1xuICAgIHRoaXMuYnJvYWRjYXN0LmJyb2FkY2FzdChzdHIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhbnN3ZXJDb25mbGljdChycGM6IFJQQykge1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7XG4gICAgdGhpcy5icm9hZGNhc3QuYnJvYWRjYXN0KHN0cik7XG4gIH1cblxuICB0cmFuc2FjdGlvbihyZWNpcGVudDogc3RyaW5nLCBhbW91bnQ6IG51bWJlciwgZGF0YTogSVRyYW5zYWN0aW9uRGF0YSkge1xuICAgIGNvbnN0IHRyYW4gPSB0aGlzLmJsb2NrY2hhaW4ubWFrZVRyYW5zYWN0aW9uKHJlY2lwZW50LCBhbW91bnQsIGRhdGEpO1xuICAgIGlmICghdHJhbikgcmV0dXJuO1xuICAgIGNvbnN0IHJwYzogUlBDID0geyB0eXBlOiB0eXBlUlBDLlRSQU5TQUNSSU9OLCBib2R5OiB0cmFuIH07XG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkocnBjKTtcbiAgICB0aGlzLmJyb2FkY2FzdC5icm9hZGNhc3Qoc3RyKTtcbiAgfVxuXG4gIGFzeW5jIG1pbmUoKSB7XG4gICAgY29uc3QgYmxvY2sgPSBhd2FpdCB0aGlzLmJsb2NrY2hhaW4ubWluZSgpO1xuICAgIGNvbnN0IHJwYzogUlBDID0geyB0eXBlOiB0eXBlUlBDLk5FV0JMT0NLLCBib2R5OiBibG9jayB9O1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7XG4gICAgdGhpcy5icm9hZGNhc3QuYnJvYWRjYXN0KHN0cik7XG4gIH1cbn1cbiJdfQ==