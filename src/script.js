class BinaryClock extends HTMLElement {
  constructor() {
    super();

    this.data = [];
    for (let i = 0; i < 4; i++)
      this.data.push([]);
  }

  connectedCallback() {
    let size = this.getAttribute("size") || 32;
    let color = this.getAttribute("color") || "#808080";

    if (this.hasAttribute("circle"))
      var borderRadius = 50;
    else if (this.hasAttribute("square"))
      var borderRadius = 0;
    else
      var borderRadius = 10;

    let table = document.createElement("table");
    for (let i = 0; i < 4; i++) {
      let row = table.insertRow(i);
      for (let j = 0; j < 6; j++)
        this.data[i].push(row.insertCell(j));
    }

    table.style.borderSpacing = 0.125 * size + "px";
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        this.data[i][j].style.width = size + "px";
        this.data[i][j].style.height = size + "px";
        this.data[i][j].style.borderRadius = borderRadius + "%";
        this.data[i][j].style.backgroundColor = color;
      }
    }

    this.appendChild(table);
    this.tick();
    setInterval(() => { this.tick() }, 1000);
  }

  tick() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let figures = [
      Math.floor(hours / 10), hours % 10,
      Math.floor(minutes / 10), minutes % 10,
      Math.floor(seconds / 10), seconds % 10
    ];

    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 6; j++)
        this.data[3-i][j].style.opacity = figures[j] & 2**i ? "1" : "0";
  }
}

customElements.define('binary-clock', BinaryClock);
