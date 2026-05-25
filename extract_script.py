import os
import sys

# Try importing, and if not present we can check error logs, but assuming standard ds env.
try:
    import pandas as pd
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pandas", "openpyxl", "python-docx"])
    import pandas as pd

from docx import Document

base_dir = r"c:/Users/dasab/OneDrive/Desktop/RSL"

def extract_docx(path):
    try:
        doc = Document(path)
        return "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
    except Exception as e:
        return f"Error reading docx: {e}"

def extract_xlsx(path):
    try:
        xls = pd.ExcelFile(path)
        out = []
        for sheet in xls.sheet_names:
            df = pd.read_excel(xls, sheet_name=sheet)
            out.append(f"--- Sheet: {sheet} ---")
            out.append(df.to_string())
        return "\n".join(out)
    except Exception as e:
        return f"Error reading xlsx: {e}"

with open(os.path.join(base_dir, "extracted_output.txt"), "w", encoding="utf-8") as f:
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.startswith("~$"):
                continue
            path = os.path.join(root, file)
            if file.endswith(".docx"):
                f.write(f"\n\n================ FILE: {file} ({root}) ================\n")
                f.write(extract_docx(path))
            elif file.endswith(".xlsx"):
                f.write(f"\n\n================ FILE: {file} ({root}) ================\n")
                f.write(extract_xlsx(path))

print("Extraction complete!")
