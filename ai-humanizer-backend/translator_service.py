# --- TRANSLATOR ENGINE ---
async def process_translation(client, text, target_lang="Spanish"):
    print(f"[Service] Translating text to '{target_lang}'...")

    system_instruction = f"""
    You are a professional native translator and editor. 
    Translate the following text into {target_lang}.
    
    CRITICAL RULES:
    1. **Natural Flow**: Do NOT translate word-for-word. Translate the *meaning* and *tone*.
    2. **Native Idioms**: Use idioms and phrasing that a native speaker would actually use.
    3. **No Robotic Phrasing**: Avoid stiff, formal machine-translation patterns.
    4. **Maintain Context**: If the input is casual, keep the translation casual.
    """

    try:
        response = client.chat.completions.create(
            model="gemini-2.5-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": text}
            ],
            temperature=0.3, # Lower temperature for accuracy
        )
        
        translation = response.choices[0].message.content
        
        # Optional: We usually don't inject stealth chars into foreign languages 
        # as it might break specific language rendering, but the natural 
        # rewriting alone usually beats detectors for translated text.
        
        return translation

    except Exception as e:
        raise Exception(f"Translator failed: {str(e)}")