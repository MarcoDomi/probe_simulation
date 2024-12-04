
const galaxyDimension = 80;
const locationCount = galaxyDimension * galaxyDimension; //number of possible locations in galaxy
let galaxy = document.querySelector("#galaxy");
let galaxyResources = []; //list of resources at every location in galaxy
let probe_list = [];
createGalaxy();
console.log(galaxyResources);

function createRow() {
    let row = document.createElement("div");
    row.classList = "row";
    let tempArr = [];
    //create galaxy location divs with class item
    for (let i = 0; i < galaxyDimension; i++){
        let item = document.createElement("div");
        item.classList = "item";
        row.appendChild(item);

        tempArr.push(Math.floor(Math.random() * 30)); //add a value (0 - 30) to galaxyResources corresponding to current galaxy location  
    }

    galaxyResources.push(tempArr);
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
        addResources: function (resources) {
            this.resources += resources
        },
        duplicateSelf: function () {
            if (this.resources >= 10) {
                this.resources -= 10;
                return createProbe(this.location);
            }
            return 'none';
        }
    }

    return probe;
}


function getRandomLocation() {
    return Math.floor(Math.random() * locationCount);
}

function scanResources(location) {
    let returnResources = 0;

    if (galaxyResources[location] > 10) { //if location has more than 10 resources 
        returnResources = 10;
        galaxyResources[location] -= 10;
    }
    else if (galaxyResources[location] > 0) { //if location has 10 or less resources
        returnResources = galaxyResources[location];
        galaxyResources[location] = 0;
    }
    
    return returnResources;
}

function moveProbe(location) {
    let directions = { right: 1, left: -1, up: -80, down: 80 };
    let directionKeys = Object.keys(directions);
    let index;
    let shiftLocation;

    for (let i = 0; i < 4; i++){
        index = Math.floor(Math.random() * directionKeys.length);

        shiftLocation = location + directions[directionKeys[index]];

        if (shiftLocation >= 0 && shiftLocation <= locationCount) {
            console.log('success: ', shiftLocation);
            return shiftLocation;
        }
        else {
            console.log('fail: ', shiftLocation);
            directionKeys.splice(index, 1);
        }

    }
}


function initSim() {
    let location = getRandomLocation();
    let p = createProbe(location);
    probe_list.push(p);
}


let galaxyLocations = document.querySelectorAll('.item'); //list of all locations in galaxy

function runSim() {
    initSim();

    //INFINITE LOOP{
    for (let i = 0; i < 100; i++) {
        let tempProbeList = [];
        probe_list.forEach((p) => {
            galaxyLocations[p.location].style.backgroundColor = p.color;

            let resourcesObtained = scanResources(p.location);
            if (resourcesObtained > 0) {
                p.addResources(resourcesObtained);
            }
            else {
                galaxyLocations[p.location].style.backgroundColor = 'white';
                p.location = moveProbe(p.location);
                galaxyLocations[p.location].style.backgroundColor = p.color;
            }

            let new_p = p.duplicateSelf();
            if (new_p != 'none') {
                tempProbeList.push(new_p);
            }
            
        });
        probe_list = probe_list.concat(tempProbeList);
    }
    //INFINITE LOOP}
}

//runSim()

