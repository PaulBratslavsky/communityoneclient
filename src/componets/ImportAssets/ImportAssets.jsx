import React from "react";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CSVReader } from "react-papaparse";

const rowData = [
  {make: "Toyota", model: "Celica", price: 35000},
  {make: "Ford", model: "Mondeo", price: 32000},
  {make: "Porsche", model: "Boxter", price: 72000}
];

export default function ImportAssets() {
  const [data, setData] = React.useState([]);
  
  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);
    setData(data);
    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  console.log(data, "WHATA")
  return (
    <div>
      <div>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Drop CSV file here to import.</span>
        </CSVReader>
      </div>
      <div>
      

       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData={rowData}>
               <AgGridColumn field="make"></AgGridColumn>
               <AgGridColumn field="model"></AgGridColumn>
               <AgGridColumn field="price"></AgGridColumn>
           </AgGridReact>
       </div>
      </div>
    </div>
  );
}

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
