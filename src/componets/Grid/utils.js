export function generateNameFromFieldName(fieldName) {
  const name = fieldName.replace(/([A-Z])/g, " $1").trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function createColumsDef(columns) {
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