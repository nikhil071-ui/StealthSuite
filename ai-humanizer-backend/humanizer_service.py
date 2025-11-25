import random

# --- 1. STEALTH ENGINE (Your Exact Logic) ---
def inject_heavy_stealth(text):
    """
    CONSISTENCY FIX:
    Attacks MATHEMATICALLY. Every single word longer than 3 letters gets sliced.
    Common words (the, and, is) get sliced TWICE.
    """
    words = text.split(" ")
    new_words = []
    
    c1 = "\u200B" # Zero Width Space
    c2 = "\u200D" # Zero Width Joiner
    
    super_common = ["the", "and", "is", "are", "it", "to", "of", "in", "that", "with"]
    
    for word in words:
        clean_word = word.lower().strip(".,!?;:")
        
        # RULE 1: Double inject common words
        if clean_word in super_common:
            if len(word) >= 2:
                new_words.append(word[0] + c1 + word[1] + c2 + word[2:])
            else:
                new_words.append(word + c1)
        # RULE 2: Inject long words
        elif len(word) > 3:
            split_index = len(word) // 2
            new_words.append(word[:split_index] + c1 + word[split_index:])
        # RULE 3: Suffix short words
        else:
            new_words.append(word + c2)
            
    return " ".join(new_words)

# --- 2. CORE PROCESSING LOGIC ---
# This function is called by main.py
async def process_humanization(client, text, mode, models):
    print(f"[Service] Humanizing text...")

    # THE PROMPT YOU WANT (Bans repetitive structure)
    prompt_standard = """
    You are a student rewriting a text.
    
    STRICT RULES:
    1. **VARIETY**: Do NOT start every sentence with "So", "Basically", or "Now". Use them only once per paragraph.
    2. **Sentence Flow**: Mix short sentences and long sentences.
    3. **No Contractions**: Write "do not", "I will", "it is". 
    4. **Tone**: Simple, direct, easy English.
    5. **Formatting**: Plain text only. No bold. No headers.
    """

    # If you want to support other modes later, you can add them here.
    # For now, we use your preferred prompt for everything.
    system_instruction = prompt_standard

    # Failover Loop
    last_error = None
    for model_name in models:
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": text}
                ],
                temperature=1.0, 
            )
            
            raw_text = response.choices[0].message.content
            
            # Basic Cleanup
            clean_text = raw_text.replace("—", "-").replace("**", "").replace("##", "")
            clean_text = clean_text.replace("don't", "do not").replace("it's", "it is")
            
            # Apply Stealth
            return inject_heavy_stealth(clean_text)

        except Exception as e:
            print(f"Humanizer Model {model_name} failed: {e}")
            last_error = e
            continue 

    raise Exception(f"All humanizer models failed. {str(last_error)}")