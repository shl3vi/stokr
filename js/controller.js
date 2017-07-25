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
