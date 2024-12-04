
const galaxyDimension = 80;
const locationCount = galaxyDimension * galaxyDimension; //number of possible locations in galaxy
let galaxy = document.querySelector("#galaxy");
let galaxyResources = []; //list of resources at every location in galaxy
let probe_list = [];
createGalaxy();


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


function createProbe(locationX, locationY) {
    let probe = {
        color: getRandomColor(),
        locationX,
        locationY,
        resources: 0,
        addResources: function (resources) {
            this.resources += resources
        },
        duplicateSelf: function () {
            if (this.resources >= 10) {
                this.resources -= 10;
                return createProbe(this.locationX, this.locationY);
            }
            return 'none';
        }
    }

    return probe;
}


function getRandomLocation() {
    let locationX = Math.floor(Math.random() * galaxyDimension);
    let locationY = Math.floor(Math.random() * galaxyDimension);

    return (locationX, locationY);
}

function scanResources(x, y) {//UNTESTED
    let returnResources = 0;

    if (galaxyResources[x][y] > 10) { //if location has more than 10 resources 
        returnResources = 10;
        galaxyResources[x][y] -= 10;
    }
    else if (galaxyResources[x][y] > 0) { //if location has 10 or less resources
        returnResources = galaxyResources[x][y];
        galaxyResources[x][y] = 0;
    }
    
    return returnResources;
}

function moveProbe(locationX, locationY) {//REDO
    let directions = { right: 1, left: -1, up: -1, down: 1 };
    let directionKeys = Object.keys(directions);
    let index;

    for (let i = 0; i < 4; i++){
        index = Math.floor(Math.random() * directionKeys.length);

        if (directionKeys[index] == 'right' || directionKeys[index] == 'left') {
            locationX = locationX + directions[directionKeys[index]];
        }
        else if (directionKeys[index] == 'up' || directionKeys[index] == 'down') {
            locationY = locationY + directions[directionKeys[index]];
        }

        if ((locationX >= 0 && locationX < galaxyDimension) && (locationY >= 0 && locationY < galaxyDimension) ) {
            
            return (locationX, locationY);
        }
        else {
           
            directionKeys.splice(index, 1);
        }
    }
}


function initSim() {
    let locationXY = getRandomLocation();
    let p = createProbe(locationXY[0], locationXY[1]);
    probe_list.push(p);
}

function getLocationArray() {
    let tempArray = Array.from(document.querySelectorAll('.item')); //get nodelist of all locations in galaxy then convert to array
    let galaxyLocations = [];

    while(tempArray.length){
        galaxyLocations.push(tempArray.splice(0, galaxyDimension));
    }

    return galaxyLocations
}

function runSim() {//REDO
    let galaxyLocations = getLocationArray();
    initSim();

    //INFINITE LOOP{
    for (let i = 0; i < 100; i++) { //100 is arbitrary will change later
        let tempProbeList = []; //used to add new probes to global probe list
        probe_list.forEach((p) => {
            galaxyLocations[p.locationX][p.locationY].style.backgroundColor = p.color;

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

runSim()


