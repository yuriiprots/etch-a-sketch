const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const cleanBtn = document.getElementById("cleanBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const buttons = document.querySelectorAll("button");
const container = document.getElementById("myContainer");

let isMouseDown = false;

colorBtn.addEventListener("click", colorMode);
rainbowBtn.addEventListener("click", rainbowMode);
eraserBtn.addEventListener("click", eraserMode);
cleanBtn.addEventListener("click", cleanGrid);
sizeSlider.addEventListener("input", handleSizeSliderChange);

startDefault();

function startDefault() {
  createGrid(16, 16);
  colorMode();
}

function handleSizeSliderChange() {
  const newSize = this.value;
  updateSizeText(newSize);
  createGrid(newSize, newSize);
  if (isButtonActive(colorBtn)) {
    colorMode();
  }
  if (isButtonActive(rainbowBtn)) {
    rainbowMode();
  }
}

function updateSizeText(size) {
  sizeValue.textContent = `${size} x ${size}`;
}

function isButtonActive(button) {
  return button.classList.contains("active");
}

function colorMode() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  columns.forEach((column) => {
    const cells = column.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleSingleColor);
      cell.addEventListener("mousemove", handleMouseMoveSingleColor);

      cell.removeEventListener("click", handleEraser);
      cell.removeEventListener("mousemove", handleMoveMouseEraser);
      cell.removeEventListener("click", handleRandomColor);
      cell.removeEventListener("mousemove", handleMoveMouseRandomColor);
    });
  });
}

function handleSingleColor() {
  this.style.backgroundColor = colorPicker.value;
}

function handleMouseMoveSingleColor() {
  if (isMouseDown) this.style.backgroundColor = colorPicker.value;
}

function rainbowMode() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  columns.forEach((column) => {
    const cells = column.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleRandomColor);
      cell.addEventListener("mousemove", handleMoveMouseRandomColor);

      cell.removeEventListener("click", handleSingleColor);
      cell.removeEventListener("mousemove", handleMouseMoveSingleColor);
      cell.removeEventListener("click", handleEraser);
      cell.removeEventListener("mousemove", handleMoveMouseEraser);
    });
  });
}

function handleRandomColor() {
  this.style.backgroundColor = randomColor();
}

function handleMoveMouseRandomColor() {
  if (isMouseDown && !this.hasAttribute("cell-colored")) {
    this.style.backgroundColor = randomColor();
    this.setAttribute("cell-colored", true);

    this.addEventListener("mouseleave", function () {
      this.removeAttribute("cell-colored");
    });
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function eraserMode() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  columns.forEach((column) => {
    const cells = column.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", handleEraser);
      cell.addEventListener("mousemove", handleMoveMouseEraser);

      cell.removeEventListener("click", handleSingleColor);
      cell.removeEventListener("mousemove", handleMouseMoveSingleColor);
      cell.removeEventListener("click", handleRandomColor);
      cell.removeEventListener("mousemove", handleMoveMouseRandomColor);
    });
  });
}

function handleEraser() {
  this.style.backgroundColor = "white";
}

function handleMoveMouseEraser() {
  if (isMouseDown) this.style.backgroundColor = "white";
}

function cleanGrid() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  columns.forEach((column) => {
    const cells = column.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.style.backgroundColor = "white";
    });
  });
}

function createGrid(numberOfColumn, numberOfDivsPerColumn) {
  if (!container) {
    console.log("Container not found");
    return;
  }
  removeGrid();
  for (let i = 0; i < numberOfColumn; i++) {
    const newColumn = createColumn();
    container.appendChild(newColumn);

    for (let j = 0; j < numberOfDivsPerColumn; j++) {
      const newCell = createCell();
      newColumn.appendChild(newCell);
    }
  }
}

function createColumn() {
  const newColumn = document.createElement("div");
  newColumn.className = "column";
  return newColumn;
}

function createCell() {
  const newCell = document.createElement("div");
  newCell.className = "cell";
  newCell.addEventListener("dragstart", handleDragStart);
  return newCell;
}

function removeGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function handleDragStart(event) {
  event.preventDefault();
}

document.addEventListener("mousedown", function () {
  isMouseDown = true;
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});

const handleButtonClick = (clickedButton) => {
  if (clickedButton.id !== "cleanBtn") {
    buttons.forEach((button) => button.classList.remove(`active`));
    clickedButton.classList.add("active");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button));
});
