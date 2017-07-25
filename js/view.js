(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  function renderMainView() {
    const PageTemplate = `
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

    document.querySelector('body').innerHTML = PageTemplate;

  }

  function createFunctionalButtons() {
    return `
      <div>
        <button class="icon-search"></button>
      </div>
      <div>
        <button class="icon-refresh"></button>
      </div>
      <div>
        <button class="icon-filter"></button>
      </div>
      <div>
        <button class="icon-settings"></button>
      </div>
      `;
  }

  window.Stokr.View = {
    renderMainView
  }

})();
