import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function MarkdownEditor() {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
