class CardPokemon extends HTMLElement {
  constructor() {
    super();
  }
 
  connectedCallback() {
    this.name = this.getAttribute('name') || null;
    this.hp = this.getAttribute('hp') || null;
    this.image = this.getAttribute('image') || null;
    this.atk = this.getAttribute('atk') || null;
    this.def = this.getAttribute('def') || null;
    this.abilities = this.getAttribute('abilities') || [];
 
    this.innerHTML = `
      <div class="header">
        <p>${this.name}</p>
        <p>HP: <span>${this.hp}<span></p>
      </div>
      <div class="image-wrapper">
        <img src="${this.image}" />
      </div>
      <div class="body">
        <p>ATK: ${this.atk}</p>
        <p>DEF: ${this.def}</p>
      </div>
      <div class="footer">
        <p>Abilities</p>
        <div class="list">
          <p>${this.abilities}</p>
        </div>
      </div>
    `;
  }
}
 
customElements.define('card-pokemon', CardPokemon);
