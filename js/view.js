(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function renderMainView() {
    const pageTemplate = `
      <div class="Stocks-List-Page">
        <div class="content-container">
          
        </div>
      </div>
    `;

    document.querySelector('body').innerHTML = pageTemplate;

  }

  function addEvents() {
    window.addEventListener('hashchange', onHashChangeHandler);
  }

  function onHashChangeHandler() {
    utils.invokeListeners(window.Stokr.View, "onHashChanged")
  }

  window.Stokr.View = {

    eventsListeners : {
      onHashChanged : [],
      onFunctionalButtonsClicked : []
    },

    renderMainView,
    addEvents
  }

})();
