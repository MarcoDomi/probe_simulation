
const galaxyDimension = 80;
let galaxy = document.querySelector("div");
let galaxyResources = []; //list of resources at every location in galaxy
let probe_list = [];

function createRow() {
    let row = document.createElement("div");
    row.classList = "row";

    //create galaxy location divs with class item
    for (let i = 0; i < galaxyDimension; i++){
        let item = document.createElement("div");
        item.classList = "item";
        row.appendChild(item);

        galaxyResources.push(Math.floor(Math.random() * 30)); //add a value to galaxyResources corresponding to current galaxy location  
    }

    return row;
}

function createGalaxy() {
    for (let i = 0; i < galaxyDimension; i++){
        galaxy.appendChild(createRow());
    }
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function createProbe(location) {
    let probe = {
        color: getRandomColor(),
        location,
        resources: 0,
        duplicateSelf: function () {
            if (this.resources >= 10) {
                this.resources -= 10;
                return createProbe(this.location);
            }
            return none;
        }
    }

    probe_list.push(probe); 

    return probe;
}


createGalaxy();
let galaxyLocations = document.querySelectorAll('.item');

function getRandomLocation() {
    let locationCount = galaxyDimension * galaxyDimension;
    return Math.floor(Math.random() * locationCount);
}


function startSim() {
    let location = getRandomLocation();
    galaxyLocations[location].style.backgroundColor = 'red'; 

    p = createProbe(location);


}

startSim()