// script.js

// Load the data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Render the sheet data
    renderSheet(data.sheets[0].data);
  });

// Render the sheet data
function renderSheet(data) {
  const sheetContainer = document.getElementById('sheet-container');
  sheetContainer.innerHTML = '';

  data.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('sheet-row');

    row.forEach((cell, cellIndex) => {
      const cellElement = document.createElement('input');
      cellElement.type = 'text';
      cellElement.value = cell;
      cellElement.addEventListener('input', (event) => {
        // Update the data in the JSON file
        updateData(rowIndex, cellIndex, event.target.value);
      });

      rowElement.appendChild(cellElement);
    });

    sheetContainer.appendChild(rowElement);
  });
}

// Update the data in the JSON file
function updateData(rowIndex, cellIndex, value) {
  // TO DO: Implement the logic to update the data in the JSON file
}
