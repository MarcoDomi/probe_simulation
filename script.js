
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


let probe_list = [];


function createProbe() {
    return {
        resources: 0,
        checkResources: function () {
            if (this.resources === 10)
                return createProbe();
    
            return none;
        }
    }
}


createGalaxy();
let galaxyLocations = document.querySelectorAll('.item');

function getRandomLocation() {
    let locationCount = galaxyDimension * galaxyDimension;
    return Math.floor(Math.random(locationCount) * locationCount);
}

function placeProbe() {
    let location = getRandomLocation();
    galaxyLocations[location].style.backgroundColor = 'red'; //change to random color
}

placeProbe();
function startSim() {

}