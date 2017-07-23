(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function reorderStocksUp(symbol) {
    const index = this.getStockIndexBySymbol(symbol);
    this.reorderStocks(index, index - 1, 0);
  }

  function reorderStocksDown(symbol) {
    const index = this.getStockIndexBySymbol(symbol);
    const lastIndex = this.stocksDisplayOrder.length - 1;
    this.reorderStocks(index, index + 1, lastIndex);
  }

  function reorderStocks(index, indexToSwapWith, exceptionIndex) {
    if (index === exceptionIndex) {
      return;
    }
    utils.swapInArray(this.stocksDisplayOrder, index, indexToSwapWith);
  }

  function getStockBySymbol(symbol) {
    return this.stocks.find((stock) => {
      return stock.Symbol === symbol;
    })
  }

  function getStockByIndex(index) {
    return this.getStockBySymbol(this.stocksDisplayOrder[index]);
  }

  function getStockIndexBySymbol(symbol) {
    return this.stocksDisplayOrder.findIndex((stockSymbol) => {
      return stockSymbol === symbol;
    })
  }

  function initStocksDisplayOrder() {
    this.stocks.forEach((stock) => {
      this.stocksDisplayOrder.push(stock.Symbol);
    })
  }

  function getStocksSize() {
    return this.stocks.length;
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

    stocksDisplayOrder: [],

    reorderStocksDown,
    reorderStocksUp,
    getStockBySymbol,
    initStocksDisplayOrder,
    getStockIndexBySymbol,
    getStocksSize,
    getStockByIndex,
    reorderStocks
  }

})();
