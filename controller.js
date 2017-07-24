(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const Model = window.Stokr.Model;
  const View = window.Stokr.View;

  function renderFirstTime() {

    Model.initStocksDisplayOrder();
    Model.dailyChangeState = Model.dailyChangeStates.DAILY_CHANGE_STATE_PERCENTAGE;

    const stockListItems = getOrderedStocks();
    View.renderFirstTime(stockListItems);

    View.addEvents();
  }

  function getOrderedStocks() {
    const orderList = Model.stocksDisplayOrder;
    const orderedStocks = [];
    orderList.forEach((symbol) => {
      let stock = Model.getStockBySymbol(symbol);
      stock.dailyChange = getDailyChangeButtonValue(stock);
      orderedStocks.push(stock);
    });

    return orderedStocks;
  }

  function reorderArrowClickUpHandler(symbol){
    Model.reorderStocksUp(symbol);
    View.renderPage(getOrderedStocks());
  }

  function reorderArrowClickDownHandler(symbol){
    Model.reorderStocksDown(symbol);
    View.renderPage(getOrderedStocks());
  }

  function getDailyChangeButtonValue(stockItem) {
    if (Model.dailyChangeState === Model.dailyChangeStates.DAILY_CHANGE_STATE_PERCENTAGE) {
      return stockItem.PercentChange;
    } else if (Model.dailyChangeState === Model.dailyChangeStates.DAILY_CHANGE_STATE_VALUE) {
      return utils.toFixed(stockItem.Change);
    }
  }

  function getStockBySymbol(symbol) {
    return Model.getStockBySymbol(symbol);
  }

  function toggleDailyChangeState() {
    Model.toggleDailyChangeState();
  }

  window.Stokr.Controller = {
    renderFirstTime,
    getOrderedStocks,
    getDailyChangeButtonValue,
    getStockBySymbol,
    reorderArrowClickDownHandler,
    reorderArrowClickUpHandler,
    toggleDailyChangeState
  }
})();

const Controller = window.Stokr.Controller;

/* Start page rendering flow */

Controller.renderFirstTime();

const FIVE_MIN_IN_MILI = 1080000;
setInterval(() => {
  View.renderPage(Controller.getOrderedStocks());
}, FIVE_MIN_IN_MILI);

// Test Rendering..
// setInterval(()=> {
//   renderPage(stocksUL);
// }, 1000);
//
// setInterval(()=> {
//   stocks[0].Name = Date.now();
// }, 1000);

