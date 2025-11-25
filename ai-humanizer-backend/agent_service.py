import json
import asyncio
import random

# --- STEALTH ENGINE (Integrated) ---
def inject_id_stealth(text):
    """
    Injects invisible characters (Zero Width Space/Joiner) to break AI detection patterns 
    without affecting visual readability.
    """
    if not text: return ""
    
    # Invisible characters
    c1 = "\u200B" 
    c2 = "\u200D"
    
    words = text.split(" ")
    new_words = []
    
    # High-frequency AI tokens to target
    common_triggers = ["the", "and", "is", "to", "in", "of", "that", "it", "with", "as", "for", "on", "are", "was", "this"]
    
    for word in words:
        clean_word = word.lower().strip(".,!?-:;\"'()")
        
        # Strategy 1: Break high-probability tokens
        if clean_word in common_triggers:
            if len(word) > 1:
                mid = len(word) // 2
                new_words.append(word[:mid] + c1 + word[mid:])
            else:
                new_words.append(c1 + word)
                
        # Strategy 2: Random injection for complex words
        elif len(word) > 5 and random.random() > 0.3:
            mid = len(word) // 2
            new_words.append(word[:mid] + c2 + word[mid:])
            
        # Strategy 3: Occasional prefix/suffix injection
        else:
            if random.random() > 0.6:
                new_words.append(word + c1)
            else:
                new_words.append(word)
                
    return " ".join(new_words)

async def run_stealth_agent(client, mission: str, agent_type: str):
    """
    Simulates a multi-step autonomous agent.
    It generates 'thought steps' to show the user what it's doing, 
    then produces the final result.
    """
    
    # 1. Define Personas with Specific Instructions
    personas = {
        "researcher": "You are 'Cipher', an elite academic researcher. Your style is thorough, data-driven, and neutral. Avoid flowery language.",
        "writer": "You are 'Echo', a ghostwriter. Use varied sentence structures. Avoid starting sentences with 'Additionally' or 'Furthermore'. Write like a human.",
        "coder": "You are 'Zero', a senior dev. Write code that looks maintained by a human (add TODOs, inline comments, and non-perfect variable names)."
    }
    
    system_prompt = f"""
    {personas.get(agent_type, personas['writer'])}
    
    YOUR MISSION: {mission}
    
    TASK:
    1. Break this mission into 4 logical 'Action Steps' a human would take.
    2. Execute the mission and provide the FINAL RESULT.
    
    OUTPUT JSON FORMAT:
    {{
        "steps": [
            "Step 1: [Action Description]",
            "Step 2: [Action Description]",
            "Step 3: [Action Description]",
            "Step 4: [Action Description]"
        ],
        "result": "[The Final Output Content]"
    }}
    """
    
    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": "Execute Mission."}
            ],
            temperature=0.85, # Higher temp = less predictable AI patterns
            response_format={"type": "json_object"}
        )
        
        data = json.loads(response.choices[0].message.content)
        
        # --- APPLY STEALTH TO THE RESULT ---
        if "result" in data:
            raw_result = data["result"]
            # Inject stealth characters into the result before sending back
            data["result"] = inject_id_stealth(raw_result)
            
        return data
        
    except Exception as e:
        print(f"Agent Error: {e}")
        return {
            "steps": ["Error initializing agent...", "Retry recommended."],
            "result": "Mission Failed: Connection Interrupted."
        }