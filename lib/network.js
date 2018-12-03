"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _broadcast = _interopRequireDefault(require("kad-rtc/lib/node/broadcast"));

var _p2p = _interopRequireDefault(require("kad-rtc/lib/node/p2p"));

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

    _defineProperty(this, "p2p", void 0);

    this.kad = kad;
    this.broadcast = new _broadcast.default(kad);
    this.p2p = new _p2p.default(kad);
    this.blockchain = new _blockchainTs.default({
      phrase: phrase,
      callback: {
        listenConflict: function listenConflict(rpc) {
          _this.listenConflict(rpc, _this.p2p);
        },
        answerConflict: function answerConflict() {}
      }
    });

    this.broadcast.events.broadcast["network.ts broadcast"] = function (network) {
      var json = JSON.parse(network);
      console.log({
        json: json
      });

      _this.blockchain.responder.runRPC(json);
    };

    this.p2p.events.p2p["network.ts p2p"] = function (network) {
      if (!network.text) return;
      var json = JSON.parse(network.text);
      console.log({
        json: json
      });
      if (!_this.blockchain.responder.callback) return;

      _this.blockchain.responder.callback.answerConflict = function (rpc) {
        _this.answerConflict(rpc, _this.p2p, network.nodeId);
      };

      _this.blockchain.responder.runRPC(json);
    };
  }

  _createClass(Network, [{
    key: "listenConflict",
    value: function listenConflict(rpc, p2p) {
      var str = JSON.stringify(rpc);
      var targets = this.kad.f.getAllPeerIds();
      if (!targets) return;
      p2p.send(targets[0], {
        text: str
      });
    }
  }, {
    key: "answerConflict",
    value: function answerConflict(rpc, p2p, nodeId) {
      var str = JSON.stringify(rpc);
      p2p.send(nodeId, {
        text: str
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXR3b3JrLnRzIl0sIm5hbWVzIjpbIk5ldHdvcmsiLCJrYWQiLCJwaHJhc2UiLCJicm9hZGNhc3QiLCJCcm9hZGNhc3QiLCJwMnAiLCJQMlAiLCJibG9ja2NoYWluIiwiQmxvY2tDaGFpbkFwcCIsImNhbGxiYWNrIiwibGlzdGVuQ29uZmxpY3QiLCJycGMiLCJhbnN3ZXJDb25mbGljdCIsImV2ZW50cyIsIm5ldHdvcmsiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsInJlc3BvbmRlciIsInJ1blJQQyIsInRleHQiLCJub2RlSWQiLCJzdHIiLCJzdHJpbmdpZnkiLCJ0YXJnZXRzIiwiZiIsImdldEFsbFBlZXJJZHMiLCJzZW5kIiwicmVjaXBlbnQiLCJhbW91bnQiLCJkYXRhIiwidHJhbiIsIm1ha2VUcmFuc2FjdGlvbiIsInR5cGUiLCJ0eXBlUlBDIiwiVFJBTlNBQ1JJT04iLCJib2R5IiwibWluZSIsImJsb2NrIiwiTkVXQkxPQ0siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7O0FBS25CLG1CQUFZQyxHQUFaLEVBQTJCQyxNQUEzQixFQUE0QztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUMxQyxTQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLRSxTQUFMLEdBQWlCLElBQUlDLGtCQUFKLENBQWNILEdBQWQsQ0FBakI7QUFDQSxTQUFLSSxHQUFMLEdBQVcsSUFBSUMsWUFBSixDQUFRTCxHQUFSLENBQVg7QUFDQSxTQUFLTSxVQUFMLEdBQWtCLElBQUlDLHFCQUFKLENBQWtCO0FBQ2xDTixNQUFBQSxNQUFNLEVBQU5BLE1BRGtDO0FBRWxDTyxNQUFBQSxRQUFRLEVBQUU7QUFDUkMsUUFBQUEsY0FBYyxFQUFFLHdCQUFBQyxHQUFHLEVBQUk7QUFDckIsVUFBQSxLQUFJLENBQUNELGNBQUwsQ0FBb0JDLEdBQXBCLEVBQXlCLEtBQUksQ0FBQ04sR0FBOUI7QUFDRCxTQUhPO0FBSVJPLFFBQUFBLGNBQWMsRUFBRSwwQkFBTSxDQUFFO0FBSmhCO0FBRndCLEtBQWxCLENBQWxCOztBQVVBLFNBQUtULFNBQUwsQ0FBZVUsTUFBZixDQUFzQlYsU0FBdEIsQ0FBZ0Msc0JBQWhDLElBQTBELFVBQUFXLE9BQU8sRUFBSTtBQUNuRSxVQUFNQyxJQUFTLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxPQUFYLENBQWxCO0FBQ0FJLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZO0FBQUVKLFFBQUFBLElBQUksRUFBSkE7QUFBRixPQUFaOztBQUNBLE1BQUEsS0FBSSxDQUFDUixVQUFMLENBQWdCYSxTQUFoQixDQUEwQkMsTUFBMUIsQ0FBaUNOLElBQWpDO0FBQ0QsS0FKRDs7QUFNQSxTQUFLVixHQUFMLENBQVNRLE1BQVQsQ0FBZ0JSLEdBQWhCLENBQW9CLGdCQUFwQixJQUF3QyxVQUFDUyxPQUFELEVBQThCO0FBQ3BFLFVBQUksQ0FBQ0EsT0FBTyxDQUFDUSxJQUFiLEVBQW1CO0FBQ25CLFVBQU1QLElBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdILE9BQU8sQ0FBQ1EsSUFBbkIsQ0FBbEI7QUFDQUosTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk7QUFBRUosUUFBQUEsSUFBSSxFQUFKQTtBQUFGLE9BQVo7QUFDQSxVQUFJLENBQUMsS0FBSSxDQUFDUixVQUFMLENBQWdCYSxTQUFoQixDQUEwQlgsUUFBL0IsRUFBeUM7O0FBQ3pDLE1BQUEsS0FBSSxDQUFDRixVQUFMLENBQWdCYSxTQUFoQixDQUEwQlgsUUFBMUIsQ0FBbUNHLGNBQW5DLEdBQW9ELFVBQUFELEdBQUcsRUFBSTtBQUN6RCxRQUFBLEtBQUksQ0FBQ0MsY0FBTCxDQUFvQkQsR0FBcEIsRUFBeUIsS0FBSSxDQUFDTixHQUE5QixFQUFtQ1MsT0FBTyxDQUFDUyxNQUEzQztBQUNELE9BRkQ7O0FBR0EsTUFBQSxLQUFJLENBQUNoQixVQUFMLENBQWdCYSxTQUFoQixDQUEwQkMsTUFBMUIsQ0FBaUNOLElBQWpDO0FBQ0QsS0FURDtBQVVEOzs7O21DQUVzQkosRyxFQUFVTixHLEVBQVU7QUFDekMsVUFBTW1CLEdBQUcsR0FBR1IsSUFBSSxDQUFDUyxTQUFMLENBQWVkLEdBQWYsQ0FBWjtBQUNBLFVBQU1lLE9BQU8sR0FBRyxLQUFLekIsR0FBTCxDQUFTMEIsQ0FBVCxDQUFXQyxhQUFYLEVBQWhCO0FBQ0EsVUFBSSxDQUFDRixPQUFMLEVBQWM7QUFDZHJCLE1BQUFBLEdBQUcsQ0FBQ3dCLElBQUosQ0FBU0gsT0FBTyxDQUFDLENBQUQsQ0FBaEIsRUFBcUI7QUFBRUosUUFBQUEsSUFBSSxFQUFFRTtBQUFSLE9BQXJCO0FBQ0Q7OzttQ0FFc0JiLEcsRUFBVU4sRyxFQUFVa0IsTSxFQUFnQjtBQUN6RCxVQUFNQyxHQUFHLEdBQUdSLElBQUksQ0FBQ1MsU0FBTCxDQUFlZCxHQUFmLENBQVo7QUFDQU4sTUFBQUEsR0FBRyxDQUFDd0IsSUFBSixDQUFTTixNQUFULEVBQWlCO0FBQUVELFFBQUFBLElBQUksRUFBRUU7QUFBUixPQUFqQjtBQUNEOzs7Z0NBRVdNLFEsRUFBa0JDLE0sRUFBZ0JDLEksRUFBd0I7QUFDcEUsVUFBTUMsSUFBSSxHQUFHLEtBQUsxQixVQUFMLENBQWdCMkIsZUFBaEIsQ0FBZ0NKLFFBQWhDLEVBQTBDQyxNQUExQyxFQUFrREMsSUFBbEQsQ0FBYjtBQUNBLFVBQUksQ0FBQ0MsSUFBTCxFQUFXO0FBQ1gsVUFBTXRCLEdBQVEsR0FBRztBQUFFd0IsUUFBQUEsSUFBSSxFQUFFQyxtQkFBUUMsV0FBaEI7QUFBNkJDLFFBQUFBLElBQUksRUFBRUw7QUFBbkMsT0FBakI7QUFDQSxVQUFNVCxHQUFHLEdBQUdSLElBQUksQ0FBQ1MsU0FBTCxDQUFlZCxHQUFmLENBQVo7QUFDQSxXQUFLUixTQUFMLENBQWVBLFNBQWYsQ0FBeUJxQixHQUF6QjtBQUNEOzs7Ozs7Ozs7Ozs7O3VCQUdxQixLQUFLakIsVUFBTCxDQUFnQmdDLElBQWhCLEU7OztBQUFkQyxnQkFBQUEsSztBQUNBN0IsZ0JBQUFBLEcsR0FBVztBQUFFd0Isa0JBQUFBLElBQUksRUFBRUMsbUJBQVFLLFFBQWhCO0FBQTBCSCxrQkFBQUEsSUFBSSxFQUFFRTtBQUFoQyxpQjtBQUNYaEIsZ0JBQUFBLEcsR0FBTVIsSUFBSSxDQUFDUyxTQUFMLENBQWVkLEdBQWYsQztBQUNaLHFCQUFLUixTQUFMLENBQWVBLFNBQWYsQ0FBeUJxQixHQUF6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLYWRlbWxpYSBmcm9tIFwia2FkLXJ0Y1wiO1xuaW1wb3J0IEJyb2FkY2FzdCBmcm9tIFwia2FkLXJ0Yy9saWIvbm9kZS9icm9hZGNhc3RcIjtcbmltcG9ydCBQMlAgZnJvbSBcImthZC1ydGMvbGliL25vZGUvcDJwXCI7XG5pbXBvcnQgeyBwMnBNZXNzYWdlRXZlbnQgfSBmcm9tIFwia2FkLXJ0Yy9saWIva2FkL2ludGVyZmFjZVwiO1xuaW1wb3J0IEJsb2NrQ2hhaW5BcHAgZnJvbSBcImJsb2NrY2hhaW4tdHNcIjtcbmltcG9ydCB7IElUcmFuc2FjdGlvbkRhdGEgfSBmcm9tIFwiYmxvY2tjaGFpbi10cy9saWIvYmxvY2tjaGFpbi9ibG9ja2NoYWluXCI7XG5pbXBvcnQgeyBSUEMsIHR5cGVSUEMgfSBmcm9tIFwiYmxvY2tjaGFpbi10cy9saWIvYmxvY2tjaGFpbi9yZXNwb25kZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29yayB7XG4gIGthZDogS2FkZW1saWE7XG4gIGJyb2FkY2FzdDogQnJvYWRjYXN0O1xuICBibG9ja2NoYWluOiBCbG9ja0NoYWluQXBwO1xuICBwMnA6IFAyUDtcbiAgY29uc3RydWN0b3Ioa2FkOiBLYWRlbWxpYSwgcGhyYXNlPzogc3RyaW5nKSB7XG4gICAgdGhpcy5rYWQgPSBrYWQ7XG4gICAgdGhpcy5icm9hZGNhc3QgPSBuZXcgQnJvYWRjYXN0KGthZCk7XG4gICAgdGhpcy5wMnAgPSBuZXcgUDJQKGthZCk7XG4gICAgdGhpcy5ibG9ja2NoYWluID0gbmV3IEJsb2NrQ2hhaW5BcHAoe1xuICAgICAgcGhyYXNlLFxuICAgICAgY2FsbGJhY2s6IHtcbiAgICAgICAgbGlzdGVuQ29uZmxpY3Q6IHJwYyA9PiB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5Db25mbGljdChycGMsIHRoaXMucDJwKTtcbiAgICAgICAgfSxcbiAgICAgICAgYW5zd2VyQ29uZmxpY3Q6ICgpID0+IHt9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmJyb2FkY2FzdC5ldmVudHMuYnJvYWRjYXN0W1wibmV0d29yay50cyBicm9hZGNhc3RcIl0gPSBuZXR3b3JrID0+IHtcbiAgICAgIGNvbnN0IGpzb246IFJQQyA9IEpTT04ucGFyc2UobmV0d29yayk7XG4gICAgICBjb25zb2xlLmxvZyh7IGpzb24gfSk7XG4gICAgICB0aGlzLmJsb2NrY2hhaW4ucmVzcG9uZGVyLnJ1blJQQyhqc29uKTtcbiAgICB9O1xuXG4gICAgdGhpcy5wMnAuZXZlbnRzLnAycFtcIm5ldHdvcmsudHMgcDJwXCJdID0gKG5ldHdvcms6IHAycE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgaWYgKCFuZXR3b3JrLnRleHQpIHJldHVybjtcbiAgICAgIGNvbnN0IGpzb246IFJQQyA9IEpTT04ucGFyc2UobmV0d29yay50ZXh0KTtcbiAgICAgIGNvbnNvbGUubG9nKHsganNvbiB9KTtcbiAgICAgIGlmICghdGhpcy5ibG9ja2NoYWluLnJlc3BvbmRlci5jYWxsYmFjaykgcmV0dXJuO1xuICAgICAgdGhpcy5ibG9ja2NoYWluLnJlc3BvbmRlci5jYWxsYmFjay5hbnN3ZXJDb25mbGljdCA9IHJwYyA9PiB7XG4gICAgICAgIHRoaXMuYW5zd2VyQ29uZmxpY3QocnBjLCB0aGlzLnAycCwgbmV0d29yay5ub2RlSWQpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuYmxvY2tjaGFpbi5yZXNwb25kZXIucnVuUlBDKGpzb24pO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkNvbmZsaWN0KHJwYzogUlBDLCBwMnA6IFAyUCkge1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7ICAgIFxuICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmthZC5mLmdldEFsbFBlZXJJZHMoKTtcbiAgICBpZiAoIXRhcmdldHMpIHJldHVybjtcbiAgICBwMnAuc2VuZCh0YXJnZXRzWzBdLCB7IHRleHQ6IHN0ciB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYW5zd2VyQ29uZmxpY3QocnBjOiBSUEMsIHAycDogUDJQLCBub2RlSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7ICAgIFxuICAgIHAycC5zZW5kKG5vZGVJZCwgeyB0ZXh0OiBzdHIgfSk7XG4gIH1cblxuICB0cmFuc2FjdGlvbihyZWNpcGVudDogc3RyaW5nLCBhbW91bnQ6IG51bWJlciwgZGF0YTogSVRyYW5zYWN0aW9uRGF0YSkge1xuICAgIGNvbnN0IHRyYW4gPSB0aGlzLmJsb2NrY2hhaW4ubWFrZVRyYW5zYWN0aW9uKHJlY2lwZW50LCBhbW91bnQsIGRhdGEpO1xuICAgIGlmICghdHJhbikgcmV0dXJuO1xuICAgIGNvbnN0IHJwYzogUlBDID0geyB0eXBlOiB0eXBlUlBDLlRSQU5TQUNSSU9OLCBib2R5OiB0cmFuIH07XG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkocnBjKTtcbiAgICB0aGlzLmJyb2FkY2FzdC5icm9hZGNhc3Qoc3RyKTtcbiAgfVxuXG4gIGFzeW5jIG1pbmUoKSB7XG4gICAgY29uc3QgYmxvY2sgPSBhd2FpdCB0aGlzLmJsb2NrY2hhaW4ubWluZSgpO1xuICAgIGNvbnN0IHJwYzogUlBDID0geyB0eXBlOiB0eXBlUlBDLk5FV0JMT0NLLCBib2R5OiBibG9jayB9O1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHJwYyk7XG4gICAgdGhpcy5icm9hZGNhc3QuYnJvYWRjYXN0KHN0cik7XG4gIH1cbn1cbiJdfQ==