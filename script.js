window.addEventListener('load', () => {
    // Get the spreadsheet grid container
    const spreadsheetGrid = document.getElementById('spreadsheet-grid');

    // Define the number of rows and columns
    const numRows = 100;
    const numCols = 26;

    // Generate the grid cells
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement('div');
            cell.contentEditable = 'true'; // Make the cell editable
            cell.style.width = '100px'; // Set the cell width
            cell.style.height = '25px'; // Set the cell height
            cell.style.border = '1px solid #CCCCCC'; // Add a border
            cell.style.padding = '5px'; // Add some padding
            spreadsheetGrid.appendChild(cell);
        }
    }

    // Update the grid template columns and rows
    spreadsheetGrid.style.display = 'grid';
    spreadsheetGrid.style.gridTemplateColumns = `repeat(${numCols}, 100px)`;
    spreadsheetGrid.style.gridTemplateRows = `repeat(${numRows}, 25px)`;
    spreadsheetGrid.style.gap = '1px';
});
