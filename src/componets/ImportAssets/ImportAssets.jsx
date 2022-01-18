import React, { useMemo } from "react";
import Papa from "papaparse";
import { Form, Button } from "react-bootstrap";
import { createColumsDef } from '../Grid/utils';
import { CustomHeader } from "../Grid/CustomHeader";
import Grid from "../Grid";
import useContentTypes from '../../hooks/useContentTypes';



export default function ImportAssets() {
  const [file, setFile] = React.useState("");
  const [columsDef, setColumsDef] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { contentTypes } = useContentTypes();

 console.log(contentTypes);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (tableData) {
        const header = tableData.meta.fields;
        setColumsDef(createColumsDef(header));
        setRowData(tableData.data);
        setLoading(false);
      },
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button variant="primary" type="submit">
              Process CSV
            </Button>
          </Form.Group>
        </fieldset>
      </Form>
      
      <div>
        <Grid columsDef={columsDef} rowData={rowData} customHeader={CustomHeader} /> 
      </div>
      
    </div>
  );
}
