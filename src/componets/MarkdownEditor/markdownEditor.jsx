import MDEditor from '@uiw/react-md-editor';

export default function MarkdownEditor({ onChange, value }) {
  
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
