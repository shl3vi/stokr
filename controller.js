(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const Model = window.Stokr.Model;
  // const View = window.Stokr.View;

  const DAILY_CHANGE_STATE_PERCENTAGE = "percentage";
  const DAILY_CHANGE_STATE_VALUE = "value";

  let dailyChangeState = DAILY_CHANGE_STATE_PERCENTAGE;

  function renderFirstTime() {

    Model.initStocksDisplayOrder();
    Model.dailyChangeState = Model.dailyChangeStates.DAILY_CHANGE_STATE_PERCENTAGE;

    const stocksListPageTemplate = `
<div class="Stocks-List-Page">
  <div class="content-container">
  <header>
  <div class="stokr-logo-container">
  <span>stokr</span>
  </div>
  <div class="functional-buttons-container">
  ${createFunctionalButtons()}
  </div>
  </header>
  <main>
  <ul class="stocks-list">${createStockListItems()}</ul>
  </main>
  </div>
  </div>
`;

    document.querySelector('body').innerHTML = stocksListPageTemplate;
    addEvents();
  }

  function createFunctionalButtons() {
    return `<div><button class="icon-search"></button></div>
  <div><button class="icon-refresh"></button></div>
  <div><button class="icon-a"></button></div>
  <div><button class="icon-settings"></button></div>`;
  }

  function createStockListItems() {
    const len = Model.getStocksSize();
    let liHtml = '';
    for (let i = 0; i < len; i++) {
      liHtml += createStockListItem(Model.getStockByIndex(i));
    }
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
  <button ${getDailyChangeButtonClass(stockItem)}>${getDailyChangeButtonValue(stockItem)}</button>
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


  function getDailyChangeButtonClass(stockItem) {
    let style = "daily-change-positive";
    if (stockItem.Change < 0) {
      style = "daily-change-negative";
    }

    return `class="daily-change ${style}"`;
  }

  function getDailyChangeButtonValue(stockItem) {
    if (Model.dailyChangeState === Model.dailyChangeStates.DAILY_CHANGE_STATE_PERCENTAGE) {
      return stockItem.PercentChange;
    } else if (Model.dailyChangeState === Model.dailyChangeStates.DAILY_CHANGE_STATE_VALUE) {
      return utils.toFixed(stockItem.Change);
    }
  }

  function renderPage() {
    STOCKS_UL.innerHTML = createStockListItems();
  }

  function reorderArrowClickHandler(arrow) {
    let parentLi = getParentByTag(arrow, 'LI');
    if (arrow.className.includes('reorder-up')) {
      Model.reorderStocksUp(parentLi.getAttribute('data-id'));
    } else if (arrow.className.includes('reorder-down')) {
      Model.reorderStocksDown(parentLi.getAttribute('data-id'));
    }

    STOCKS_UL.innerHTML = createStockListItems();
  }

  function addEvents() {
    document.querySelector('.stocks-list').addEventListener('click', (e) => {
      const clickedElement = e.target;
      if (clickedElement.className.includes('daily-change')) {
        dailyChangeButtonClickHandler(clickedElement);
      }
      else if (clickedElement.className.includes('reorder-arrow')) {
        reorderArrowClickHandler(clickedElement);
      }
    });

    // document.querySelector('.up-down-buttons button:first-child').addEventListener('click', (e) => {
    //   // go up;
    //   console.log("Hello");
    //   const clickedElement = e.target;
    //
    //   let liParent = getParentByTag(clickedElement, 'LI');
    //   console.log(liParent);
    //   console.log(liParent.previousSibling);
    //   if (liParent.previousSibling) {
    //     liParent.parentNode.insertBefore(liParent, liParent.previousSibling);
    //   }
    // });

    // document.querySelector('.up-down-buttons button:last-child').addEventListener('click', (e) => {
    //   const clickedElement = e.target;
    // });
  }

  function dailyChangeButtonClickHandler(btn) {
    Model.toggleDailyChangeState();

    let ulParent = getParentByTag(btn, 'UL');
    let childLis = ulParent.querySelectorAll('li');
    childLis.forEach((li) => {
      changeLiDailyChange(li);
    });
  }

  function changeLiDailyChange(li) {
    let symbol = li.getAttribute('data-id');

    let btn = li.querySelector('button');

    let elementData = Model.getStockBySymbol(symbol);

    btn.innerHTML = getDailyChangeButtonValue(elementData);
  }

  function getParentByTag(element, tag) {
    let parent = element.parentElement;
    while (parent) {
      if (parent.tagName === tag) {
        return parent;
      }
      parent = parent.parentElement;
    }
  }

  /* Start page rendering flow */

  renderFirstTime();

  const STOCKS_UL = document.querySelector('.stocks-list');

  const FIVE_MIN_IN_MILI = 1080000;
  setInterval(() => {
    const stocksUL = document.querySelector('.stocks-list');
    renderPage(stocksUL);
  }, FIVE_MIN_IN_MILI);

// Test Rendering..
// setInterval(()=> {
//   renderPage(stocksUL);
// }, 1000);
//
// setInterval(()=> {
//   stocks[0].Name = Date.now();
// }, 1000);

})();
