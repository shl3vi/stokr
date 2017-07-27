(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const Model = window.Stokr.Model;
  const View = window.Stokr.MainPageView;

  const STOKR_SERVER = "http://localhost:7000";

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
    renderPage(getOrderedStocks(), Model.mainViewState);
  }

  function reorderArrowClickDownHandler(symbol) {
    Model.reorderStocksDown(symbol);
    renderPage(getOrderedStocks(), Model.mainViewState);
  }

  function fetchStocks() {
    const stocksQuery = createStocksQuery();
    return fetch(stocksQuery)
      .then(function (response) {
        return response.json();
      });
  }

  function createStocksQuery() {
    return STOKR_SERVER + "/quotes?q=" + Model.stocksDisplayOrder.toString();
  }

  function getDailyChangeButtonValue(stockItem) {
    if (Model.dailyChangeStates[0] === consts.dailyChangeState.DAILY_CHANGE_STATE_PERCENTAGE) {
      return utils.toFixed(stockItem.realtime_chg_percent);
    } else if (Model.dailyChangeStates[0] === consts.dailyChangeState.DAILY_CHANGE_STATE_VALUE) {
      return utils.toFixed(stockItem.realtime_change);
    }
  }

  function render() {
    fetchStocks()
      .then(function (stocks) {
        Model.stocks = stocks.query.results.quote;

        const stockListItems = getOrderedStocks();
        renderPage(getOrderedStocks(stockListItems), Model.mainViewState);
      })
      .catch(function (err) {
        console.log("Failed render stocks. Error: " + err);
      });

  }

  function functionalButtonClickedHandler(state) {
    Model.mainViewState = state;
    if (state === "refresh") {
      return render();
    }
    renderPage(Model.stocks, state);
  }

  function dailyChangeButtonClickHandler() {
    Model.toggleDailyChangeState();
    renderPage(getOrderedStocks(), Model.mainViewState);
  }

  function renderPage(stocks, state) {
    View.renderPage(stocks, state);
    View.addEvents();
  }

  window.Stokr.MainPageCtrl = {
    render
  };

  // register to the View's events
  utils.addEventListener(View, "onDailyChangeButtonClicked", dailyChangeButtonClickHandler);
  utils.addEventListener(View, "onReorderArrowUpClicked", reorderArrowClickUpHandler);
  utils.addEventListener(View, "onReorderArrowDownClicked", reorderArrowClickDownHandler);
  utils.addEventListener(View, "onFunctionalButtonClicked", functionalButtonClickedHandler);

})();
