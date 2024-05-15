let selectedPencilColor = "orange";
let mouseEvent = null;

function initDrawingBoard(width, height) {
  let grid = document.createElement("table");
  let gridBody = document.createElement("tbody");
  grid.appendChild(gridBody);
  for (let i = 0; i < height; i++) {
    let gridRow = document.createElement("tr");
    for (let j = 0; j < width; j++) {
      let gridCell = document.createElement("td");
      gridRow.appendChild(gridCell);
    }
    gridBody.appendChild(gridRow);
  }
  document.body.appendChild(grid);
  function addWindowEventListeners() {
    window.addEventListener("mousedown", (e) => {
      e.preventDefault();
      window.addEventListener("mousemove", drawPixelOnClick, false);
    });
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", drawPixelOnClick, false);
    });
  }
  addWindowEventListeners();
}

function drawPixelOnClick(event) {
  if (event.target.tagName == "TD") {
    event.preventDefault();
    event.target.style.backgroundColor = selectedPencilColor;
  }
}

initDrawingBoard(20, 20);
