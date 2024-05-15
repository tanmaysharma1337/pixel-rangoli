let selectedPencilColor = "black";
let mouseEvent = null;

function initDrawingBoard(width, height) {
  const boardContainer = document.querySelector(".right-container")
  boardContainer.innText = "";
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
  boardContainer.appendChild(grid);
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

function initTools()
{
  document.getElementById("color-picker").addEventListener("change",function (){
    selectedPencilColor = this.value
  })
  document.getElementById("eraser-tool").addEventListener("click",function (){
    selectedPencilColor = "white"
  })
}

initDrawingBoard(20, 20);
initTools()
