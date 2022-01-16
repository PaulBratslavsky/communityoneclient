import CsvParser from "csv-parse/lib/sync";
import CSV from "csv-string";

import {
  textIsNumber,
  textToNumber,
  textIsBoolean,
  textToBoolean,
  textIsObject,
  textToObject,
} from "./textFormats";

export function csvToJson(text) {
  return CsvParser(text, {
    delimiter: CSV.detect(text),
    columns: true,
    trim: true,

    // Try to convert the format of the values
    cast: (value) => {
      if (value === "") return null;
      else if (textIsNumber(value)) return textToNumber(value);
      else if (textIsBoolean(value)) return textToBoolean(value);
      else if (textIsObject(value)) return textToObject(value);
      else return value;
    },
  });
}
