(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const Model = window.Stokr.Model;
  const View = window.Stokr.MainPageView;

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

  function dailyChangeButtonClickHandler() {
    Model.toggleDailyChangeState();
    View.renderPage(getOrderedStocks());
  }

  window.Stokr.MainPageCtrl = {
    renderPage
  };

  // register to the View's events
  utils.addEventListener(View, "onDailyChangeButtonClicked", dailyChangeButtonClickHandler);
  utils.addEventListener(View, "onReorderArrowUpClicked", reorderArrowClickUpHandler);
  utils.addEventListener(View, "onReorderArrowDownClicked", reorderArrowClickDownHandler);

})();
