const spreadsheetContainer = document.getElementById('spreadsheet-container');
const ROWS = 10;
const COLUMNS = 10;
const spreadsheet = [];


function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < COLUMNS; j++) {
            spreadsheetRow.push(i + '-' + j);
        }
        spreadsheet.push(spreadsheetRow);
    }
    console.log(spreadsheet);
}

initSpreadsheet();