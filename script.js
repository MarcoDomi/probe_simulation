
const galaxyDimension = 80;
let galaxy = document.querySelector("div");

function createRow() {
    let row = document.createElement("div");
    row.classList = "row";

    for (let i = 0; i < galaxyDimension; i++){
        let item = document.createElement("div");
        item.classList = "item";
        row.appendChild(item);
    }

    return row;
}

function createGalaxy() {
    for (let i = 0; i < galaxyDimension; i++){
        galaxy.appendChild(createRow());
    }
}

createGalaxy();

let c = document.querySelectorAll('.item');

let specialDiv = c[4000];
specialDiv.style.backgroundColor = "red";