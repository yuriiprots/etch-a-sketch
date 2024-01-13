const container = document.getElementById("myContainer");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const cleanBtn = document.getElementById("cleanBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorBtn = document.getElementById("colorBtn");
const colorPicker = document.getElementById("colorPicker");
const buttons = document.querySelectorAll('button[type="button"]');
const rainbowBtn = document.getElementById("rainbowBtn");

let isMouseDown = false;

createGrid(16, 16);
colorMode();

sizeSlider.addEventListener("input", function () {
  sizeValue.textContent = `${this.value} x ${this.value}`;
  createGrid(this.value, this.value);
  if (colorBtn.classList.contains("active"))
  {
    colorMode();  
  };
  if (rainbowBtn.classList.contains("active"))
  {
    rainbowMode();  
  };
});

colorBtn.addEventListener("click", colorMode);
rainbowBtn.addEventListener("click", rainbowMode);

function colorMode() {
  if (!container) {
    console.log("Container not found");
    return;
  }

  const columns = container.querySelectorAll(".column");
  for (let i = 0; i < columns.length; i++) {
    const cell = columns[i].querySelectorAll(".cell");
    for (let j = 0; j < cell.length; j++) {
      cell[j].addEventListener("click", addColour);
      cell[j].addEventListener("mousemove", addMoveMouse);

      cell[j].removeEventListener("click", eraser);
      cell[j].removeEventListener("mousemove", addMoveMouseRemoveColor);
      // changeColorEffect();
      // cell[j].style.backgroundColor = colorPicker.value;
    }
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
      cell[j].removeEventListener("mousemove", addMoveMouse);
      cell[j].removeEventListener("click", eraser);
      cell[j].removeEventListener("mousemove", addMoveMouseRemoveColor);
      // changeColorEffect();
      // cell[j].style.backgroundColor = colorPicker.value;
    }
  }
}

function addRandomColor() {
  this.style.backgroundColor = randomColor();
}

function addMoveMouseRandomColor() {
  if (isMouseDown) {
    this.style.backgroundColor = randomColor();
  }
}

// const colorEffects = document.querySelectorAll(".colour-effect");
// function changeColorEffect() {
//   if (colorEffects.length === 0) {
//     return;
//   }
//   for (let i = 0; i < colorEffects.length; i++) {
//     colorEffects[i].style.backgroundColor = colorPicker.value;
//   }
//   colorEffects.forEach((effect) => {
//     effect.style.backgroundColor = colorPicker.value;
//   });
// }

function addColour() {
  // this.classList.add("colour-effect");
  this.style.backgroundColor = colorPicker.value;
  // this.style.backgroundColor = randomColor();
}

eraserBtn.addEventListener("click", eraserColour);

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
  //this.classList.remove("colour-effect");
}

function eraser() {
  this.style.backgroundColor = "white";
}

// if (this.classList.contains("colour-effect")) {
//   this.classList.remove("colour-effect");

cleanBtn.addEventListener("click", removeColor);

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

function addMoveMouse() {
  if (isMouseDown) this.style.backgroundColor = colorPicker.value;

  //this.classList.add("colour-effect");
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
