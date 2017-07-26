(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  const View = window.Stokr.SearchPageView;

  function renderPage() {
        View.renderPage();
        View.addEvents();
  }

  window.Stokr.SearchPageCtrl = {
    renderPage
  };

})();
