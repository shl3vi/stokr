(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function initStocksDisplayOrder() {
    this.stocks.forEach((stock, index) => {
      index = parseInt(index);
      this.stocksDisplayOrder[index] = index;
    });
  }

  function reorderStocksUp(index) {
    index = parseInt(index);
    if (index === 0) {
      return;
    }

    utils.swapInArray(this.stocksDisplayOrder, index, index - 1);
  }

  function reorderStocksDown(index) {
    index = parseInt(index);
    const lastIndex = this.stocksDisplayOrder.length - 1;
    if (index === lastIndex) {
      return;
    }

    utils.swapInArray(this.stocksDisplayOrder, index, index + 1);
  }

  window.Stokr.Model = {

    stocks: [
      {
        "Symbol": "WIX",
        "Name": "Wix.com Ltd.",
        "Change": "0.750000",
        "PercentChange": "+1.51%",
        "LastTradePriceOnly": "76.099998"
      },
      {
        "Symbol": "MSFT",
        "Name": "Microsoft Corporation",
        "PercentChange": "-2.09%",
        "Change": "-0.850006",
        "LastTradePriceOnly": "69.620003"
      },
      {
        "Symbol": "YHOO",
        "Name": "Yahoo! Inc.",
        "Change": "0.279999",
        "PercentChange": "+1.11%",
        "LastTradePriceOnly": "50.599998"
      }
    ],

    stocksDisplayOrder : {},

    reorderStocksDown: reorderStocksDown,
    reorderStocksUp: reorderStocksUp,
    initStocksDisplayOrder: initStocksDisplayOrder
  }

})();
