let selectedPencilColor = "black"; // Current Selected Color
let mouseEvent = null; // Current Mouse event
let isSymmetryOn = false; // Drawing symmetry
let isEraserOn = false;
let isGridVisible = true;
let lastBackgroundColor = "white";
let hasTouchScreen = false;

if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
} 




//Randomize Application Header Text Colors
function randomizeHeaderTextColor()
{
  let Heading = document.getElementById("application-heading")
  const headingTextArray = Array.from(Heading.innerText)
  Heading.innerText = ""
  headingTextArray.forEach((value)=>{
    let Character = document.createElement("span");
    Character.innerText = value
    Character.style.color = "rgb("+Math.floor(Math.random()*250)+","+Math.floor(Math.random()*250)+","+Math.floor(Math.random()*250)+")"
    Heading.appendChild(Character)
  })
}

// Initialize Drawing board grid
function initDrawingBoard(width, height) {
  const boardContainer = document.querySelector(".right-container");
  boardContainer.innerText = "";
  let grid = document.createElement("table");
  let gridBody = document.createElement("tbody");
  gridBody.classList.add("grid-body-container");
  gridBody.classList.add("grid-visibility");
  grid.appendChild(gridBody);
  for (let i = 0; i < height; i++) {
    let gridRow = document.createElement("tr");
    for (let j = 0; j < width; j++) {
      let gridCell = document.createElement("td");
      gridCell.value = j;
      gridRow.appendChild(gridCell);
    }
    gridBody.appendChild(gridRow);
  }
  boardContainer.appendChild(grid);
  function addWindowEventListeners() {
    if(hasTouchScreen)
      {
        window.addEventListener("touchstart", (e) => {
          if (e.target.tagName == "TD") {
            e.preventDefault();
          }
          window.addEventListener("touchmove", drawPixelOnTouch, false);
        });
        window.addEventListener("touchend", () => {
          window.removeEventListener("touchmove", drawPixelOnTouch, false);
        });
      }
    else
    {
      window.addEventListener("mousedown", (e) => {
        if (e.target.tagName == "TD") {
          e.preventDefault();
        }
        window.addEventListener("mousemove", drawPixelOnClick, false);
      });
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", drawPixelOnClick, false);
      });
    }
    
  }
  addWindowEventListeners();
}

// Toolbar options initialization function
function initTools() {
  document
    .getElementById("color-picker")
    .addEventListener("change", function () {
      selectedPencilColor = this.value;
      if (isEraserOn) {
        isEraserOn = false;
        document.getElementById("eraser-tool").innerText = "Eraser : Off";
      }
    });
  document.getElementById("eraser-tool").addEventListener("click", function () {
    if (isEraserOn) {
      isEraserOn = false;
      this.querySelector("#toggle-status").innerText = "Off";
      selectedPencilColor = document.getElementById("color-picker").value;
    } else {
      isEraserOn = true;
      this.querySelector("#toggle-status").innerText = "On";
      selectedPencilColor = "white";
    }
  });
  document
    .getElementById("symmetry-tool")
    .addEventListener("click", function () {
      if (isSymmetryOn) {
        isSymmetryOn = false;
        this.querySelector("#toggle-status").innerText = "Off";
      } else {
        isSymmetryOn = true;
        this.querySelector("#toggle-status").innerText = "On";
      }
    });
  document
    .getElementById("grid-visibility-tool")
    .addEventListener("click", function () {
      if (isGridVisible) {
        isGridVisible = false;
        this.querySelector("#toggle-status").innerText = "Off";
        document
          .querySelector(".grid-body-container")
          .classList.remove("grid-visibility");
      } else {
        isGridVisible = true;
        this.querySelector("#toggle-status").innerText = "On";
        document
        .querySelector(".grid-body-container")
          .classList.add("grid-visibility");
      }
    });
  document
    .getElementById("background-color-picker")
    .addEventListener("change", function () {
      const gridBodyContainer = document.querySelector(
        ".grid-body-container"
      ).childNodes;

      const color = this.value
      const r = parseInt(color.substr(1,2), 16)
      const g = parseInt(color.substr(3,2), 16)
      const b = parseInt(color.substr(5,2), 16)
      const hexToRGBColor = "rgb("+r+", "+g+", "+b+")"

      for (let i = 0; i < gridBodyContainer.length; i++) {
        for (let j = 0; j < gridBodyContainer[i].childNodes.length; j++) {
          if (
            gridBodyContainer[i].childNodes[j].style.backgroundColor ==
              lastBackgroundColor ||
            !gridBodyContainer[i].childNodes[j].hasAttribute("style")
          ) {
            gridBodyContainer[i].childNodes[j].style.backgroundColor =
              this.value;
          }
        }
      }
      lastBackgroundColor = hexToRGBColor;
    });

    document.getElementById("grid-size-tool").addEventListener("change",function(){
      const selectedGridSize = this.value.split("x")
      initDrawingBoard(Number(selectedGridSize[0]), Number(selectedGridSize[1]));
    })
}

// Filling Pixel on grid cell function
function drawPixelOnClick(event) {
  if (event.target.tagName == "TD") {
    event.preventDefault();
    // Check if symmetry is on , if its on fill the required target
    if (isSymmetryOn) {
      const rowChilds = event.target.parentNode.childNodes;
      const targetIndex = event.target.value;
      rowChilds[rowChilds.length - targetIndex - 1].style.backgroundColor =
        selectedPencilColor;
    }
    event.target.style.backgroundColor = selectedPencilColor;
  }
}

function drawPixelOnTouch(event) {
  let target = document.elementFromPoint(event.changedTouches.item(0).clientX,event.changedTouches.item(0).clientY)

  if (target.tagName == "TD") {
    // Check if symmetry is on , if its on fill the required target
    if (isSymmetryOn) {
      const rowChilds = target.parentNode.childNodes;
      const targetIndex = target.value;
      rowChilds[rowChilds.length - targetIndex - 1].style.backgroundColor =
        selectedPencilColor;
    }
    target.style.backgroundColor = selectedPencilColor;
  }
}

randomizeHeaderTextColor()
initDrawingBoard(20, 20);
initTools();
setInterval(randomizeHeaderTextColor,400)

