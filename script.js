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
eraserBtn.addEventListener("click", eraserColour);
cleanBtn.addEventListener("click", removeColor);
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

function handleEraser() {
  this.style.backgroundColor = "white";
}

function handleMoveMouseEraser() {
  if (isMouseDown) this.style.backgroundColor = "white";
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

function rainbowMode() {
  if (!container) {
    console.log("Container not found");
    return;
  }

  const columns = container.querySelectorAll(".column");
  for (let i = 0; i < columns.length; i++) {
    const cell = columns[i].querySelectorAll(".cell");
    for (let j = 0; j < cell.length; j++) {
      cell[j].addEventListener("click", handleRandomColor);
      cell[j].addEventListener("mousemove", handleMoveMouseRandomColor);

      cell[j].removeEventListener("click", handleSingleColor);
      cell[j].removeEventListener("mousemove", handleMouseMoveSingleColor);
      cell[j].removeEventListener("click", handleEraser);
      cell[j].removeEventListener("mousemove", handleMoveMouseEraser);
    }
  }
}

function eraserColour() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  for (let i = 0; i < columns.length; i++) {
    const cell = columns[i].querySelectorAll(".cell");
    for (let j = 0; j < cell.length; j++) {
      cell[j].removeEventListener("click", handleSingleColor);
      cell[j].removeEventListener("mousemove", handleMouseMoveSingleColor);

      cell[j].addEventListener("click", handleEraser);
      cell[j].addEventListener("mousemove", handleMoveMouseEraser);
    }
  }
}

function removeColor() {
  if (!container) {
    console.log("Container not found");
    return;
  }
  const columns = container.querySelectorAll(".column");
  for (let i = 0; i < columns.length; i++) {
    const cells = columns[i].querySelectorAll(".cell");
    for (let j = 0; j < cells.length; j++) {
      cells[j].style.backgroundColor = "white";
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
      // newCell.addEventListener("click", handleCellClick);
      // newCell.addEventListener("mousemove", handleMouseMoveSingleColor);
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

function removeDragStart(event) {
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
