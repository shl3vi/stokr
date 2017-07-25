(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const View = window.Stokr.View;

  function renderMainView() {
    View.renderMainView();
  }

  window.Stokr.Controller = {
    renderMainView
  };

  const Controller = window.Stokr.Controller;
  const MainPageCtrl = window.Stokr.MainPageCtrl;

  /* Start page rendering flow */
  Controller.renderMainView();

  MainPageCtrl.renderPage();
})();



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

