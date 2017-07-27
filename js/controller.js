(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const Model = window.Stokr.Model;
  const View = window.Stokr.View;

  function renderInnerView() {
    let newHash = window.location.hash;
    if (!newHash) {
      newHash = "#";
    }
    controllersHashesToRenderFunction[newHash]();
  }

  function renderMainView() {
    View.renderMainView();
    View.addEvents();
  }

  window.Stokr.Controller = {
    renderMainView
  };

  const MainPageCtrl = window.Stokr.MainPageCtrl;
  const SearchPageCtrl = window.Stokr.SearchPageCtrl;

  const controllersHashesToRenderFunction = {
    "#search": SearchPageCtrl.renderPage,
    "#": MainPageCtrl.render,
  };

  utils.addEventListener(View, "onHashChanged", function () {
    renderInnerView();
  });

  const Controller = window.Stokr.Controller;

  renderMainView();
  renderInnerView();
})();
