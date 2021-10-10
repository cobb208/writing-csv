
function createTable(columns: string[]): HTMLTableElement {

    const mainTable = document.createElement('table') as HTMLTableElement;
    const tableHead = document.createElement('thead') as HTMLElement;
    const tableHeadRow = document.createElement('tr') as HTMLElement;
    const tableHeaders = createHeaders(columns) as HTMLElement[];
    const tableBody = document.createElement('tbody') as HTMLElement;
    const tableBodyFirstRow = document.createElement('tr') as HTMLElement;
    const tableFirstSetCols = createRow(columns.length);

    // Setup Ids
    mainTable.id = 'mainTable';

    // Setup classes
    mainTable.classList.add('table', 'table-striped');


    // Append Together
    mainTable.append(tableHead);
    tableHead.append(tableHeadRow);

    tableHeaders.forEach(tableHead => {
        tableHeadRow.append(tableHead);
    })

    mainTable.append(tableBody);
    tableBody.append(tableBodyFirstRow);


    tableFirstSetCols.forEach(tableFirstSetCol => {
        tableBodyFirstRow.append(tableFirstSetCol);
    });


    tableBody.append(createNewBtn(columns.length));
    tableBody.append(createExportBtn(columns));


    return mainTable;
}


function createHeaders(columns: string[]): HTMLElement[] {
    const returnHeaders = [] as HTMLElement[];


    columns.forEach(col => {
        const newHeader = document.createElement('th') as HTMLElement;
        newHeader.setAttribute('scope', 'col');
        console.log('col is equal to: ' + col);
        newHeader.innerHTML = col;

        console.log(newHeader);

        returnHeaders.push(newHeader);
    })

    return returnHeaders;
}

function createRow(columnLength: number): HTMLElement[] {
    const returnRow = [];

    for(let i = 0; i < columnLength; i++) {
        const newRow = document.createElement('td') as HTMLElement;
        const input = document.createElement('input') as HTMLInputElement;

        input.setAttribute('type', 'text');
        input.classList.add('form-control', 'px-3');

        newRow.append(input);

        returnRow.push(newRow);
    }

    return returnRow;
}

function createNewBtn(columnLength: number): HTMLTableRowElement {
    const btnTableRow = document.createElement('tr');
    const btnTableCol = document.createElement('td');
    const newBtn = document.createElement('button');

    btnTableRow.id = 'btnTableRow';

    newBtn.innerHTML = 'New Entry';
    newBtn.classList.add('btn', 'btn-success');
    btnTableCol.setAttribute('colspan', columnLength.toString());

    btnTableRow.append(btnTableCol);
    btnTableCol.append(newBtn);

    newBtn.addEventListener('click', () => {
        newRowHandler(columnLength);
    });

    return btnTableRow;
}

function createExportBtn(columns: string[]): HTMLTableRowElement {
    const btnTableRow = document.createElement('tr');
    const btnTableCol = document.createElement('td');
    const exportBtn = document.createElement('button');

    exportBtn.innerHTML = 'Export';
    exportBtn.classList.add('btn', 'btn-primary', 'btn-lg');
    btnTableCol.setAttribute('colspan', columns.length.toString());

    btnTableRow.append(btnTableCol);
    btnTableCol.append(exportBtn);

    exportBtn.addEventListener('click', () => {
        exportToFile(columns)
    })

    return btnTableRow;
}

function newRowHandler(columnLength: number) {
    const btnRow = document.getElementById('btnTableRow');
    const newRow = document.createElement('tr');
    const colList = createRow(columnLength) as HTMLTableRowElement[];

    colList.forEach(col => {
        newRow.append(col);
    });

    btnRow.insertAdjacentElement('beforebegin', newRow);
}

function exportToFile(column_names: string[]) {

    const mainTable = document.getElementById('mainTable');

    const tBody = mainTable.getElementsByTagName('tbody')[0]


    const input_vals = [] as string[];

    const inputs = tBody.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;

    Array.from(inputs).forEach(input => {
        input_vals.push(input.value);
    });

    const contentArray = [
        [...formatHeaderToArray(column_names, column_names.length)], 
        [...formatBodyToArray(input_vals, column_names.length)]
    ];

    generateFile(contentArray);




    function generateFile(contentArr: string[][]): void {
        let newBlob = new Blob([contentArr.flat().join('')], {
            type: 'text/plain'
        })

        let fileName = 'newFile.csv'
    
        let saveFile = new File([newBlob], fileName);
    
        const objectUrl = URL.createObjectURL(saveFile);    
        // creates an a tag to download the file.
        const atag = document.createElement('a');
        atag.setAttribute('href', objectUrl);
        atag.setAttribute('download', fileName);
        atag.click();
    }

    // format header
    function formatHeaderToArray(items: any[], columnLength: number): string[] {
        let tempArray = [] as string[];

        for(let i = 0; i < columnLength; i++) {

            if(i < columnLength - 1) {
                tempArray.push(`${items[i]},`);
            } else {
                tempArray.push(`${items[i]}\n`);
            }
        }

        return tempArray;
    }

    // format body
    function formatBodyToArray(items: any[], columnLength: number): string[] {
        let tempArray = [] as string[];
        let colIndex = 0;

        for(let i = 0; i < items.length; i++) {

            if(colIndex < columnLength - 1) {
                tempArray.push(`${items[i]},`);
                colIndex++;
            } else {
                tempArray.push(`${items[i]}\n`);
                colIndex = 0;
            }
            
        }

        return tempArray;
    }

}

export { createTable }