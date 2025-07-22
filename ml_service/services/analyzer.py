from utils.parser import parse_resume
from utils.skills import SKILLS_LIST
import re
from sentence_transformers import SentenceTransformer, util

# Load a pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')

def analyze_resume(file_path, job_role, job_description):
    parsed = parse_resume(file_path)
    raw_text = parsed.get('raw_text', '').lower()

    # --- Semantic Matching ---
    resume_embedding = model.encode(raw_text, convert_to_tensor=True)
    jd_embedding = model.encode(job_description, convert_to_tensor=True)
    semantic_similarity = util.pytorch_cos_sim(resume_embedding, jd_embedding).item()
    
    # Simple keyword matching from job description
    keywords = set(re.findall(r'\w+', job_description.lower()))
    matched_keywords = [k for k in keywords if k in raw_text]
    
    keyword_match_percentage = (len(matched_keywords) / len(keywords)) * 100 if keywords else 0

    # Skill Extraction
    extracted_skills = [skill for skill in SKILLS_LIST if skill in raw_text]

    # --- Combined Scoring ---
    # Give more weight to semantic similarity
    final_score = (semantic_similarity * 0.7) + (keyword_match_percentage / 100 * 0.3)
    final_score = min(100, final_score * 100) # Scale to 100

    feedback = f"Overall match score is {final_score:.2f}%. Semantic similarity: {semantic_similarity*100:.2f}%. Keywords matched: {keyword_match_percentage:.2f}%."

    return {
        'filePath': file_path,
        'jobRole': job_role,
        'score': final_score,
        'semantic_similarity': semantic_similarity,
        'keyword_match_percentage': keyword_match_percentage,
        'feedback': feedback,
        'matched_keywords': matched_keywords,
        'total_keywords': len(keywords),
        'extracted_skills': extracted_skills,
        'parsed': parsed
    } 