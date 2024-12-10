import Row from './Row.js';
import Cell from './Cell.js';

export default class Table {
  rows: Row[] = [];
  rowCount: number;
  colCount: number;

  constructor(rowCount: number, colCount: number) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.initTable();
  }

  private initTable() {
    for (let i = 0; i < this.rowCount; i++) {
      this.rows.push(new Row(this.colCount));
    }
  }

  private isValidCell(row: number, col: number) {
    return row >= 0 && row < this.rowCount && col >= 0 && col < this.colCount;
  }

  private updateRows(newRowCount: number) {
    if (newRowCount > this.rowCount) {
      for (let i = this.rowCount; i < newRowCount; i++) {
        this.rows.push(new Row(this.colCount));
      }
    } else {
      this.rows.length = newRowCount;
    }
    this.rowCount = newRowCount;
  }

  private updateColumns(newColCount: number) {
    this.rows.forEach((row) => row.adjustCells(newColCount));
    this.colCount = newColCount;
  }

  updateCell(row: number, col: number, value: string) {
    if (this.isValidCell(row, col)) {
      this.rows[row].cells[col].value = value;
    }
  }

  resize(newRowCount: number, newColCount: number) {
    this.updateRows(newRowCount);
    this.updateColumns(newColCount);
  }

  addRow() {
    this.rows.push(new Row(this.colCount));
    this.rowCount++;
  }

  addColumn() {
    this.rows.forEach((row) => row.cells.push(new Cell()));
    this.colCount++;
  }

  getTableData(): string[][] {
    return this.rows.map((row) => row.cells.map((cell) => cell.value));
  }

  loadTableData(data: string[][]) {
    this.rowCount = data.length;
    this.colCount = data[0]?.length || 0;
    this.rows = data.map((row) => new Row(this.colCount, row));
  }
}
