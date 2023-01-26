class SearchInput extends HTMLElement {
  constructor() {
    super();
  }
 
  connectedCallback() {
    this.placeholder = this.getAttribute('placeholder') || null;

    this.innerHTML = `
      <form id="search-input-form">
        <input id="search-name" type="text" placeholder="${this.placeholder}">
        <button id="search-button" type="submit">Search</button>
      </form>
    `;
  }
}
 
customElements.define('search-input', SearchInput);
