(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function addEvents() {
  }

  function renderPage() {
    let contentContainer = document.querySelector('.content-container');
    let backRef = `<a href="#">BACK</a>`;
    contentContainer.innerHTML = backRef;
  }

  window.Stokr.SearchPageView = {

    eventsListeners : {
    },

    renderPage,
    addEvents
  }

})();
