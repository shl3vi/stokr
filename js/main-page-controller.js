(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const Model = window.Stokr.Model;
  const View = window.Stokr.MainPageView;

  // function renderFirstTime() {
  //
  //   fetchStocks()
  //     .then(function (stocks) {
  //       Model.stocks = stocks;
  //
  //       Model.initStocksDisplayOrder();
  //
  //       const stockListItems = getOrderedStocks();
  //       View.renderFirstTime(stockListItems);
  //
  //       View.addEvents();
  //     })
  //     .catch(function (err) {
  //       console.log("Failed render stocks. Error: " + err);
  //     });
  // }

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

  function reorderArrowClickUpHandler(symbol) {
    Model.reorderStocksUp(symbol);
    View.renderPage(getOrderedStocks());
  }

  function reorderArrowClickDownHandler(symbol) {
    Model.reorderStocksDown(symbol);
    View.renderPage(getOrderedStocks());
  }

  function fetchStocks() {
    // url (required), options (optional)
    return fetch('mocks/stocks.json')
      .then(function (response) {
        return response.json();
      });
  }

  function getDailyChangeButtonValue(stockItem) {
    if (Model.dailyChangeStates[0] === consts.dailyChangeState.DAILY_CHANGE_STATE_PERCENTAGE) {
      return stockItem.PercentChange;
    } else if (Model.dailyChangeStates[0] === consts.dailyChangeState.DAILY_CHANGE_STATE_VALUE) {
      return utils.toFixed(stockItem.Change);
    }
  }

  function getStockBySymbol(symbol) {
    return Model.getStockBySymbol(symbol);
  }

  function toggleDailyChangeState() {
    Model.toggleDailyChangeState();
  }

  function renderPage() {
    fetchStocks()
      .then(function (stocks) {
        Model.stocks = stocks;

        Model.initStocksDisplayOrder();

        const stockListItems = getOrderedStocks();
        View.renderPage(getOrderedStocks(stockListItems));

        View.addEvents();
      })
      .catch(function (err) {
        console.log("Failed render stocks. Error: " + err);
      });

  }

  window.Stokr.MainPageCtrl = {
    renderPage,
    getOrderedStocks,
    getDailyChangeButtonValue,
    getStockBySymbol,
    reorderArrowClickDownHandler,
    reorderArrowClickUpHandler,
    toggleDailyChangeState,
  }
})();

/* Start page rendering flow */
// Controller.renderFirstTime();
//
// const FIVE_MIN_IN_MILI = 1080000;
// setInterval(() => {
//   View.renderPage(Controller.getOrderedStocks());
// }, FIVE_MIN_IN_MILI);

// Test Rendering..
// setInterval(()=> {
//   renderPage(stocksUL);
// }, 1000);
//
// setInterval(()=> {
//   stocks[0].Name = Date.now();
// }, 1000);

