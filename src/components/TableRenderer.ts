import Table from './Table.js';
import Row from './Row.js';
import Cell from './Cell.js';

export default class TableRenderer {
  constructor(private container: HTMLElement) {}

  render(table: Table) {
    this.renderTable(table);
    this.renderRowNumbers(table.rowCount);
  }

  private renderTable(table: Table) {
    const tableElement = this.createTableElement(table);
    this.updateContainer(tableElement);
  }

  private createTableElement(table: Table): HTMLTableElement {
    const tableElement = document.createElement('table');
    const tbody = document.createElement('tbody');

    table.rows.forEach((row, rowIndex) => {
      const tr = this.createRow(row, rowIndex, table);
      tbody.appendChild(tr);
    });

    tableElement.appendChild(tbody);
    return tableElement;
  }

  private createRow(
    row: Row,
    rowIndex: number,
    table: Table,
  ): HTMLTableRowElement {
    const tr = document.createElement('tr');
    row.cells.forEach((cell, colIndex) => {
      const td = this.createCell(cell, rowIndex, colIndex, table);
      tr.appendChild(td);
    });
    return tr;
  }

  private createCell(
    cell: Cell,
    rowIndex: number,
    colIndex: number,
    table: Table,
  ): HTMLTableCellElement {
    const td = document.createElement('td');
    const input = this.createInput(cell, rowIndex, colIndex, table);
    td.appendChild(input);
    return td;
  }

  private createInput(
    cell: Cell,
    rowIndex: number,
    colIndex: number,
    table: Table,
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.value = cell.value;
    input.addEventListener('change', () => {
      table.updateCell(rowIndex, colIndex, input.value);
    });
    return input;
  }

  private updateContainer(tableElement: HTMLTableElement) {
    this.container.innerHTML = '';
    this.container.appendChild(tableElement);
  }

  private renderRowNumbers(rowCount: number) {
    const rowNumbers = document.getElementById('row-numbers')!;
    rowNumbers.innerHTML = '';
    for (let i = 0; i < rowCount; i++) {
      const div = document.createElement('div');
      div.textContent = (i + 1).toString();
      rowNumbers.appendChild(div);
    }
  }
}
