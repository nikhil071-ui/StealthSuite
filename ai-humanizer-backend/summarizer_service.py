import random

# --- STEALTH ENGINE (Added to Summarizer) ---
def inject_heavy_stealth(text):
    """
    Injects invisible characters to break AI detection patterns.
    """
    if not text: return ""
    
    words = text.split(" ")
    new_words = []
    
    c1 = "\u200B" # Zero Width Space
    c2 = "\u200D" # Zero Width Joiner
    
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

# --- SUMMARIZER ENGINE ---
async def process_summary(client, text, style="bullet"):
    print(f"[Service] Summarizing text in '{style}' style...")

    # Prompts based on style
    if style == "paragraph":
        system_instruction = """
        You are an expert editor. Summarize the following text into a single, concise paragraph.
        - Keep the tone neutral and professional.
        - Retain the most important facts.
        - Do NOT use robotic transitions like "In conclusion".
        """
    else: # "bullet"
        system_instruction = """
        You are an expert analyst. Summarize the text into key bullet points.
        - Use a standard bullet point format (•).
        - Keep each point short and punchy.
        - Capture the core meaning.
        """

    try:
        response = client.chat.completions.create(
            model="gemini-2.5-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": text}
            ],
            temperature=0.5, 
        )
        
        raw_summary = response.choices[0].message.content
        
        # 1. Cleanup Markdown (Bold, Headers)
        clean_summary = raw_summary.replace("**", "").replace("##", "").replace("###", "")
        
        # 2. APPLY STEALTH (The missing link)
        final_stealth_summary = inject_heavy_stealth(clean_summary)
        
        return final_stealth_summary

    except Exception as e:
        raise Exception(f"Summarizer failed: {str(e)}")