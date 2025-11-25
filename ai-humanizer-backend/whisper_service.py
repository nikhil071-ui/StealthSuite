import json
import random
import re

# --- STEALTH ENGINE ---
def inject_id_stealth(text):
    """
    Injects invisible characters to break AI detection patterns.
    CRITICAL: Skips content inside Markdown code blocks (```...```) 
    to ensure code remains copy-pasteable and runnable.
    """
    if not text: return ""
    
    # Invisible characters
    c1 = "\u200B" 
    c2 = "\u200D"
    
    # Split by code blocks so we only modify the "text" parts
    parts = re.split(r'(```.*?```)', text, flags=re.DOTALL)
    
    processed_parts = []
    
    for part in parts:
        # If this part is a code block, leave it exactly as is
        if part.startswith("```"):
            processed_parts.append(part)
            continue
            
        # Otherwise, apply stealth to the text
        words = part.split(" ")
        new_words = []
        common_triggers = ["the", "and", "is", "to", "in", "of", "that", "it", "with", "as", "for", "on", "solution", "approach"]
        
        for word in words:
            clean_word = word.lower().strip(".,!?-:;")
            if clean_word in common_triggers:
                if len(word) > 1:
                    mid = len(word) // 2
                    new_words.append(word[:mid] + c1 + word[mid:])
                else:
                    new_words.append(c1 + word)
            elif len(word) > 5 and random.random() > 0.3:
                mid = len(word) // 2
                new_words.append(word[:mid] + c2 + word[mid:])
            else:
                new_words.append(word)
        
        processed_parts.append(" ".join(new_words))
                
    return "".join(processed_parts)

async def generate_whisper_response(client, transcript: str):
    """
    Smart-switches between Code Mode and Interview Mode.
    """
    
    system_prompt = """
    You are 'Live Whisper', an Elite Technical Interview Copilot.
    
    INPUT: The user is in a high-stakes interview.
    
    YOUR TASK: Provide the exact, optimal answer.
    
    --- OUTPUT FORMAT RULES (STRICT) ---
    
    1. **FOR CODING QUESTIONS:**
       - Provide ONLY the code. 
       - Wrap it in Markdown code blocks (e.g., ```python).
       - Add brief comments inside the code for clarity.
       - Example:
         ```python
         def solve(arr):
             # Use a hash map for O(n) lookup
             seen = {}
             ...
         ```
    
    2. **FOR THEORETICAL/BEHAVIORAL:**
       - Use **Bold Headers** for key concepts.
       - Use bullet points for readability.
       - Keep it punchy and high-level (Senior Engineer level).
       - Example:
         **1. Scalability:**
         Horizontal scaling is preferred here because...
    
    3. **GENERAL:**
       - Do not use conversational filler ("Here is the answer").
       - Just give the content.
    """
    
    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"INTERCEPTED AUDIO: '{transcript}'"}
            ],
            temperature=0.4, 
            max_tokens=1500 
        )
        
        raw_answer = response.choices[0].message.content
        
        # Apply Smart Stealth
        stealth_answer = inject_id_stealth(raw_answer)
        
        return stealth_answer
        
    except Exception as e:
        print(f"Whisper Error: {e}")
        return "Error: Signal Lost. Retrying..."