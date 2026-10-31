"""
NyAI Hermes Skills Package
"""
from .lawyer_discovery import find_lawyers, format_lawyer_cards, LAWYER_DIRECTORY
from .web_scrape_skill import scrape_legal_source
from .case_intake import generate_interactive_case_response, analyze_user_prompt
from .statutory_engine import lookup_section, CONCORDANCE_MAP

__all__ = [
    "find_lawyers",
    "format_lawyer_cards",
    "LAWYER_DIRECTORY",
    "scrape_legal_source",
    "generate_interactive_case_response",
    "analyze_user_prompt",
    "lookup_section",
    "CONCORDANCE_MAP"
]
