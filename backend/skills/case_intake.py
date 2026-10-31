"""
NyAI Hermes Agent Skill: Case Intake Diagnostic & Step-by-Step Advisory
Interactively diagnoses legal matters, asks investigative triage questions,
calculates statutory limitation periods, and recommends specialized local counsel.
"""

from typing import Dict, List, Tuple
import re
from .lawyer_discovery import find_lawyers, format_lawyer_cards
from .web_scrape_skill import scrape_legal_source

INDIAN_CITIES = [
    "delhi", "new delhi", "noida", "gurgaon", "gurugram", "ghaziabad", "faridabad",
    "mumbai", "navi mumbai", "thane", "pune", "nagpur",
    "bengaluru", "bangalore", "mysore", "mysuru",
    "ahmedabad", "gandhinagar", "vadodara", "surat", "rajkot",
    "hyderabad", "secunderabad", "warangal",
    "chennai", "coimbatore", "madurai",
    "kolkata", "howrah", "chandigarh", "jaipur", "lucknow", "kanpur", "patna", "bhopal", "indore", "kochi"
]

def analyze_user_prompt(text: str, history: List[Dict]) -> Dict:
    """
    Evaluates whether the user is:
    - Initiating a new legal dispute / case intake
    - Requesting lawyer recommendations
    - Asking a statutory or academic legal question
    - Answering previous diagnostic questions
    """
    t = text.lower()
    
    # Check for city mentions
    detected_city = None
    for c in INDIAN_CITIES:
        if re.search(r'\b' + re.escape(c) + r'\b', t):
            detected_city = c.title()
            if detected_city in ["New Delhi", "Noida", "Gurgaon", "Gurugram"]:
                detected_city = "Delhi"
            elif detected_city in ["Navi Mumbai", "Thane"]:
                detected_city = "Mumbai"
            elif detected_city in ["Bangalore", "Mysuru"]:
                detected_city = "Bengaluru"
            break
            
    # Check for explicit lawyer / advocate requests
    is_lawyer_query = any(k in t for k in [
        "lawyer", "advocate", "counsel", "attorney", "vakil", "chamber", "contact detail", "phone number", "suggest lawyer"
    ])
    
    # Check for dispute / case intake cues
    is_case_dispute = any(k in t for k in [
        "what happened", "what to do", "cheque bounce", "cheque dishonour", "notice received",
        "scam", "fraud", "cheated", "fir", "police", "arrest", "tenant", "landlord", "eviction",
        "builder", "possession", "flat", "refund", "divorce", "maintenance", "custody", "agreement",
        "breach", "salary unpaid", "terminated", "defamation", "dispute", "sued", "summons", "court case"
    ])
    
    # Check if the query contains enough factual substance
    word_count = len(text.strip().split())
    has_substance = word_count >= 18
    
    return {
        "is_case_dispute": is_case_dispute,
        "is_lawyer_query": is_lawyer_query,
        "detected_city": detected_city,
        "has_substance": has_substance,
        "query": text
    }

