/* <ImportAssetsUpload onSubmit={analizeImports} /> */
import React, { useState, memo } from 'react';
import { Row, Button } from 'react-bootstrap';
import DropFileZone from './DropFileZone';

async function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = ({ target: { result } }) => resolve(result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}


const FORMATS = [
  { name: "csv", mimeType: "text/csv", ext: ".csv" },
  { name: "csv-excel", mimeType: "application/vnd.ms-excel", ext: ".csv" },
];

function ImportAssetsUpload({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");

  const handleFileUpload = async (file) => {
    try {
      const content = await readFileContent(file);
      setData(content);
      setFile(file);
    } catch (err) {
      //TODO: HANDLE ERROR
    }
  };

  const removeFile = () => {
    setData(null);
    setFile(null);
  };

  // Form Controls
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ data, type: file.type });
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      <Row>
          <DropFileZone
            acceptMimeTypes={FORMATS.map(({ mimeType }) => mimeType)}
            acceptFilesTypes={FORMATS.map(({ ext }) => ext)}
            onUploadFile={handleFileUpload}
            onUploadError={() => {}
              // TODO: HANDLE ERROR
            }
          />
      </Row>
      <Row>
        <Button
          type="submit"
          variant={file ? "primary" : "secondary"}
          disabled={!file}
        >Analyze</Button>
        <Button
          className="ml-3"
          varient="secondary"
          onClick={removeFile}
          disabled={!file}
        >Remove File</Button>
      </Row>
    </form>
  );
}


export default memo(ImportAssetsUpload);
