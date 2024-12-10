import Cell from './Cell.js';

export default class Row {
  cells: Cell[] = [];

  constructor(cellCount: number, values: string[] = []) {
    this.cells = Array.from(
      { length: cellCount },
      (_, i) => new Cell(values[i] || ''),
    );
  }

  adjustCells(newCellCount: number) {
    if (newCellCount > this.cells.length) {
      while (this.cells.length < newCellCount) {
        this.cells.push(new Cell());
      }
    } else {
      this.cells.length = newCellCount;
    }
  }
}
