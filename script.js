const spreadsheetContainer = document.getElementById('spreadsheet-container');
const ROWS = 10;
const COLUMNS = 10;
const spreadsheet = [];
const exportBtn = document.getElementById('export-btn');


exportBtn.onclick = function(e) {
    console.log(spreadsheet)
    let csv = '';
    for (let i = 1; i < spreadsheet.length; i++) {
        csv += spreadsheet[i]
            .filter(item => !item.isHeader)
            .map(item => item.data)
            .join(',') + '\r\n';
    };

    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    const a = document.createElement('a');

    console.log(csv);
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}



class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        var spreadsheetRow = [];
        for (let j = 0; j < COLUMNS; j++) {
            let cellData = '';
            let isHeader = false;
            let disabled = false;

            if(j == 0 && i != 0) {
                cellData = i;
                isHeader = true;
                disabled = true;
            }

            if(i == 0 && j != 0) {
                cellData = String.fromCharCode(64+j);
                isHeader = true;
                disabled = true;
            }

            if(i == 0 && j == 0) {
                isHeader = true;
                disabled = true;
            }

            const rowName = i;
            const columnName = String.fromCharCode(64+j);

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
}

function handleOnChange(value, cell) {
    cell.data = value;
}



initSpreadsheet();

function createCellElement(cell) {
    const cellElement = document.createElement('input');
    cellElement.classList.add('cell');
    cellElement.id = 'cell' + cell.row + cell.column;
    cellElement.value = cell.data;
    cellElement.disabled = cell.disabled;

    if(cell.isHeader) {
        cellElement.classList.add('header');
    }

    cellElement.onclick = () => handleCellClick(cell);
    cellElement.onchange = (e) => handleOnChange(e.target.value, cell);

    return cellElement;
}

//  셀 클릭했을 때 하이라이트 효과
function handleCellClick(cell) {
    clearHeaderActive();
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderElement = document.querySelector("#cell" + columnHeader.row + columnHeader.column);
    const rowHeaderElement = document.querySelector("#cell" + rowHeader.row + rowHeader.column);

    columnHeaderElement.classList.add('active');
    rowHeaderElement.classList.add('active');

    document.querySelector('#cell-status').innerHTML = `${cell.columnName}${cell.rowName}`;
}

function clearHeaderActive () {
    const headers = document.querySelectorAll('.header');

    headers.forEach((header) => {
        header.classList.remove('active');
    });
}

function drawSheet() {
    for(let i = 0; i < spreadsheet.length; i++) {
        const rowContainerElement = document.createElement('div');
        rowContainerElement.classList.add('cell-row');

        for(let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            rowContainerElement.append(createCellElement(cell));
        }

        spreadsheetContainer.append(rowContainerElement);
    }
}