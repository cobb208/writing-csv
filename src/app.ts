import { createNewColArea } from "./createColumns";
import { createTable } from './createCsv';
const centerScreen = document.getElementById('centerScreen') as HTMLDivElement;

const columnList = [] as string[];


const changeState = (): void => {
    centerScreen.innerHTML = '';
    centerScreen.append(createTable(columnList));
}

/**
 * Initiate app on the first stage
 */
window.onload = () => {
    centerScreen.append(createNewColArea(columnList, changeState));
}