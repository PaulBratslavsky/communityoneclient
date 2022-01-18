import React, { useMemo, useState, useContext } from "react";
import Papa from "papaparse";
import { Form, Button } from "react-bootstrap";
import { createColumsDef } from '../Grid/utils';
import { CustomHeader } from "../Grid/CustomHeader";
import Grid from "../Grid";
import useContentTypes from '../../hooks/useContentTypes';
import ImportAssetsUpload from '../ImportAssetsUpload/ImportAssetsUpload';
import { UserContext } from '../../context/UserContext';


export default function ImportAssets() {
  const { user } = useContext(UserContext);

  const [file, setFile] = React.useState("");
  const [columsDef, setColumsDef] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

//   const { contentTypes } = useContentTypes();

//  console.log(contentTypes);


const [analysis, setAnalysis] = useState(null);
const [target, setTarget] = useState(null);
const [isLoading, setIsLoadig] = useState(false);

const analizeImports = async ({ data, type }) => {
  // Prevent Empty Destination
  const dataToSend = {
    data,
    type,
  }
  
  // Send Request
  try {
    setIsLoadig(true);
        const response = await fetch("http://localhost:1337/import-assets/preAnalyzeContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
          body: JSON.stringify(dataToSend),

        });
        const responseData = await response.json();
        console.log(responseData)
    // Set Content Type Data to map
    // setTarget(contentTypes.find(({ uid }) => uid === importDest));
    setAnalysis(data);

    // Notifications
    //TODO: set notification to user
  } catch (error) {
    console.error(error);
    //TODO: set notification error to user
  } finally {
    setIsLoadig(false);
  }

};

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

  console.log(rowData)
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

      <ImportAssetsUpload onSubmit={analizeImports} />

      
      <div>
        <Grid columsDef={columsDef} rowData={rowData} customHeader={CustomHeader} /> 
      </div>
      
    </div>
  );
}
