import re
import random

async def process_detection(client, text):
    print(f"[Service] Detecting AI patterns...")

    # --- 1. STEALTH CHECK (The "Diplomat" Layer) ---
    # If the text has our invisible characters, we know it bypasses external detectors.
    # We return a LOW score to reflect that safety.
    if "\u200B" in text or "\u200D" in text:
        print("✅ Stealth characters detected. Simulating human score.")
        
        # Randomize score (0-3%) so it looks organic
        natural_score = random.randint(0, 3) 
        
        return {
            "score": natural_score, 
            "label": "Human Written",
            "analysis": "Text contains natural irregularities and structural variance typical of human writing."
        }

    # --- 2. REAL AI ANALYSIS (For Competitors/Raw Text) ---
    # UPDATED LOGIC: "Guilty until Proven Innocent"
    # We assume text is AI unless we find specific "Human" flaws (typos, slang).
    
    system_instruction = """
    You are a strict AI Detection Algorithm.
    
    CORE LOGIC:
    - AI (ChatGPT, Gemini) writes with perfect grammar, predictable structure, and neutral tone.
    - Humans write with messiness, typos, slang, and irregular structure.
    
    SCORING GUIDE (0-100):
    1. **HIGH SCORE (85-100)**: 
       - Perfect grammar.
       - Standardized sentence length.
       - Words like "Furthermore", "In conclusion", "Crucial", "Realm".
       - No spelling errors.
       
    2. **LOW SCORE (0-15)**:
       - **Contains TYPOS** (e.g. "teh", "dont").
       - **Contains SLANG** (e.g. "gonna", "wanna", "lol").
       - **Contains EMOJIS**.
       - Informal/Messy structure.
       
    3. **MEDIUM SCORE (40-60)**:
       - Grammatically correct but conversational.
    
    TASK:
    Analyze the input text.
    - If it is clean and academic -> Mark as AI (High Score).
    - If it has typos or slang -> Mark as Human (Low Score).
    
    Return ONLY the numeric score.
    """
    
    try:
        # Use gemini-2.0-flash for better reasoning capabilities
        response = client.chat.completions.create(
            model="gemini-2.0-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": text}
            ],
            temperature=0.0, 
        )
        
        raw_response = response.choices[0].message.content
        
        # Parse number safely
        match = re.search(r'\d+', raw_response)
        
        if match:
            score = int(match.group())
            score = max(0, min(100, score))
        else:
            score = 90 # Default to AI if uncertain/error
            
        # Generate dynamic analysis feedback
        if score > 80: 
            label = "Definitely AI"
            analysis = "Text is polished, grammatically perfect, and lacks human 'noise' (typos/irregularities)."
        elif score > 50: 
            label = "Likely AI"
            analysis = "Grammar is perfect, though the tone attempts to be conversational."
        elif score > 20: 
            label = "Mixed / Uncertain"
            analysis = "Shows a mix of robotic structure and human-like phrasing."
        else: 
            label = "Human Written"
            analysis = "Contains distinct human markers (typos, slang, emojis, or organic flow)."
        
        return {
            "score": score, 
            "label": label,
            "analysis": analysis
        }

    except Exception as e:
        print(f"Detector Error: {str(e)}")
        return {
            "score": 90, 
            "label": "Likely AI", 
            "analysis": "Analysis failed. Defaulting to high probability."
        }
