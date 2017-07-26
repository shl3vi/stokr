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

  function toggleDailyChangeState() {
    let currentDailyState = this.dailyChangeStates.shift();
    this.dailyChangeStates.push(currentDailyState);
  }

  window.Stokr.Model = {

    state : {
      ui : {
        isFilterShown : false
      }
    },

    dailyChangeStates: [
      consts.dailyChangeState.DAILY_CHANGE_STATE_PERCENTAGE,
      consts.dailyChangeState.DAILY_CHANGE_STATE_VALUE
    ],

    stocks: [],

    stocksDisplayOrder: [
      "WIX",
      "MSFT",
      "YHOO"
    ],

    reorderStocksDown,
    reorderStocksUp,
    getStockBySymbol,
    initStocksDisplayOrder,
    getStockIndexBySymbol,
    getStocksSize,
    getStockByIndex,
    reorderStocks,
    toggleDailyChangeState
  };

})();
