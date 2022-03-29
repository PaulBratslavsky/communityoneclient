import { readString } from 'react-papaparse'

export function csvParser(csvString) {
  const parsed = readString(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })
  return parsed.data
}

