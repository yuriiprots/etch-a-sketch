const container = document.getElementById("myContainer");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const cleanBtn = document.getElementById("cleanBtn");

// const colorDivs = container.querySelectorAll("div.colour-effect");

let isMouseDown = false;

createGrid(16, 16);

sizeSlider.addEventListener("input", function () {
  sizeValue.textContent = `${this.value} x ${this.value}`;
  createGrid(this.value, this.value);
});

function addColour() {
  this.classList.add("colour-effect");
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
      newCell.addEventListener("mousemove", function () {
        if (isMouseDown) this.classList.add("colour-effect");
      });
      newCell.addEventListener("dragstart", function (event) {
        event.preventDefault();
      });

      newColumn.appendChild(newCell);
    }
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

function removeGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// const columns = container.children;
// for (let i = 0; i < numberOfColumn; i++) {
//   const column = columns[i];

//   for (let j = 0; j < numberOfDivsPerColumn; j++) {
//     if (column.children[j].classList.contains("colour-effect")) {
//       const cell = column.children[j];
//       cell.classList.remove("colour-effect");
//     }
//   }

document.addEventListener("mousedown", function () {
  isMouseDown = true;
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});
