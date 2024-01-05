const container = document.getElementById("myContainer");

function createDivs(numberOfDivs) {
  if (!container) {
    console.log("Container not found");
    return;
  }

  for (let i = 0; i < numberOfDivs; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "div";
    // newDiv.innerHTML = "This is a new div!";
    container.appendChild(newDiv);
  }
}

createDivs(256);
