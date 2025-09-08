from flask import Flask, request, jsonify
from services.analyzer import analyze_resume
import traceback

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    file_path = data.get('filePath')
    job_role = data.get('jobRole')
    job_description = data.get('jobDescription')
    if not file_path or not job_role or not job_description:
        return jsonify({'error': 'filePath, jobRole, and jobDescription are required'}), 400
    try:
        result = analyze_resume(file_path, job_role, job_description)
        return jsonify(result)
    except Exception as e:
        print("Error in /analyze route:", e)
        traceback.print_exc()  # <-- This will print the full error stack trace
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000) 
    
