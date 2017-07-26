(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function addEvents() {
  }

  function renderPage() {
    const stocksList = document.querySelector('.stocks-list');
    stocksList.innerHTML = "";
  }

  window.Stokr.SearchPageView = {

    eventsListeners : {
    },

    renderPage,
    addEvents
  }

})();
