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
    let state = Model.getStokrState();
    state.ui.isFilterShown = false;
    state.ui.isSettings = false;
    Model.setStokrState(state);
    MainPageCtrl.render();
  }

  function onFilterView() {
    let state = Model.getStokrState();
    state.ui.isFilterShown = true;
    state.ui.isSettings = false;
    Model.setStokrState(state);
    MainPageCtrl.render();
  }

  function onSettingsView() {
    let state = Model.getStokrState();
    state.ui.isFilterShown = false;
    state.ui.isSettings = true;
    Model.setStokrState(state);
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
