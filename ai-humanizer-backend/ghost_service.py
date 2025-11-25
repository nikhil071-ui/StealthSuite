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
            if len(word) >= 2:
                new_words.append(word[0] + c1 + word[1] + c2 + word[2:])
            else:
                new_words.append(word + c1)
        elif len(word) > 3:
            split_index = len(word) // 2
            new_words.append(word[:split_index] + c1 + word[split_index:])
        else:
            new_words.append(word + c2)
    return " ".join(new_words)

# --- GHOST ENGINE ---
async def process_ghost_write(client, target_text, reference_text):
    print(f"[Service] Ghost Protocol initiated...")

    # This prompt instructs Gemini to analyze the DNA of the reference text
    system_instruction = f"""
    You are a forensic linguist and ghostwriter. 
    
    MISSION: 
    Rewrite the 'Target Text' so it sounds EXACTLY like the author of the 'Reference Text'.
    
    ANALYSIS STEPS:
    1. Analyze the Reference Text for: Sentence length, vocabulary complexity, transition words, and tone (sarcastic? formal? messy?).
    2. Rewrite the Target Text using those EXACT traits.
    3. If the Reference Text has grammar mistakes or slang, INCLUDE THEM in the output.
    4. Do NOT make it sound like AI. Make it sound like the specific human who wrote the reference.
    
    REFERENCE SAMPLE:
    "{reference_text[:2000]}" 
    """

    try:
        response = client.chat.completions.create(
            model="gemini-2.5-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": f"Rewrite this to match the style:\n{target_text}"}
            ],
            temperature=0.8, # High temp to capture "human" variance
        )
        
        raw_output = response.choices[0].message.content
        
        # Cleanup
        clean_text = raw_output.replace("**", "").replace("##", "")
        
        # Apply Stealth so it passes detectors AND sounds like the user
        return inject_heavy_stealth(clean_text)

    except Exception as e:
        raise Exception(f"Ghost Protocol failed: {str(e)}")