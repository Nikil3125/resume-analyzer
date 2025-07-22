import pdfplumber

def parse_resume(file_path):
    print("Trying to open file:", file_path)
    try:
        with pdfplumber.open(file_path) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return {
            "raw_text": text
        }
    except Exception as e:
        print("Error in parse_resume:", e)
        raise 