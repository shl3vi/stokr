(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function createStockListItems(stockListItems) {
    let liHtml = '';
    stockListItems.forEach((stock) => {
      liHtml += createStockListItem(stock);
    });
    return liHtml;
  }

  function createStockListItem(stockItem) {
    const stockLi = `
      <li data-id="${stockItem.Symbol}">
        <div class="line-container">
          <span class="comp-name">${stockItem.Name}</span>
          <div class="line-container-right">
            <div class="comp-stock-price-container">
              <span class="comp-stock-price">${utils.toFixed(stockItem.LastTradePriceOnly)}</span>
            </div>
            <div class="daily-change-container">
              <button ${getDailyChangeButtonClass(stockItem)}>${stockItem.dailyChange}</button>
            </div>
            <div class="up-down-buttons-container">
              <div class="up-down-buttons">
                <button class="reorder-arrow reorder-up"></button>
                <button class="reorder-arrow reorder-down"></button>
              </div>
            </div>
          </div>
        </div>
      </li>`;

    return stockLi;
  }

  function createFilterForm() {
    const form = `
      <div id="filter-main-div">
        <form action="">
          <div>
            <div>
              <label for="">By Name<input type="text"></label>
              <label for="">By Gain
                <select>
                  <option value="A">AAA</option>
                  <option value="B">BBB</option>
                </select>
              </label>
            </div>
            <div>
              <label for="">By Range: From<input type="text"></label>
              <label for="">By Range: To<input type="text"></label>
            </div>
          </div>
          <div id="filter-submit-container">
            <button></button>
          </div>
        </form>
       </div>
      `;

    return form;
  }

  function getDailyChangeButtonClass(stockItem) {
    let style = "daily-change-positive";
    if (stockItem.Change < 0) {
      style = "daily-change-negative";
    }

    return `class="daily-change ${style}"`;
  }

  function functionalButtonClickHandler(state) {
    utils.invokeListeners(window.Stokr.MainPageView, "onFunctionalButtonClicked", state);
  }

  function addEvents() {
    document.querySelector('.stocks-list').addEventListener('click', (e) => {
      const clickedElement = e.target;
      if (clickedElement.className.includes('daily-change')) {
        dailyChangeButtonClickHandler();
      }
      else if (clickedElement.className.includes('reorder-arrow')) {
        reorderArrowClickHandler(clickedElement);
      }
    });

    document.querySelector('.functional-buttons-container').addEventListener('click', (e) => {
      const clickedElement = e.target;
      if (clickedElement.className.includes('main-view-button')) {
        const state = clickedElement.dataset["state"];
        functionalButtonClickHandler(state);
      }
    });
  }

  function dailyChangeButtonClickHandler() {
    utils.invokeListeners(window.Stokr.MainPageView, "onDailyChangeButtonClicked");
  }


  function renderBaseTemplate() {
    let contentContainer = document.querySelector('.content-container');

    let baseTemplate = `<header>
            <div class="stokr-logo-container">
              <span>stokr</span>
            </div>
            <div class="functional-buttons-container">
              ${createFunctionalButtons()}
            </div>
          </header>
          <main>
            <ul class="stocks-list"></ul>
          </main>`;

    contentContainer.innerHTML = baseTemplate;
  }

  function createFunctionalButtons() {
    return `
      <div>
        <button><a class="icon-search" href="#search"></a></button>
      </div>
      <div>
        <button class="icon-refresh main-view-button" data-state="refresh"></button>
      </div>
      <div>
        <button class="icon-filter main-view-button" data-state="filter""></button>
      </div>
      <div>
        <button class="icon-settings main-view-button" data-state="settings"></button>
      </div>
      `;
  }

  function renderPage(stockListItems, uiState) {
    renderBaseTemplate();

    const STOCKS_UL = document.querySelector('.stocks-list');
    STOCKS_UL.innerHTML = "";

    if (uiState === "filter") {
        STOCKS_UL.innerHTML = createFilterForm();
    }

    STOCKS_UL.innerHTML += createStockListItems(stockListItems);

    if (uiState === "settings") {
      // add before to delete
    }
  }

  function reorderArrowClickHandler(arrow) {
    let parentLi = utils.getParentByTag(arrow, 'LI');
    const symbol = parentLi.getAttribute('data-id');
    if (arrow.className.includes('reorder-up')) {
      utils.invokeListeners(window.Stokr.MainPageView, "onReorderArrowUpClicked", symbol);
    } else if (arrow.className.includes('reorder-down')) {
      utils.invokeListeners(window.Stokr.MainPageView, "onReorderArrowDownClicked", symbol);
    }
  }

  window.Stokr.MainPageView = {

    eventsListeners : {
      onDailyChangeButtonClicked : [],
      onReorderArrowUpClicked : [],
      onReorderArrowDownClicked : [],
      onFunctionalButtonClicked: []
    },

    renderPage,
    addEvents
  }

})();
