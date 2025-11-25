import math

def calculate_text_stats(text: str):
    """
    Analyzes text to return useful metadata.
    """
    if not text:
        return {
            "word_count": 0,
            "char_count": 0,
            "reading_time": "0 sec"
        }
        
    words = text.split()
    word_count = len(words)
    char_count = len(text)
    
    # Average reading speed = 200 words per minute
    reading_seconds = math.ceil((word_count / 200) * 60)
    
    if reading_seconds < 60:
        time_str = f"{reading_seconds} sec"
    else:
        mins = reading_seconds // 60
        time_str = f"{mins} min"

    return {
        "word_count": word_count,
        "char_count": char_count,
        "reading_time": time_str
    }