import random

# --- STEALTH ENGINE (Reused) ---
def inject_heavy_stealth(text):
    if not text: return ""
    words = text.split(" ")
    new_words = []
    c1 = "\u200B" 
    c2 = "\u200D"
    super_common = ["the", "and", "is", "are", "it", "to", "of", "in", "that", "with"]
    for word in words:
        if not word:
            new_words.append("")
            continue
        clean_word = word.lower().strip(".,!?;:")
        if clean_word in super_common:
            if len(word) >= 2: new_words.append(word[0] + c1 + word[1] + c2 + word[2:])
            else: new_words.append(word + c1)
        elif len(word) > 3:
            split_index = len(word) // 2
            new_words.append(word[:split_index] + c1 + word[split_index:])
        else:
            new_words.append(word + c2)
    return " ".join(new_words)

# --- GENERATOR ENGINE ---
async def process_generation(client, idea, recipient="Boss", tone="Professional"):
    print(f"[Service] Generating message for '{recipient}' with tone '{tone}'...")

    system_instruction = f"""
    You are an expert communication assistant.
    
    TASK:
    Draft a message/email based on the user's rough idea.
    
    CONTEXT:
    - Recipient: {recipient}
    - Desired Tone: {tone}
    
    RULES:
    1. **Be Concise**: Do not write a novel. Keep it appropriate for an email or Slack message.
    2. **Tone Matching**:
       - If "Professional": Use "Dear", "Sincerely", polite phrasing. No slang.
       - If "Friendly": Use "Hey", "Best", casual phrasing.
       - If "Firm": Be direct, clear, and serious.
    3. **Human Touch**: Avoid robotic phrases like "I hope this email finds you well" unless absolutely necessary. Use natural sentence structures.
    """

    try:
        response = client.chat.completions.create(
            model="gemini-2.5-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": f"Rough Idea: {idea}"}
            ],
            temperature=0.7, 
        )
        
        raw_message = response.choices[0].message.content
        
        # Apply Stealth so even these messages pass detectors
        final_message = inject_heavy_stealth(raw_message)
        
        return final_message

    except Exception as e:
        raise Exception(f"Generator failed: {str(e)}")