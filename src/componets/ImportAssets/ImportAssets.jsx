import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Form, Button } from "react-bootstrap";

const CustomHeader = (props) => {
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
        <i className={`fa ${props.menuIcon}`}></i>
      </div>
    );
  }

  let sort = null;

  return (
    <div>
      {menu}
      <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      <div className="customHeaderLabel">{props.displayName}</div>
      {sort}
    </div>
  );
};

function generateNameFromFieldName(fieldName) {
  const name = fieldName.replace(/([A-Z])/g, " $1").trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function createColumsDef(columns) {
  let header = [];
  columns.forEach((column) => {
    const headerColumn = {
      headerName: generateNameFromFieldName(column),
      field: column,
      sortable: true,
      filter: true,
    };
    header.push(headerColumn);
  });
  return header;
}

export default function ImportAssets() {
  const [gridApi, setGridApi] = useState(null);
  const [file, setFile] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [columsDef, setColumsDef] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);

  function onGridReady(params) {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (tableData) {
        console.log(tableData);
        const header = tableData.meta.fields;
        console.log(header);
        setColumsDef(createColumsDef(header));
        setRowData(tableData.data);
        setIsLoading(false);
        //printPapaObject(results);
      },
    });
  };

  function getSelectedRowData() {
    // let selectedNodes = gridApi.getSelectedNodes();
    // let selectedData = selectedNodes.map(node => node.data);
    // console.log(`Selected Nodes:\n${JSON.stringify(selectedData)}`);

    let selectedRows = gridApi.getSelectedRows();
    console.log(`Selected Rows:\n${JSON.stringify(selectedRows)}`);
    return selectedRows;
  }

  console.log(file, "SELECTED  FILE");
  console.log(columsDef, "COLUMNS");
  
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button variant="primary" type="submit">
              Process CSV
            </Button>
          </Form.Group>
        </fieldset>
      </Form>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          // defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onSelectionChanged={getSelectedRowData}
          frameworkComponents={{ agColumnHeader: CustomHeader }}
          rowData={rowData}
          columnDefs={columsDef}
          rowSelection="multiple"
        >
          <AgGridColumn field="make"></AgGridColumn>
          <AgGridColumn field="model"></AgGridColumn>
          <AgGridColumn field="price"></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
}
// import React from "react";
// import {AgGridColumn, AgGridReact} from 'ag-grid-react';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { CSVReader } from "react-papaparse";

// const rowData = [
//   {make: "Toyota", model: "Celica", price: 35000},
//   {make: "Ford", model: "Mondeo", price: 32000},
//   {make: "Porsche", model: "Boxter", price: 72000}
// ];

// export default function ImportAssets() {
//   const [data, setData] = React.useState([]);

//   const handleOnDrop = (data) => {
//     console.log("---------------------------");
//     console.log(data);
//     setData(data);
//     console.log("---------------------------");
//   };

//   const handleOnError = (err, file, inputElem, reason) => {
//     console.log(err);
//   };

//   const handleOnRemoveFile = (data) => {
//     console.log("---------------------------");
//     console.log(data);
//     console.log("---------------------------");
//   };

//   console.log(data, "WHATA")
//   return (
//     <div>
//       <div>
//         <CSVReader
//           onDrop={handleOnDrop}
//           onError={handleOnError}
//           addRemoveButton
//           onRemoveFile={handleOnRemoveFile}
//           config={{
//             header: true,
//           }}
//         >
//           <span>Drop CSV file here to import.</span>
//         </CSVReader>
//       </div>
//       <div>

//        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
//            <AgGridReact
//                rowData={rowData}>
//                <AgGridColumn field="make"></AgGridColumn>
//                <AgGridColumn field="model"></AgGridColumn>
//                <AgGridColumn field="price"></AgGridColumn>
//            </AgGridReact>
//        </div>
//       </div>
//     </div>
//   );
// }

/*
import React from "react";
import Papa from "papaparse";
import { Form, Button } from "react-bootstrap";

export default function ImportAssets() {
  const [file, setFile] = React.useState("");


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    Papa.parse(file, 
      {
        worker: true, // Don't bog down the main thread if its a big file
        step: function(result) {
          console.log(result)
            // do stuff with result
        },
      }
    )
  }
 

  console.log(file, "SELECTED  FILE")
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={handleFileChange}/>
          <Button variant="primary" type="submit">Process CSV</Button>
        </Form.Group>
      </Form>
  
    </div>
  );
}

*/

/* 
\

const config = {
    delimiter: "", // auto-detect
    newline: "", // auto-detect
    quoteChar: '"',
    header: hasHeader,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: function(response) {
      // Remove loader
      console.log('loaded')
      const headersArray = response.meta.fields;
      const rows = response.data;
      buildTable(headersArray, rows);
    },
    error: (error) => alert(error),
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: () => {
      // Start loader
      console.log('loading...')
    },
    withCredentials: undefined
  };
*/
