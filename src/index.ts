import Table from './components/Table.js';
import FileManager from './components/FileManager.js';
import TableRenderer from './components/TableRenderer.js';
import {
  DEFAULT_ROW_COUNT,
  DEFAULT_COL_COUNT,
  SCROLL_THRESHOLD,
} from './config/tableConfig.js';

const table = new Table(DEFAULT_ROW_COUNT, DEFAULT_COL_COUNT);
const fileManager = new FileManager();
const tableContainer = document.getElementById('table-container')!;
const rowNumbers = document.getElementById('row-numbers')!;
const tableRenderer = new TableRenderer(tableContainer);

document.getElementById('saveBtn')?.addEventListener('click', () => {
  const data = table.getTableData();
  fileManager.save(data, 'table-data.txt');
});

document.getElementById('openBtn')?.addEventListener('click', () => {
  fileManager.load((rowCount, colCount, data) => {
    table.resize(rowCount, colCount);
    table.loadTableData(data);
    tableRenderer.render(table);
  });
});

tableContainer.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollLeft,
    clientWidth,
    scrollWidth,
  } = tableContainer;

  rowNumbers.scrollTop = scrollTop;

  if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) {
    table.addRow();
    tableRenderer.render(table);
  }
  if (scrollLeft + clientWidth >= scrollWidth - SCROLL_THRESHOLD) {
    table.addColumn();
    tableRenderer.render(table);
  }
});

tableRenderer.render(table);
