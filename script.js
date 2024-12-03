
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

        galaxyResources.push(Math.floor(Math.random() * 30)); //add a value (0 - 30) to galaxyResources corresponding to current galaxy location  
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
    let locationCount = galaxyDimension * galaxyDimension;
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


function initSim() {
    createGalaxy();
    let location = getRandomLocation();
    let p = createProbe(location);
    probe_list.push(p);
}


function runSim() {
    createGalaxy();
    let galaxyLocations = document.querySelectorAll('.item');

    let location = getRandomLocation();
    let p = createProbe(location);
    probe_list.push(p); 
    galaxyLocations[location].style.backgroundColor = p.color;

    //INFINITE LOOP{
    let tempProbeList = [];
    probe_list.forEach((p) => {
        let resourcesObtained = scanResources(p.location);
        if (resourcesObtained > 0) {
            p.addResources(resourcesObtained);
        }
        else {
            //move probe
        }

        let new_p = p.duplicateSelf();
        if (new_p != 'none') {
            tempProbeList.appendChild(new_p);
        }
        
    });
    probe_list = probe_list.concat(tempProbeList);
    //INFINITE LOOP}
}

runSim()