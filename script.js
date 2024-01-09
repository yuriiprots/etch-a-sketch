const container = document.getElementById("myContainer");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const cleanBtn = document.getElementById("cleanBtn");
const columns = container.querySelectorAll(".column");

let isMouseDown = false;

createGrid(16, 16);

sizeSlider.addEventListener("input", function () {
  sizeValue.textContent = `${this.value} x ${this.value}`;
  createGrid(this.value, this.value);
});

function addColour() {
  this.classList.add("colour-effect");
}

function createGrid(numberOfColumn, numberOfDivsPerColumn) {
  if (!container) {
    console.log("Container not found");
    return;
  }
  cleanGrid();
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

// function cleanColor(numberOfColumn, numberOfDivsPerColumn) {
//   if (!container) {
//     console.log("Container not found");
//     return;
//   }
//   const columns = container.children;
//   for (let i = 0; i < numberOfColumn; i++) {
//     const column = columns[i];
//     for (let j = 0; j < numberOfDivsPerColumn; j++) {
//       if (column.children[j].classList.contains("colour-effect")) {
//         const cell = column.children[j];
//         cell.classList.remove("colour-effect");
//       }
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

function cleanGrid() {
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

cleanBtn.addEventListener("click", cleanColor(numberOfColumn, numberOfDivsPerColumn));


document.addEventListener("mousedown", function () {
  isMouseDown = true;
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});
