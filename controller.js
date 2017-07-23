const DAILY_CHANGE_STATE_PERCENTAGE = "percentage";
const DAILY_CHANGE_STATE_VALUE = "value";

let dailyChangeState = DAILY_CHANGE_STATE_PERCENTAGE;

function toggleDailyChangeState() {
  if (dailyChangeState === DAILY_CHANGE_STATE_PERCENTAGE) {
    dailyChangeState = DAILY_CHANGE_STATE_VALUE;
  } else if (dailyChangeState === DAILY_CHANGE_STATE_VALUE) {
    dailyChangeState = DAILY_CHANGE_STATE_PERCENTAGE;
  }
}

function renderFirstTime() {

  data.initStocksDisplayOrder();

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
  return `<div><button>A</button></div>
  <div><button>A</button></div>
  <div><button>A</button></div>
  <div><button>A</button></div>`;
}

function createStockListItems() {
  const len = data.stocks.length;
  let liHtml = '';
  for (let orderedIndex = 0; orderedIndex < len; orderedIndex++) {
    let actualIndex = data.stocksDisplayOrder[orderedIndex];
    liHtml += createStockListItem(data.stocks[actualIndex], orderedIndex);
  }
  return liHtml;
}

function createStockListItem(stockItem, orderedIndex) {
  const stockLi = `
  <li data-id="${orderedIndex}">
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
  if (dailyChangeState === DAILY_CHANGE_STATE_PERCENTAGE) {
    return stockItem.PercentChange;
  } else if (dailyChangeState === DAILY_CHANGE_STATE_VALUE) {
    return utils.toFixed(stockItem.Change);
  }
}

function renderPage() {
  STOCKS_UL.innerHTML = createStockListItems();
}

function reorderArrowClickHandler(arrow) {
    let parentLi = getParentByTag(arrow, 'LI');
    if (arrow.className.includes('reorder-up')){
      data.reorderStocksUp(parentLi.getAttribute('data-id'));
    }else if(arrow.className.includes('reorder-down')) {
      data.reorderStocksDown(parentLi.getAttribute('data-id'));
    }

    STOCKS_UL.innerHTML = createStockListItems();
}

function addEvents() {
  document.querySelector('.stocks-list').addEventListener('click', (e) => {
    const clickedElement = e.target;
    if (clickedElement.className.includes('daily-change')) {
      dailyChangeButtonClickHandler(clickedElement);
    }
    else if(clickedElement.className.includes('reorder-arrow')) {
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
  toggleDailyChangeState();

  let ulParent = getParentByTag(btn, 'UL');
  let childLis = ulParent.querySelectorAll('li');
  childLis.forEach((li) => {
    changeLiDailyChange(li);
  });
}

function changeLiDailyChange(li) {
  let orderedIndex = li.getAttribute('data-id');

  let btn = li.querySelector('button');

  let elementData = data.stocks[data.stocksDisplayOrder[orderedIndex]];

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

