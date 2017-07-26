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

  function onRefresh() {
    Model.state.ui.isFilterShown = false;
    Model.state.ui.isSettings = false;
    MainPageCtrl.render();
  }

  function onFilterView() {
    Model.state.ui.isFilterShown = true;
    Model.state.ui.isSettings = false;
    MainPageCtrl.render();
  }

  function onSettingsView() {
    Model.state.ui.isFilterShown = false;
    Model.state.ui.isSettings = true;
    MainPageCtrl.render();
  }

  function onSearchView() {
    SearchPageCtrl.renderPage();
  }

  window.Stokr.Controller = {
    renderMainView
  };

  const MainPageCtrl = window.Stokr.MainPageCtrl;
  const SearchPageCtrl = window.Stokr.SearchPageCtrl;

  const controllersHashesToRenderFunction = {
    "#search": onSearchView,
    "#": MainPageCtrl.renderPage,
    "#refresh": onRefresh,
    "#filter": onFilterView,
    "#settings": onSettingsView
  };

  utils.addEventListener(View, "onHashChanged", function (newHash) {
    renderInnerView();
  });

  const Controller = window.Stokr.Controller;

  renderMainView();
  renderInnerView();
})();
