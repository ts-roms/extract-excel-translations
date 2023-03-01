const XLSX = require('xlsx');
const fs = require('fs');

// Load the Excel file
const workbook = XLSX.readFile('translations.xlsx');

// Choose the sheet you want to extract data from
const sheetName = 'Sheet1';
const worksheet = workbook.Sheets[sheetName];

// Define the column names
const keyColumn = 0;
const enColumn = 1;
const arColumn = 2;

// Extract the data from the Excel file
const data = XLSX.utils.sheet_to_json(worksheet, {
  header: 1, // Use the first row as the column headers
  range: 1 // Start from the second row to skip the headers
});

// Convert the data to JSON format
const enTranslations = {};
const sgTranslations = {};
for (const row of data) {
  const key = row[keyColumn];
  const enTranslation = row[enColumn];
  const sgTranslation = row[arColumn];
  enTranslations[key] = enTranslation;
  sgTranslations[key] = sgTranslation;
}

// Write the data to two separate JSON files
fs.writeFileSync('en.json', JSON.stringify(enTranslations, null, 2));
fs.writeFileSync('sg.json', JSON.stringify(sgTranslations, null, 2));