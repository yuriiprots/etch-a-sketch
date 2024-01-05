function createDivs(numberOfDivs) {
  for (let i = 0; i < numberOfDivs; i++) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = "This is a new div!";
    document.body.appendChild(newDiv);
  }
}

createDivs(5);
