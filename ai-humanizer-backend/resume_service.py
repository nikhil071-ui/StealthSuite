import json

async def analyze_resume_stealth(client, resume_text: str):
    """
    Analyzes a resume for 'Stealth' (passing ATS) and 'Bias' (passing humans).
    Generates a critique and specific defense arguments.
    
    This service is designed to simulate the logic of:
    1. ATS scanning (keyword matching, structural analysis).
    2. Human bias filtering (photos, personal information).
    """
    
    system_prompt = """
    You are 'Resume Stealth', an elite Career Strategist and ATS (Applicant Tracking System) Algorithm expert.
    
    YOUR MISSION:
    Analyze the user's resume text for two types of threats:
    1. **ATS Rejection:** Identify issues like missing keywords, overly complex formatting (tables, columns), or "AI-sounding" repetitive fluff.
    2. **Human Bias:** Identify risks like including personal photos, age indicators (graduation years, hobbies), or irrelevant personal information that could lead to unconscious discrimination.
    
    OUTPUT JSON FORMAT:
    {
        "stealth_score": 85, // 0-100 Integer. Higher is better for interview chances.
        "verdict": "High Probability of Interview", // Short summary verdict
        "red_flags": [
            "Critical: Resume includes a photo reference (High Bias Risk).",
            "Warning: Education section is placed before Experience (non-standard ATS flow)."
        ],
        "optimization_steps": [
            "Remove the headshot to comply with US/UK anti-bias standards.",
            "Integrate 3-5 keywords relevant to the job description (e.g., 'Kubernetes', 'CI/CD')."
        ],
        "defense_strategy": "If asked why you omitted a photo: 'I prioritize merit-based evaluation and adhere to modern DEI standards to ensure my skills are the primary focus.' (This is the smart answer to combat bias)"
    }
    """
    
    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"ANALYZE THIS RESUME:\n{resume_text}"}
            ],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
        
    except Exception as e:
        print(f"Resume Error: {e}")
        return {
            "stealth_score": 0,
            "verdict": "Analysis Failed",
            "red_flags": ["System Error: Could not connect to model."],
            "optimization_steps": [],
            "defense_strategy": ""
        }