const container = document.getElementById("myContainer");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const cleanBtn = document.getElementById("cleanBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorBtn = document.getElementById("colorBtn");

// const colorDivs = container.querySelectorAll("div.colour-effect");

let isMouseDown = false;

createGrid(16, 16);

sizeSlider.addEventListener("input", function () {
  sizeValue.textContent = `${this.value} x ${this.value}`;
  createGrid(this.value, this.value);
});

colorBtn.addEventListener("click", addColour);

function addColour() {
  this.classList.add("colour-effect");
}

eraserBtn.addEventListener("click", function () {
  colorBtn.removeEventListener("click", addColour);
  eraserColour();
});

function eraserColour() {
  if (this.classList.contains("colour-effect")) {
    this.classList.remove("colour-effect");
  }
}

cleanBtn.addEventListener("click", removeColor);

function removeColor() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  for (let i = 0; i < columns.length; i++) {
    const colorDivs = columns[i].querySelectorAll(".colour-effect");
    for (let j = 0; j < colorDivs.length; j++) {
      colorDivs[j].classList.remove("colour-effect");
    }
  }
}

function createGrid(numberOfColumn, numberOfDivsPerColumn) {
  if (!container) {
    console.log("Container not found");
    return;
  }
  removeGrid();
  for (let i = 0; i < numberOfColumn; i++) {
    const newColumn = document.createElement("div");
    newColumn.className = "column";
    container.appendChild(newColumn);

    for (let j = 0; j < numberOfDivsPerColumn; j++) {
      const newCell = document.createElement("div");
      newCell.className = "cell";

      newCell.addEventListener("click", addColour);
      newCell.addEventListener("mousemove", addMoveMouse);
      newCell.addEventListener("dragstart", removeDragStart);

      newColumn.appendChild(newCell);
    }
  }
}

function removeGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// for (let i = 0; i < numberOfColumn; i++) {
//   const column = columns[i];
//   for (let j = 0; j < numberOfDivsPerColumn; j++) {
//     if (column.children[j].classList.contains("colour-effect")) {
//       const cell = column.children[j];
//       cell.classList.remove("colour-effect");
//     }
//   }
// }

// function cleanGrid(numberOfColumn) {
//   if (!container) {
//     console.log("Container not found");
//     return;
//   }
//   // container.removeChild(columns[0]);

//   while (numberOfColumn >= 0) {
//     container.removeChild(columns[0]);
//     numberOfColumn--;
//   }
// }

// const columns = container.children;
// for (let i = 0; i < numberOfColumn; i++) {
//   const column = columns[i];

//   for (let j = 0; j < numberOfDivsPerColumn; j++) {
//     if (column.children[j].classList.contains("colour-effect")) {
//       const cell = column.children[j];
//       cell.classList.remove("colour-effect");
//     }
//   }

function addMoveMouse() {
  if (isMouseDown) this.classList.add("colour-effect");
}

function removeDragStart(event) {
  event.preventDefault();
}

document.addEventListener("mousedown", function () {
  isMouseDown = true;
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});
