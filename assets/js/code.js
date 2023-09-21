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
undoBtn.addEventListener('click', undoPoints);

// Listen for clicks on the Redo button
redoBtn.addEventListener('click', redoPoints);

// Function to create a point and add it to the history
function createPoint(coordinateX, coordinateY) {
    const object = { id: id++, x: coordinateX, y: coordinateY };
    pointsHistory.push(object);

    // Create a point element in the container
    const element = createPointElement(object);
    container.appendChild(element);
};

function createPointElement(point) {
    const element = document.createElement('div');
    element.classList.add('point');
    element.id = `point-${point.id}`;
    element.style.top = `${point.y}px`;
    element.style.left = `${point.x}px`;
    return element;
};

// Function to undo the last added point
function undoPoints() {
    const obj = pointsHistory.pop();
    if (obj) {
        const elementToRemove = document.getElementById(`point-${obj.id}`);
        elementToRemove.remove();
        redo.push(obj);
    };
    checkLength(); // Check the length of the history for enabling/disabling buttons
};

// Function to redo a previously undone point
function redoPoints() {
    const firstElement = redo.pop();

    if (firstElement) {
        // Recreate a point element
        const element = createPointElement(firstElement);
        container.appendChild(element);

        pointsHistory.push(firstElement);
    }
    checkLength(); // Check the length of the history for enabling/disabling buttons
};

// Function to check the length of the history arrays and enable/disable buttons
function checkLength() {
    undoBtn.disabled = pointsHistory.length < 1;
    redoBtn.disabled = redo.length < 1;
};

// Initially check the length to set the initial button states
checkLength();
