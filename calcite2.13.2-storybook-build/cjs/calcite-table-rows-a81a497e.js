'use strict';

const index = require('./index-7c083111.js');

const CalciteTableRows = ({ rows, columns, emptyHelpState, startItem = 1, setFirstCellRefCallback }) => {
  const setRefFunction = (rowIndex, colIndex) => {
    let firstCellRefFunction = undefined;
    if (startItem - 1 === rowIndex && colIndex === 0) {
      firstCellRefFunction = setFirstCellRefCallback;
    }
    return firstCellRefFunction;
  };
  const headerRow = index.h("calcite-table-row", { slot: "table-header" }, columns.map(column => {
    return index.h("calcite-table-header", { alignment: column.headerCellAlignment, description: column.description, heading: column.header });
  }));
  const bodyRows = rows.length
    ? rows.map((row, rowIndex) => {
      return index.h("calcite-table-row", { key: `r${rowIndex}` }, columns.map((column, colIndex) => {
        const contentCellStyles = {
          width: column.cellWidth || 'auto',
          wordBreak: 'break-word'
        };
        return index.h("calcite-table-cell", { alignment: column.contentCellAlignment, key: `r${rowIndex}-c${colIndex}`, ref: setRefFunction(rowIndex, colIndex) }, column.multilineCellEllipsis
          ? index.h("arcgis-multiline-ellipsis", Object.assign({}, column.multilineCellEllipsis, { style: contentCellStyles }), row[column.key])
          : index.h("div", { style: contentCellStyles }, row[column.key]));
      }));
    })
    : index.h("calcite-table-row", null,
      index.h("calcite-table-cell", { colSpan: columns.length, ref: !!setFirstCellRefCallback && setFirstCellRefCallback },
        index.h("arcgis-hub-help-state", { icon: emptyHelpState.icon },
          index.h("h3", { "aria-live": "polite", role: "status", slot: "message" }, emptyHelpState.heading))));
  return [headerRow, bodyRows];
};

exports.CalciteTableRows = CalciteTableRows;
