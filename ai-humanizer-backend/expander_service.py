import random

# --- STEALTH ENGINE (Reused for consistency) ---
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

# --- EXPANDER LOGIC ---
async def process_expansion(client, text, type="essay"):
    print(f"[Service] Expanding text into '{type}'...")

    if type == "email":
        system_instruction = """
        You are a professional ghostwriter. Expand the user's rough notes into a polite, professional email.
        - Keep it concise but friendly.
        - Use standard professional email formatting.
        - Do NOT use robotic phrases like "I hope this email finds you well."
        """
    elif type == "blog":
        system_instruction = """
        You are a creative blog writer. Expand the input into an engaging blog post.
        - Use short paragraphs.
        - Be opinionated and human-like.
        - Avoid "In conclusion" or "Overall".
        """
    else: # Essay
        system_instruction = """
        You are a student. Expand the input points into a detailed essay.
        - Simple, direct English.
        - No complex academic jargon.
        - Make it flow naturally like a student wrote it.
        """

    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash", # Using the smarter model for creation
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": f"Expand this:\n{text}"}
            ],
            temperature=0.9, # High creativity
        )
        
        raw_text = response.choices[0].message.content
        
        # Cleanup
        clean_text = raw_text.replace("**", "").replace("##", "").replace("Subject:", "")
        
        # Apply Stealth so the output is instantly undetectable
        return inject_heavy_stealth(clean_text)

    except Exception as e:
        raise Exception(f"Expander failed: {str(e)}")