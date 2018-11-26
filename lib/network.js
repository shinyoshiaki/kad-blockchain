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
        listenConflict: function listenConflict(rpc) {
          _this.listenConflict(rpc, _this.broadcast);
        },
        answerConflict: function answerConflict(rpc) {
          _this.answerConflict(rpc, _this.broadcast);
        }
      }
    });

    this.broadcast.events.broadcast["network.ts"] = function (network) {
      var json = JSON.parse(network);
      console.log({
        json: json
      });

      _this.blockchain.responder.runRPC(json);
    };
  }

  _createClass(Network, [{
    key: "listenConflict",
    value: function listenConflict(rpc, broadcast) {
      var str = JSON.stringify(rpc); //本来はブロードキャストするべきではない

      broadcast.broadcast(str);
    }
  }, {
    key: "answerConflict",
    value: function answerConflict(rpc, broadcast) {
      var str = JSON.stringify(rpc); //本来はブロードキャストするべきではない

      broadcast.broadcast(str);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXR3b3JrLnRzIl0sIm5hbWVzIjpbIk5ldHdvcmsiLCJrYWQiLCJwaHJhc2UiLCJicm9hZGNhc3QiLCJCcm9hZGNhc3QiLCJibG9ja2NoYWluIiwiQmxvY2tDaGFpbkFwcCIsImNhbGxiYWNrIiwibGlzdGVuQ29uZmxpY3QiLCJycGMiLCJhbnN3ZXJDb25mbGljdCIsImV2ZW50cyIsIm5ldHdvcmsiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsInJlc3BvbmRlciIsInJ1blJQQyIsInN0ciIsInN0cmluZ2lmeSIsInJlY2lwZW50IiwiYW1vdW50IiwiZGF0YSIsInRyYW4iLCJtYWtlVHJhbnNhY3Rpb24iLCJ0eXBlIiwidHlwZVJQQyIsIlRSQU5TQUNSSU9OIiwiYm9keSIsIm1pbmUiLCJibG9jayIsIk5FV0JMT0NLIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87OztBQUluQixtQkFBWUMsR0FBWixFQUEyQkMsTUFBM0IsRUFBNEM7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDMUMsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixJQUFJQyxrQkFBSixDQUFjSCxHQUFkLENBQWpCO0FBQ0EsU0FBS0ksVUFBTCxHQUFrQixJQUFJQyxxQkFBSixDQUFrQjtBQUNsQ0osTUFBQUEsTUFBTSxFQUFOQSxNQURrQztBQUVsQ0ssTUFBQUEsUUFBUSxFQUFFO0FBQ1JDLFFBQUFBLGNBQWMsRUFBRSx3QkFBQUMsR0FBRyxFQUFJO0FBQ3JCLFVBQUEsS0FBSSxDQUFDRCxjQUFMLENBQW9CQyxHQUFwQixFQUF5QixLQUFJLENBQUNOLFNBQTlCO0FBQ0QsU0FITztBQUlSTyxRQUFBQSxjQUFjLEVBQUUsd0JBQUFELEdBQUcsRUFBSTtBQUNyQixVQUFBLEtBQUksQ0FBQ0MsY0FBTCxDQUFvQkQsR0FBcEIsRUFBeUIsS0FBSSxDQUFDTixTQUE5QjtBQUNEO0FBTk87QUFGd0IsS0FBbEIsQ0FBbEI7O0FBWUEsU0FBS0EsU0FBTCxDQUFlUSxNQUFmLENBQXNCUixTQUF0QixDQUFnQyxZQUFoQyxJQUFnRCxVQUFBUyxPQUFPLEVBQUk7QUFDekQsVUFBTUMsSUFBUyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsT0FBWCxDQUFsQjtBQUNBSSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTtBQUFFSixRQUFBQSxJQUFJLEVBQUpBO0FBQUYsT0FBWjs7QUFDQSxNQUFBLEtBQUksQ0FBQ1IsVUFBTCxDQUFnQmEsU0FBaEIsQ0FBMEJDLE1BQTFCLENBQWlDTixJQUFqQztBQUNELEtBSkQ7QUFLRDs7OzttQ0FFc0JKLEcsRUFBVU4sUyxFQUFzQjtBQUNyRCxVQUFNaUIsR0FBRyxHQUFHTixJQUFJLENBQUNPLFNBQUwsQ0FBZVosR0FBZixDQUFaLENBRHFELENBRXJEOztBQUNBTixNQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JpQixHQUFwQjtBQUNEOzs7bUNBRXNCWCxHLEVBQVVOLFMsRUFBc0I7QUFDckQsVUFBTWlCLEdBQUcsR0FBR04sSUFBSSxDQUFDTyxTQUFMLENBQWVaLEdBQWYsQ0FBWixDQURxRCxDQUVyRDs7QUFDQU4sTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CaUIsR0FBcEI7QUFDRDs7O2dDQUVXRSxRLEVBQWtCQyxNLEVBQWdCQyxJLEVBQXdCO0FBQ3BFLFVBQU1DLElBQUksR0FBRyxLQUFLcEIsVUFBTCxDQUFnQnFCLGVBQWhCLENBQWdDSixRQUFoQyxFQUEwQ0MsTUFBMUMsRUFBa0RDLElBQWxELENBQWI7QUFDQSxVQUFJLENBQUNDLElBQUwsRUFBVztBQUNYLFVBQU1oQixHQUFRLEdBQUc7QUFBRWtCLFFBQUFBLElBQUksRUFBRUMsbUJBQVFDLFdBQWhCO0FBQTZCQyxRQUFBQSxJQUFJLEVBQUVMO0FBQW5DLE9BQWpCO0FBQ0EsVUFBTUwsR0FBRyxHQUFHTixJQUFJLENBQUNPLFNBQUwsQ0FBZVosR0FBZixDQUFaO0FBQ0EsV0FBS04sU0FBTCxDQUFlQSxTQUFmLENBQXlCaUIsR0FBekI7QUFDRDs7Ozs7Ozs7Ozs7Ozt1QkFHcUIsS0FBS2YsVUFBTCxDQUFnQjBCLElBQWhCLEU7OztBQUFkQyxnQkFBQUEsSztBQUNBdkIsZ0JBQUFBLEcsR0FBVztBQUFFa0Isa0JBQUFBLElBQUksRUFBRUMsbUJBQVFLLFFBQWhCO0FBQTBCSCxrQkFBQUEsSUFBSSxFQUFFRTtBQUFoQyxpQjtBQUNYWixnQkFBQUEsRyxHQUFNTixJQUFJLENBQUNPLFNBQUwsQ0FBZVosR0FBZixDO0FBQ1oscUJBQUtOLFNBQUwsQ0FBZUEsU0FBZixDQUF5QmlCLEdBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEthZGVtbGlhIGZyb20gXCJrYWQtcnRjXCI7XG5pbXBvcnQgQnJvYWRjYXN0IGZyb20gXCJrYWQtcnRjL2xpYi9ub2RlL2Jyb2FkY2FzdFwiO1xuaW1wb3J0IEJsb2NrQ2hhaW5BcHAgZnJvbSBcImJsb2NrY2hhaW4tdHNcIjtcbmltcG9ydCB7IElUcmFuc2FjdGlvbkRhdGEgfSBmcm9tIFwiYmxvY2tjaGFpbi10cy9saWIvYmxvY2tjaGFpbi9ibG9ja2NoYWluXCI7XG5pbXBvcnQgeyBSUEMsIHR5cGVSUEMgfSBmcm9tIFwiYmxvY2tjaGFpbi10cy9saWIvYmxvY2tjaGFpbi9yZXNwb25kZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29yayB7XG4gIGthZDogS2FkZW1saWE7XG4gIGJyb2FkY2FzdDogQnJvYWRjYXN0O1xuICBibG9ja2NoYWluOiBCbG9ja0NoYWluQXBwO1xuICBjb25zdHJ1Y3RvcihrYWQ6IEthZGVtbGlhLCBwaHJhc2U/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmthZCA9IGthZDtcbiAgICB0aGlzLmJyb2FkY2FzdCA9IG5ldyBCcm9hZGNhc3Qoa2FkKTtcbiAgICB0aGlzLmJsb2NrY2hhaW4gPSBuZXcgQmxvY2tDaGFpbkFwcCh7XG4gICAgICBwaHJhc2UsXG4gICAgICBjYWxsYmFjazoge1xuICAgICAgICBsaXN0ZW5Db25mbGljdDogcnBjID0+IHtcbiAgICAgICAgICB0aGlzLmxpc3RlbkNvbmZsaWN0KHJwYywgdGhpcy5icm9hZGNhc3QpO1xuICAgICAgICB9LFxuICAgICAgICBhbnN3ZXJDb25mbGljdDogcnBjID0+IHtcbiAgICAgICAgICB0aGlzLmFuc3dlckNvbmZsaWN0KHJwYywgdGhpcy5icm9hZGNhc3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmJyb2FkY2FzdC5ldmVudHMuYnJvYWRjYXN0W1wibmV0d29yay50c1wiXSA9IG5ldHdvcmsgPT4ge1xuICAgICAgY29uc3QganNvbjogUlBDID0gSlNPTi5wYXJzZShuZXR3b3JrKTtcbiAgICAgIGNvbnNvbGUubG9nKHsganNvbiB9KTtcbiAgICAgIHRoaXMuYmxvY2tjaGFpbi5yZXNwb25kZXIucnVuUlBDKGpzb24pO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkNvbmZsaWN0KHJwYzogUlBDLCBicm9hZGNhc3Q6IEJyb2FkY2FzdCkge1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7XG4gICAgLy/mnKzmnaXjga/jg5bjg63jg7zjg4njgq3jg6Pjgrnjg4jjgZnjgovjgbnjgY3jgafjga/jgarjgYRcbiAgICBicm9hZGNhc3QuYnJvYWRjYXN0KHN0cik7XG4gIH1cblxuICBwcml2YXRlIGFuc3dlckNvbmZsaWN0KHJwYzogUlBDLCBicm9hZGNhc3Q6IEJyb2FkY2FzdCkge1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7XG4gICAgLy/mnKzmnaXjga/jg5bjg63jg7zjg4njgq3jg6Pjgrnjg4jjgZnjgovjgbnjgY3jgafjga/jgarjgYRcbiAgICBicm9hZGNhc3QuYnJvYWRjYXN0KHN0cik7XG4gIH1cblxuICB0cmFuc2FjdGlvbihyZWNpcGVudDogc3RyaW5nLCBhbW91bnQ6IG51bWJlciwgZGF0YTogSVRyYW5zYWN0aW9uRGF0YSkge1xuICAgIGNvbnN0IHRyYW4gPSB0aGlzLmJsb2NrY2hhaW4ubWFrZVRyYW5zYWN0aW9uKHJlY2lwZW50LCBhbW91bnQsIGRhdGEpO1xuICAgIGlmICghdHJhbikgcmV0dXJuO1xuICAgIGNvbnN0IHJwYzogUlBDID0geyB0eXBlOiB0eXBlUlBDLlRSQU5TQUNSSU9OLCBib2R5OiB0cmFuIH07XG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkocnBjKTtcbiAgICB0aGlzLmJyb2FkY2FzdC5icm9hZGNhc3Qoc3RyKTtcbiAgfVxuXG4gIGFzeW5jIG1pbmUoKSB7XG4gICAgY29uc3QgYmxvY2sgPSBhd2FpdCB0aGlzLmJsb2NrY2hhaW4ubWluZSgpO1xuICAgIGNvbnN0IHJwYzogUlBDID0geyB0eXBlOiB0eXBlUlBDLk5FV0JMT0NLLCBib2R5OiBibG9jayB9O1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7XG4gICAgdGhpcy5icm9hZGNhc3QuYnJvYWRjYXN0KHN0cik7XG4gIH1cbn1cbiJdfQ==