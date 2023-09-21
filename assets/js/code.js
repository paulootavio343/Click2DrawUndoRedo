// Get references to the HTML elements and initialize variables
const container = document.getElementById('container');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
let pointsHistory = []; // Array to store the points' history
let redo = []; // Array to store redo points
let id = 0; // Initialize an ID for points

// Listen for clicks on the container element
container.addEventListener('click', function (event) {
    const { clientX, clientY } = event;
    createPoint(clientX, clientY); // Create a point at the clicked position
    checkLength(); // Check the length of the history for enabling/disabling buttons
});

// Listen for clicks on the Undo button
undoBtn.addEventListener('click', () => {
    undoPoints(); // Undo the last point
    checkLength(); // Check the length of the history for enabling/disabling buttons
})

// Listen for clicks on the Redo button
redoBtn.addEventListener('click', () => {
    redoPoints(); // Redo a previously undone point
    checkLength(); // Check the length of the history for enabling/disabling buttons
})

// Function to create a point and add it to the history
function createPoint(coordinateX, coordinateY) {
    const object = { id: id, x: coordinateX, y: coordinateY };
    pointsHistory.push(object);

    // Create a point element in the container
    element = `<div class="point" id="point-${id}" style="top: ${coordinateY}px; left: ${coordinateX}px;"></div>`
    container.innerHTML += element;
    id++;
}

// Function to undo the last added point
function undoPoints() {
    const obj = pointsHistory.pop();
    const objID = obj.id;
    const coordinateX = obj.x;
    const coordinateY = obj.y;
    const elementToRemove = document.getElementById(`point-${objID}`);

    elementToRemove.remove();
    redo.push({ id: objID, x: coordinateX, y: coordinateY });
};

// Function to redo a previously undone point
function redoPoints() {
    const firstElement = redo.pop();

    // Recreate a point element
    element = `<div class="point" id="point-${firstElement.id}" style="top: ${firstElement.y}px; left: ${firstElement.x}px;"></div>`
    container.innerHTML += element;

    const object = { id: firstElement.id, x: firstElement.x, y: firstElement.y };
    pointsHistory.push(object);
};

// Function to check the length of the history arrays and enable/disable buttons
function checkLength() {
    if (pointsHistory.length < 1) {
        undoBtn.setAttribute('disabled', '');
    } else {
        undoBtn.removeAttribute('disabled');
    };

    if (redo.length < 1) {
        redoBtn.setAttribute('disabled', '');
    } else {
        redoBtn.removeAttribute('disabled');
    };
};

// Initially check the length to set the initial button states
checkLength();