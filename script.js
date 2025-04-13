// Get the spreadsheet grid container
const spreadsheetGrid = document.getElementById('spreadsheet-grid');
const chartContainer = document.getElementById('chart-container');
const chartCanvas = document.getElementById('chart-canvas');
const chartButton = document.getElementById('chart-button');
const newSheetButton = document.getElementById('new-sheet-button');
const saveSheetButton = document.getElementById('save-sheet-button');
const loadSheetButton = document.getElementById('load-sheet-button');
const boldButton = document.getElementById('bold-button');
const italicButton = document.getElementById('italic-button');
const underlineButton = document.getElementById('underline-button');

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

// Add event listeners to the toolbar buttons
boldButton.addEventListener('click', () => {
    document.execCommand('bold');
});

italicButton.addEventListener('click', () => {
    document.execCommand('italic');
});

underlineButton.addEventListener('click', () => {
    document.execCommand('underline');
});

// Add event listener to the chart button
chartButton.addEventListener('click', () => {
    if (chartContainer.style.display === 'none') {
        chartContainer.style.display = 'block';
        spreadsheetGrid.style.display = 'none';
        createChart();
    } else {
        chartContainer.style.display = 'none';
        spreadsheetGrid.style.display = 'grid';
    }
});

// Function to create a chart
function createChart() {
    const ctx = chartCanvas.getContext('2d');
    const chartData = getChartData();
    const chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to get chart data from the spreadsheet grid
function getChartData() {
    const cells = spreadsheetGrid.children;
    const data = [];
    const labels = [];
    let row = 0;
    let col = 0;
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (col === 0) {
            labels.push(cell.textContent);
        } else {
            if (!data[col - 1]) {
                data[col - 1] = [];
            }
            data[col - 1].push(parseFloat(cell.textContent));
        }
        col++;
        if (col >= numCols) {
            col = 0;
            row++;
        }
    }
    const datasets = data.map((dataset, index) => {
        return {
            label: `Column ${index + 1}`,
            data: dataset,
            borderColor: `rgb(${index * 50}, ${index * 20}, 192)`,
            tension: 0.1
        };
    });
    return {
        labels: labels,
        datasets: datasets
    };
}

// Add event listener to the new sheet button
newSheetButton.addEventListener('click', () => {
    const cells = spreadsheetGrid.children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
});

// Add event listener to the save sheet button
saveSheetButton.addEventListener('click', () => {
    const cells = spreadsheetGrid.children;
    const data = [];
    for (let i = 0; i < cells.length; i++) {
        data.push(cells[i].textContent);
    }
    const jsonData = JSON.stringify(data);
    const a = document.createElement('a');
    a.href = 'data:text/json,' + jsonData;
    a.download = 'sheetzo.json';
    a.click();
});

// Add event listener to the load sheet button
loadSheetButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            const cells = spreadsheetGrid.children;
            for (let i = 0; i < cells.length; i++) {
                cells[i].textContent = data[i];
            }
        };
        reader.readAsText(file);
    };
    input.click();
});
