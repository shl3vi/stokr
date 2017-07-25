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

  function getDailyChangeButtonClass(stockItem) {
    let style = "daily-change-positive";
    if (stockItem.Change < 0) {
      style = "daily-change-negative";
    }

    return `class="daily-change ${style}"`;
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
  }

  function dailyChangeButtonClickHandler(btn) {
    const Controller = window.Stokr.MainPageCtrl;
    Controller.toggleDailyChangeState();

    let ulParent = utils.getParentByTag(btn, 'UL');
    let childLis = ulParent.querySelectorAll('li');
    childLis.forEach((li) => {
      changeLiDailyChange(li);
    });
  }

  function changeLiDailyChange(li) {
    const Controller = window.Stokr.MainPageCtrl;
    let symbol = li.getAttribute('data-id');

    let btn = li.querySelector('button');

    let elementData = Controller.getStockBySymbol(symbol);

    btn.innerHTML = Controller.getDailyChangeButtonValue(elementData);
  }

  function renderPage(stockListItems) {
    const STOCKS_UL = document.querySelector('.stocks-list');
    STOCKS_UL.innerHTML = createStockListItems(stockListItems);
  }

  function reorderArrowClickHandler(arrow) {
    const Controller = window.Stokr.MainPageCtrl;
    let parentLi = utils.getParentByTag(arrow, 'LI');
    const symbol = parentLi.getAttribute('data-id');
    if (arrow.className.includes('reorder-up')) {
      Controller.reorderArrowClickUpHandler(symbol);
    } else if (arrow.className.includes('reorder-down')) {
      Controller.reorderArrowClickDownHandler(symbol);
    }
  }

  window.Stokr.MainPageView = {
    renderPage,
    addEvents
  }

})();
