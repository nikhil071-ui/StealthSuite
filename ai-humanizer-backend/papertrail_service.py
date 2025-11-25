import json
import math
import random

# --- STEALTH ENGINE ---
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

# --- HELPER: Generate a Single Chunk ---
async def generate_chunk(client, topic, part_number, total_parts, words_per_chunk, depth="normal"):
    """Generates a specific portion of the paper trail."""
    
    detail_instruction = "Keep the writing natural and moderately spaced."
    if depth == "deep":
        detail_instruction = "Write densely with advanced vocabulary and detailed explanations."

    system_instruction = f"""
    You are a student writing Part {part_number} of {total_parts} for a handwritten project.
    
    TARGET LENGTH FOR THIS CHUNK:
    You must write approximately **{words_per_chunk} words**. 
    Do NOT write less. We need to fill physical paper pages.
    
    CONTENT:
    - Continue the essay/notes from the previous part.
    - {detail_instruction}
    
    DIAGRAMS:
    - Include 1 simple hand-drawn SVG diagram if it fits the context.
    - SVG: `fill="none"`, `stroke="black"`. Labels inside SVG using `<text>`.
    
    OUTPUT JSON:
    {{
        "notes_chunk": [
            {{ "type": "text", "data": "..." }},
            {{ "type": "diagram", "svg": "...", "caption": "..." }}
        ],
        "draft_chunk": "..."
    }}
    """

    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": f"Write Part {part_number} (approx {words_per_chunk} words) about: {topic}"}
            ],
            temperature=0.7, 
            response_format={"type": "json_object"} 
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Chunk Error: {e}")
        return {"notes_chunk": [], "draft_chunk": ""}

# --- MAIN PAPER TRAIL ENGINE ---
async def process_paper_trail(client, text, pages=3, depth="normal"):
    print(f"[Service] Generating {pages} pages ({depth} mode)...")

    # MATH CALIBRATION: Large handwriting (Caveat 3xl) fits about 70 words per A4 page.
    # Lowering this ensures the AI writes enough to actually fill the visual pages.
    WORDS_PER_PAGE = 70 
    if depth == "deep": WORDS_PER_PAGE = 90 # Denser writing for deep mode

    total_target_words = pages * WORDS_PER_PAGE
    
    # Chunking: AI handles about 300-400 words reliably per call.
    # So 1 Chunk = approx 5 pages.
    pages_per_chunk = 5
    chunks_needed = math.ceil(pages / pages_per_chunk)
    
    words_per_chunk = int(total_target_words / chunks_needed)
    
    combined_notes = []
    combined_draft = ""
    combined_outline = f"Project Outline: {text}\n\n"

    print(f"  - Strategy: {chunks_needed} chunks, ~{words_per_chunk} words each.")

    # --- THE GENERATION LOOP ---
    for i in range(1, chunks_needed + 1):
        print(f"  - Generating Chunk {i}/{chunks_needed}...")
        chunk_data = await generate_chunk(client, text, i, chunks_needed, words_per_chunk, depth)
        
        # Append data
        if "notes_chunk" in chunk_data:
            combined_notes.extend(chunk_data["notes_chunk"])
        if "draft_chunk" in chunk_data:
            # Add a newline between chunks to separate paragraphs
            combined_draft += chunk_data["draft_chunk"] + "\n\n"
            
    # --- GENERATE OUTLINE SEPARATELY ---
    try:
        outline_resp = client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": f"Create a short, 1-page outline for: {text}"}]
        )
        combined_outline = outline_resp.choices[0].message.content
    except:
        pass

    # --- APPLY STEALTH ---
    print("  - Applying Stealth...")
    
    # 1. Stealthify Notes
    for block in combined_notes:
        if block["type"] == "text":
            clean_text = block["data"].replace("**", "").replace("##", "")
            block["data"] = inject_heavy_stealth(clean_text)
            
    # 2. Stealthify Outline
    clean_outline = combined_outline.replace("**", "").replace("##", "")
    final_outline = inject_heavy_stealth(clean_outline)
    
    # 3. Stealthify Draft
    clean_draft = combined_draft.replace("**", "").replace("##", "")
    final_draft = inject_heavy_stealth(clean_draft)

    return {
        "notes_content": combined_notes,
        "outline": final_outline,
        "rough_draft": final_draft
    }