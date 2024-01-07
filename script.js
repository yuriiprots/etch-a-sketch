const container = document.getElementById("myContainer");
let isMouseDown = false;

function addColour() {
  this.classList.add("colour-effect");
}

function createGrid(numberOfColumn, numberOfDivsPerColumn) {
  if (!container) {
    console.log("Container not found");
    return;
  }

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

document.addEventListener("mousedown", function () {
  isMouseDown = true;
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});

createGrid(15, 15);

