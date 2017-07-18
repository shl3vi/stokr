let stocks = [
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
];

function renderFirstTime() {
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
  <ul class="stocks-list">${stocks.map(createStockListItem).join('')}</ul>
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

function createStockListItem(stockItem) {
  const stockLi = `
  <li data-id="${stockItem.Symbol}">
  <div class="line-container">
  <span class="comp-name">${stockItem.Name}</span>
<div class="line-container-right">
  <div class="comp-stock-price-container">
  <span class="comp-stock-price">${toFixed2(stockItem.LastTradePriceOnly)}</span>
  </div>
  <div class="daily-change-container">
  <button class="daily-change">${stockItem.PercentChange}</button>
  </div>
  <div class="up-down-buttons-container">
  <div class="up-down-buttons">
  <button></button>
  <button></button>
  </div>
  </div>
  </div>
  </div>
  </li>`;

  return stockLi;
}

function toFixed2(num) {
  return (Math.round(num * 100)/100).toFixed(2);
}

function renderPage(stocksUL){
  stocksUL.innerHTML = stocks.map(createStockListItem).join('');
}

function addEvents(){
}


/* Start page rendering flow */

renderFirstTime();

const FIVE_MIN_IN_MILI = 1080000;
setInterval(()=> {
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

