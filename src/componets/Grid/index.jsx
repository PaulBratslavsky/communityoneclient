import { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Grid({ rowData, columsDef, customHeader, ...rest }) {
  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  function getSelectedRowData() {
    let selectedRows = gridApi.getSelectedRows();
    console.log(`Selected Rows:\n${JSON.stringify(selectedRows)}`);
    return selectedRows;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 540, width: "100%" }}>
        <AgGridReact
          onGridReady={onGridReady}
          onSelectionChanged={getSelectedRowData}
          frameworkComponents={{ agColumnHeader: customHeader }}
          rowData={rowData}
          columnDefs={columsDef}
          rowSelection="multiple"
        >
        </AgGridReact>
      </div>
  )
}
