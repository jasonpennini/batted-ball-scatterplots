const XLSX = require('xlsx');
const fs = require('fs');

// Load the .xlsx file - update this to point to the correct file location
const workbook = XLSX.readFile('./data/BattedBallData.xlsx'); // Adjusted path

// Get the first sheet (you can adjust if there are multiple sheets)
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert sheet to JSON format
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Write JSON data to a file
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf-8');

console.log("Conversion complete! JSON data saved to output.json");
