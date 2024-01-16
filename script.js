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
  for (let i = 0; i < columns.length; i++) {
    const cells = columns[i].querySelectorAll(".cell");
    for (let j = 0; j < cells.length; j++) {
      cells[j].addEventListener("click", addColour);
      cells[j].addEventListener("mousemove", addMoveMouse);

      cells[j].removeEventListener("click", eraser);
      cells[j].removeEventListener("click", addRandomColor);
      cells[j].removeEventListener("mousemove", addMoveMouseRemoveColor);
    }
  }
}

function addColour() {
  this.style.backgroundColor = colorPicker.value;
}

function addMoveMouse() {
  if (isMouseDown) this.style.backgroundColor = colorPicker.value;
}

function eraser() {
  this.style.backgroundColor = "white";
}

function addRandomColor() {
  this.style.backgroundColor = randomColor();
}

function addMoveMouseRandomColor() {
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
      cell[j].addEventListener("click", addRandomColor);
      cell[j].addEventListener("mousemove", addMoveMouseRandomColor);

      cell[j].removeEventListener("click", addColour);
      cell[j].removeEventListener("click", eraser);
      cell[j].removeEventListener("mousemove", addMoveMouse);
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
      cell[j].removeEventListener("click", addColour);
      cell[j].removeEventListener("mousemove", addMoveMouse);

      cell[j].addEventListener("click", eraser);
      cell[j].addEventListener("mousemove", addMoveMouseRemoveColor);
    }
  }
}

function addMoveMouseRemoveColor() {
  if (isMouseDown) this.style.backgroundColor = "white";
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
      // newCell.addEventListener("click", addColour);
      // newCell.addEventListener("mousemove", addMoveMouse);
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
