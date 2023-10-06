import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

(() => {
  // Check if command line arguments are provided
  if (process.argv.length < 4) {
    console.log('Usage: node mjmlConverter.js <input.mjml> <output.html>');
    process.exit(1);
  }

  // Get the input and output file names from command line arguments
  const inputFileName = process.argv[2];
  const outputFileName = process.argv[3];

  // check if path exists
  const inpPath = path.join(__dirname, '..', inputFileName);
  const oupPath = path.join(__dirname, '..', outputFileName);
  if (!fs.existsSync(inpPath)) {
    console.log(`[ERROR]: One of the input or outpur files must exist.`);
    return false;
  }

  //
  if (!fs.existsSync(oupPath)) {
    fs.writeFileSync(oupPath, '');
  }

  try {
    execSync(`mjml ${inpPath} -o ${oupPath}`);
    console.log(`✅ Done converting mjml to html`);
  } catch (e: any) {
    console.log(`[ERROR converting to html]: ${e.message}`);
  }
})();