def generate_interactive_case_response(user_text: str, history: List[Dict]) -> str:
    """
    Generates a legally grounded diagnostic interview and advisory response.
    """
    meta = analyze_user_prompt(user_text, history)
    query_lower = user_text.lower()
    city = meta["detected_city"] or "Delhi"
    
    # ── CASE 1: DIRECT LAWYER DISCOVERY REQUEST ──
    if meta["is_lawyer_query"] and not meta["has_substance"]:
        # Find lawyers matching the city and keywords
        lawyers = find_lawyers(city=city, domain_query=user_text)
        cards = format_lawyer_cards(lawyers)
        
        return (
            f"### Verified Legal Counsel in {city}\n\n"
            f"Here are verified advocates admitted to practice before the High Court and District Courts in **{city}** with their direct chambers contact details.\n\n"
            f"{cards}\n\n"
            f"**To help prepare your brief for consultation, could you tell me a little more about your case?**\n"
            f"1. What is the core matter (e.g. recovery, criminal defense, property, tenancy, matrimonial, consumer)?\n"
            f"2. Has any formal legal notice or police complaint already been initiated?\n"
            f"3. What approximate dates or financial amounts are involved?"
        )

    # ── CASE 2: USER EXPLAINING A DISPUTE BUT MISSING CRITICAL FACTS ──
    if meta["is_case_dispute"] and not meta["has_substance"]:
        return (
            "### NyAI Case Intake & Diagnostic Triage\n\n"
            "To give you an accurate statutory roadmap, calculate limitation deadlines, and connect you with qualified counsel in your jurisdiction, I need to understand what happened.\n\n"
            "**Please share a few details:**\n\n"
            "1. **What happened?**\n"
            "   *What is the incident or transaction? What dates and amounts (if any) are involved?*\n\n"
            "2. **Where did this take place?**\n"
            "   *Which city and state did the agreement, incident, or banking transaction occur in?*\n\n"
            "3. **What stage is the dispute in right now?**\n"
            "   *Have you received or sent a legal notice? Has an FIR or police complaint been lodged? Or has a court summons arrived?*\n\n"
            "4. **What documentary evidence exists?**\n"
            "   *Do you have written agreements, payment receipts, bank statements, WhatsApp/SMS records, or emails?*\n\n"
            "*(You can describe your situation in simple everyday language. Once you provide the facts, I will outline your immediate statutory next steps, relevant legal provisions, and verified lawyers in your city).* "
        )

    # ── CASE 3: FULL ADVISORY WITH NEXT STEPS AND LAWYER CONTACTS ──
    # User provided sufficient facts
    domain = "general"
    statute_heading = "Applicable Indian Statutory Framework"
    next_steps = []
    limitation_text = ""
    
    if any(k in query_lower for k in ["cheque", "check", "bounce", "138", "dishonour"]):
        domain = "cheque bounce"
        statute_heading = "Section 138, Negotiable Instruments Act, 1881"
        next_steps = [
            "**Preserve the Original Cheque and Bank Return Memo**: The memo date triggers the strict statutory clock.",
            "**Send Statutory Demand Notice within 30 Days**: Send a formal legal notice demanding payment within 15 days via Registered Post AD and Speed Post.",
            "**Wait for the 15-Day Cure Period**: The cause of action arises only on the 16th day following receipt of notice.",
            "**File Criminal Complaint within 30 Days**: Section 142 mandates filing the complaint before the competent Judicial Magistrate within 1 month from the cause of action."
        ]
        limitation_text = "**Critical Limitation Deadline**: Notice must be dispatched strictly within **30 days** of receiving the bank memo. Complaint must be filed within **30 days** after the 15-day cure period expires."
        
    elif any(k in query_lower for k in ["scam", "fraud", "cheated", "420", "money taken", "cyber"]):
        domain = "criminal fraud"
        statute_heading = "Section 318 BNS 2023 (Old Section 420 IPC) & IT Act Section 66D"
        next_steps = [
            "**Preserve Digital Records**: Take certified screenshots and preserve transaction IDs under Section 63, Bharatiya Sakshya Adhiniyam (BSA 2023).",
            "**Report to National Cyber Crime Portal**: Call 1930 immediately or file at `cybercrime.gov.in` within 24 hours to freeze suspicious bank accounts.",
            "**Lodge Written Police Complaint**: File with the local Police Station / Cyber Crime Cell under Section 173 BNSS 2023 requesting an FIR.",
            "**Magistrate Remedy if Police Refuse FIR**: If the SHO refuses to lodge the FIR, approach the Superintendent of Police under Section 175(3) BNSS or file an application before the Judicial Magistrate under Section 175(3) BNSS (old 156(3) CrPC)."
        ]
        limitation_text = "**Limitation Warning**: For criminal cheating punishable up to 7 years, there is no formal period of limitation under Section 514 BNSS (old 468 CrPC), but unexplained delay significantly weakens the prosecution case."
        
    elif any(k in query_lower for k in ["tenant", "landlord", "rent", "eviction", "lease", "flat"]):
        domain = "property tenancy"
        statute_heading = "Transfer of Property Act 1882 (Section 106) & State Rent Control"
        next_steps = [
            "**Review the Lease Agreement**: Check the notice period, lock-in clauses, and dispute resolution mechanism.",
            "**Issue 15-Day Notice of Termination**: Under Section 106 of the Transfer of Property Act, terminating a month-to-month tenancy requires 15 days written notice.",
            "**Civil Suit for Ejectment and Mesne Profits**: If the tenant refuses to vacate, file an eviction suit before the competent City Civil Court / Small Causes Court.",
            "**Avoid Self-Help Measures**: Never disconnect water, electricity, or lock premises without court sanction; this violates Section 115 BNS (old 341 IPC wrongful restraint)."
        ]
        limitation_text = "**Limitation Deadline**: Recovery of arrears of rent is limited to **3 years** under Article 52 of the Limitation Act, 1963."
        
    else:
        domain = "civil dispute"
        statute_heading = "Code of Civil Procedure (CPC 1908) & Indian Contract Act 1872"
        next_steps = [
            "**Collate Documentary Evidence**: Gather all agreements, invoices, statements of account, and email exchanges.",
            "**Issue Formal Legal Notice**: Provide a clear 15 or 30 day cure period before initiating court litigation.",
            "**Mandatory Pre-Institution Mediation**: If commercial dispute under Commercial Courts Act 2015, mediation under Section 12A is mandatory before filing suit.",
            "**Civil Suit for Recovery**: File a summary suit under Order XXXVII CPC or ordinary money suit before the competent District Court."
        ]
        limitation_text = "**Limitation Deadline**: Suits for breach of contract or recovery of money must be filed within **3 years** from the date the debt became due (Limitation Act 1963)."

    # Fetch live or curated citation data
    scrape_data = scrape_legal_source(user_text)
    lawyers = find_lawyers(city=meta["detected_city"] or "Delhi", domain_query=domain)
    lawyer_cards = format_lawyer_cards(lawyers)

    response_parts = []
    response_parts.append(f"### Legal Diagnostic & Step-by-Step Action Plan\n")
    response_parts.append(f"Based on your case summary in **{city}**, here is your statutory analysis, immediate next steps, and verified advocate contacts.\n")
    
    response_parts.append(f"#### § 1. Statutory Provisions & Governing Law: {statute_heading}\n")
    if scrape_data.get("citations"):
        for c in scrape_data["citations"][:2]:
            response_parts.append(f"- **{c['title']}**: {c['snippet']} *([Official Reference]({c['url']}))*\n")
            
    response_parts.append("\n#### § 2. What to Do Now (Immediate Next Steps)\n")
    for step in next_steps:
        response_parts.append(f"1. {step}\n")
        
    if limitation_text:
        response_parts.append(f"\n> **Statutory Limitation**: {limitation_text}\n")
        
    response_parts.append(f"\n#### § 3. Recommended Advocates & Legal Chambers in {city}\n")
    response_parts.append(lawyer_cards)
    
    return "".join(response_parts)
