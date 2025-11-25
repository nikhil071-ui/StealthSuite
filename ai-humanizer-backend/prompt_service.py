# --- PROMPT ENGINEERING ENGINE ---
async def process_prompt_refinement(client, messy_prompt, goal="general"):
    print(f"[Service] Refining prompt for goal '{goal}'...")

    system_instruction = """
    You are a world-class Prompt Engineer.
    
    YOUR GOAL:
    Take the user's lazy, vague input and rewrite it into a "God-Tier" prompt that would get the best possible result from an LLM (like GPT-4 or Gemini).
    
    THE FORMULA FOR A PERFECT PROMPT:
    1. **Persona**: Who should the AI be? (e.g., "Act as a senior historian...")
    2. **Task**: Clear, specific instructions.
    3. **Context**: Background info and constraints.
    4. **Format**: How the output should look (Markdown, Table, JSON, list).
    
    OUTPUT:
    Return ONLY the refined prompt. Do not add conversational filler like "Here is your prompt:".
    """
    
    user_message = f"Refine this prompt: '{messy_prompt}'"
    if goal == "creative":
        user_message += "\nOptimize for creativity, storytelling, and unique flair."
    elif goal == "coding":
        user_message += "\nOptimize for clean code, best practices, and comments."
    elif goal == "academic":
        user_message += "\nOptimize for research, citations, and formal tone."

    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7, 
        )
        
        refined_prompt = response.choices[0].message.content
        return refined_prompt

    except Exception as e:
        raise Exception(f"Prompt refiner failed: {str(e)}")