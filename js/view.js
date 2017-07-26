(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function renderMainView() {
    const pageTemplate = `
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
            <ul class="stocks-list"></ul>
          </main>
        </div>
      </div>
    `;

    document.querySelector('body').innerHTML = pageTemplate;

  }

  function createFunctionalButtons() {
    return `
      <div>
        <button><a class="icon-search" href="#search"></a></button>
      </div>
      <div>
        <button><a class="icon-refresh" href="#refresh"></a></button>
      </div>
      <div>
        <button><a class="icon-filter" href="#filter"></a></button>
      </div>
      <div>
        <button><a class="icon-settings" href="#settings"></a></button>
      </div>
      `;
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
