import { useState } from 'react';

export default function useForm(initial = {}) {
  let [fields, setFields] = useState(initial);

  function handleSetFields(e) {
    let { name, value, type } = e.target;

    if (type === 'file') [value] = e.target.files;

    setFields({
      ...fields, [name]: value
    });
  }

  function resetFields() {
    setFields(initial);
  }

  return {
    fields,
    handleSetFields,
    resetFields,
  };
}
