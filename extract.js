const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const xlsx = require('xlsx');

const baseDir = 'c:/Users/dasab/OneDrive/Desktop/RSL';

async function extractDocx(filePath) {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    } catch (err) {
        return `Error reading docx: ${err.message}`;
    }
}

function extractXlsx(filePath) {
    try {
        const workbook = xlsx.readFile(filePath);
        let out = [];
        for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
            out.push(`--- Sheet: ${sheetName} ---`);
            data.forEach(row => {
                out.push(row.join('\t'));
            });
        }
        return out.join('\n');
    } catch (err) {
        return `Error reading xlsx: ${err.message}`;
    }
}

async function main() {
    const outputStream = fs.createWriteStream(path.join(baseDir, 'extracted_output.txt'), { encoding: 'utf-8' });
    
    async function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                if (file !== 'node_modules') {
                    await walk(fullPath);
                }
            } else {
                if (file.startsWith('~$')) continue;
                
                if (file.endsWith('.docx')) {
                    outputStream.write(`\n\n================ FILE: ${file} (${dir}) ================\n`);
                    const text = await extractDocx(fullPath);
                    outputStream.write(text + '\n');
                } else if (file.endsWith('.xlsx')) {
                    outputStream.write(`\n\n================ FILE: ${file} (${dir}) ================\n`);
                    const text = extractXlsx(fullPath);
                    outputStream.write(text + '\n');
                }
            }
        }
    }
    
    await walk(baseDir);
    outputStream.end();
    console.log("Extraction complete!");
}

main().catch(console.error);
