const container = document.getElementById("myContainer");
let isMouseDown = false;

function addColour() {
  this.classList.add("color-effect");
}

function createDivs(numberOfDivs) {
  if (!container) {
    console.log("Container not found");
    return;
  }

  for (let i = 0; i < numberOfDivs; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "div";
    newDiv.addEventListener("click", addColour);
    newDiv.addEventListener("mousemove", function () {
      if (isMouseDown) this.classList.add("color-effect");
    });
    newDiv.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    container.appendChild(newDiv);
  }
}

document.addEventListener("mousedown", function () {
  isMouseDown = true;
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});

createDivs(256);
