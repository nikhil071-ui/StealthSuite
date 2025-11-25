import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv

# --- IMPORTS (All Services) ---
from humanizer_service import process_humanization
from detector_service import process_detection
from summarizer_service import process_summary
from expander_service import process_expansion
from translator_service import process_translation
from ghost_service import process_ghost_write
from papertrail_service import process_paper_trail
from generator_service import process_generation
from prompt_service import process_prompt_refinement
from whisper_service import generate_whisper_response
from agent_service import run_stealth_agent
from resume_service import analyze_resume_stealth
# Removed: from cloud_service import cloud_manager
# Removed: from security_service import process_security_audit 
from utils import calculate_text_stats

# --- SECURITY: LOAD .ENV ---
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURATION ---
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_KEY:
    print("CRITICAL WARNING: GEMINI_API_KEY not found in .env file.")

client = OpenAI(
    api_key=GEMINI_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

AVAILABLE_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"]

# --- REQUEST MODELS ---
class HumanizeRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    mode: str = "standard"

class SummaryRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=10000)
    style: str = "bullet"

class ExpandRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000)
    type: str = "essay"

class TranslateRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    target_lang: str = "Spanish"

class GhostRequest(BaseModel):
    target_text: str = Field(..., min_length=1, max_length=5000)
    reference_text: str = Field(..., min_length=10, max_length=5000)

class PaperTrailRequest(BaseModel):
    text: str = Field(..., min_length=10, max_length=5000)
    pages: int = Field(3, ge=1, le=50)
    depth: str = "normal"

class GenerateRequest(BaseModel):
    idea: str = Field(..., min_length=1, max_length=1000)
    recipient: str = Field("Boss", min_length=1, max_length=50)
    tone: str = "Professional"

class PromptRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    goal: str = "general"

class WhisperRequest(BaseModel):
    text: str = Field(..., min_length=1)

class AgentRequest(BaseModel):
    mission: str = Field(..., min_length=1)
    agent_type: str = "researcher"

class ResumeRequest(BaseModel):
    text: str = Field(..., min_length=10)

# --- ENDPOINTS ---

@app.post("/api/humanize")
async def humanize_text(request: HumanizeRequest):
    try:
        humanized_text = await process_humanization(client, request.text, request.mode, AVAILABLE_MODELS)
        return {"humanized_text": humanized_text, "stats": calculate_text_stats(humanized_text)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/detect")
async def detect_ai(request: HumanizeRequest):
    try:
        result = await process_detection(client, request.text)
        result["stats"] = calculate_text_stats(request.text)
        return result
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/summarize")
async def summarize_text(request: SummaryRequest):
    try:
        summary = await process_summary(client, request.text, request.style)
        return {"summary": summary, "stats": calculate_text_stats(summary)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/expand")
async def expand_text(request: ExpandRequest):
    try:
        expanded_text = await process_expansion(client, request.text, request.type)
        return {"expanded_text": expanded_text, "stats": calculate_text_stats(expanded_text)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/translate")
async def translate_text(request: TranslateRequest):
    try:
        translation = await process_translation(client, request.text, request.target_lang)
        return {"translation": translation, "stats": calculate_text_stats(translation)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ghost")
async def ghost_protocol(request: GhostRequest):
    try:
        ghost_text = await process_ghost_write(client, request.target_text, request.reference_text)
        return {"ghost_text": ghost_text, "stats": calculate_text_stats(ghost_text)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/papertrail")
async def paper_trail(request: PaperTrailRequest):
    try:
        result_data = await process_paper_trail(client, request.text, request.pages, request.depth)
        return result_data
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
async def generate_message(request: GenerateRequest):
    try:
        message = await process_generation(client, request.idea, request.recipient, request.tone)
        return {"message": message, "stats": calculate_text_stats(message)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/prompt")
async def prompt_perfector(request: PromptRequest):
    try:
        refined_prompt = await process_prompt_refinement(client, request.text, request.goal)
        return {"refined_prompt": refined_prompt, "stats": calculate_text_stats(refined_prompt)}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/whisper")
async def handle_whisper(request: WhisperRequest):
    try:
        answer = await generate_whisper_response(client, request.text)
        return {"answer": answer}
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agents")
async def handle_agent(request: AgentRequest):
    try:
        result = await run_stealth_agent(client, request.mission, request.agent_type)
        return result
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/resume")
async def handle_resume(request: ResumeRequest):
    try:
        result = await analyze_resume_stealth(client, request.text)
        return result
    except Exception as e:
        print(f"SERVER ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
