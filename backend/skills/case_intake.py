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
    
    # Check if a specific legal domain or emergency is identified
    has_specific_domain = any(re.search(r'\b' + re.escape(kw) + r'\b', t) for kw in [
        "kill", "killed", "killing", "murder", "homicide", "death", "stab", "shoot", "bail", "anticipatory", "arrest",
        "cheque", "check", "bounce", "dishonour", "138", "scam", "fraud", "cheat", "cyber", "tenant",
        "eviction", "landlord", "rent", "divorce", "maintenance", "salary", "terminated", "posh"
    ])

    # Check for dispute / case intake cues (vague prompts asking for general help)
    is_vague_intake = not has_specific_domain and any(k in t for k in [
        "what happened", "what to do", "help me", "need help", "dispute", "case against me", "legal issue", "problem"
    ])
    
    # Check if the query contains enough factual substance
    word_count = len(text.strip().split())
    has_substance = has_specific_domain or word_count >= 18
    
    return {
        "is_case_dispute": is_vague_intake,
        "is_lawyer_query": is_lawyer_query,
        "detected_city": detected_city,
        "has_substance": has_substance,
        "has_specific_domain": has_specific_domain,
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
    # Evaluate substantive dispute category
    domain = "civil dispute"
    statute_heading = "Code of Civil Procedure (CPC 1908) & Indian Contract Act 1872"
    next_steps = []
    limitation_text = ""
    is_emergency_criminal = False

    is_homicide = bool(re.search(r'\b(kill|killed|killing|killer|murder|murdered|homicide|death|dead|stab|stabbed|shoot|shot|strangle|poison|manslaughter|lynch|302|103|101|culpable\s+homicide)\b', query_lower))
    is_bail = bool(re.search(r'\b(arrest|arrested|bail|anticipatory\s+bail|custody|remand|lockup|police\s+station|warrant|surrender|480|482|438|439|detained)\b', query_lower))
    is_cheque = bool(re.search(r'\b(cheque|check|bounce|bounced|dishonour|138)\b', query_lower))
    is_fraud = bool(re.search(r'\b(scam|fraud|cheated|cheat|420|318|cyber|phishing|crypto\s+scam|telegram\s+scam)\b', query_lower))
    is_property = bool(re.search(r'\b(tenant|landlord|rent|eviction|lease|flat|builder|rera|property|possession)\b', query_lower))
    is_matrimonial = bool(re.search(r'\b(divorce|wife|husband|marriage|dowry|498a|85\s+bns|cruelty|domestic\s+violence|dv\s+act|maintenance|125\s+crpc|144\s+bnss|custody|alimony)\b', query_lower))
    is_employment = bool(re.search(r'\b(salary|wages|unpaid|fired|terminated|termination|severance|gratuity|provident\s+fund|pf|posh|labor\s+court|retrenchment|employer)\b', query_lower))

    if is_homicide:
        is_emergency_criminal = True
        domain = "criminal defense homicide"
        statute_heading = "Section 103 (Murder) & Section 101 (Culpable Homicide), Bharatiya Nyaya Sanhita 2023 (Old Sections 300 & 302 IPC)"
        next_steps = [
            "**Exercise Fundamental Right to Silence (Article 20(3))**: Do not give oral confessions, sign police statements, or answer custodial interrogations without your advocate present. Confessions to police officers are strictly inadmissible under Section 23, Bharatiya Sakshya Adhiniyam 2023 (BSA 2023).",
            f"**Engage Senior Criminal Defense Counsel Immediately**: Contact a qualified criminal trial advocate in {city} immediately. If financial means are unavailable, apply for free legal defense counsel via the District Legal Services Authority (DLSA) or call NALSA Helpline **15100** under Article 39A.",
            "**Formal Surrender before Judicial Magistrate**: Rather than evading or absconding (which prompts proclamation and property attachment under Section 84 BNSS), your advocate will draft and execute a formal voluntary surrender petition before the jurisdictional Judicial Magistrate / Metropolitan Magistrate under judicial protection.",
            "**Demand Mandatory Medical Examination (Section 53 BNSS 2023)**: Insist on an immediate medical examination by a government medical officer upon detention/surrender to formally document physical state, bodily marks, and mental condition on official record.",
            "**Counsel Representation at 24-Hour Remand Hearing**: Under Article 22(2) and Section 58 BNSS, police must produce the accused before the Magistrate within 24 hours. Your advocate must appear to oppose police remand and petition for direct judicial custody."
        ]
        limitation_text = "Grave non-bailable offense. Under Section 514 BNSS (old Section 468 CrPC), there is no period of limitation for murder. Securing immediate criminal defense counsel is critically imperative."

    elif is_bail:
        is_emergency_criminal = True
        domain = "criminal bail"
        statute_heading = "Section 480 (Regular Bail) & Section 482 (Anticipatory Bail), BNSS 2023 (Old Sections 437, 438, 439 CrPC)"
        next_steps = [
            "**Ascertain FIR & Complaint Details**: Verify the exact Police Station, Crime Number, and statutory offenses invoked.",
            "**Move Anticipatory Bail under Section 482 BNSS**: If arrest is anticipated, file an urgent application before the Sessions Court or High Court demonstrating cooperation with investigation and absence of flight risk.",
            "**Enforce Section 35 BNSS Protections**: For offenses punishable up to 7 years, police must comply with Arnesh Kumar guidelines and issue a Notice of Appearance rather than effecting arbitrary arrest.",
            "**Apply for Regular Bail upon Remand**: If arrested, counsel must move a bail application under Section 480 BNSS at the first production before the Judicial Magistrate."
        ]
        limitation_text = "Urgent custodial liberty matter; prompt filing before jurisdictional Sessions Court is paramount to prevent judicial remand."

    elif is_cheque:
        domain = "cheque bounce"
        statute_heading = "Section 138, Negotiable Instruments Act, 1881"
        next_steps = [
            "**Preserve Original Cheque and Bank Return Memo**: The return memo date starts the mandatory 30-day statutory clock.",
            "**Send Statutory Demand Notice within 30 Days**: Send a formal legal notice demanding payment within 15 days via Registered Post AD and Speed Post.",
            "**Wait for the 15-Day Cure Period**: The statutory cause of action arises only on the 16th day following receipt of notice.",
            "**File Criminal Complaint within 30 Days**: Section 142 mandates filing the complaint before the competent Judicial Magistrate within 1 month from the cause of action."
        ]
        limitation_text = "Notice must be dispatched strictly within **30 days** of receiving the bank memo. Complaint must be filed within **30 days** after the 15-day cure period expires."

    elif is_fraud:
        domain = "criminal fraud"
        statute_heading = "Section 318 BNS 2023 (Old Section 420 IPC) & IT Act Section 66D"
        next_steps = [
            "**Preserve Digital Evidence**: Take certified screenshots and preserve transaction IDs under Section 63, Bharatiya Sakshya Adhiniyam (BSA 2023).",
            "**Report to National Cyber Crime Portal**: Call 1930 immediately or file at `cybercrime.gov.in` within 24 hours to freeze suspicious bank accounts.",
            "**Lodge Written Police Complaint**: File with the local Police Station / Cyber Crime Cell under Section 173 BNSS 2023 requesting an FIR.",
            "**Magistrate Remedy if Police Refuse FIR**: If the SHO refuses to lodge the FIR, approach the Superintendent of Police under Section 175(3) BNSS or file an application before the Judicial Magistrate under Section 175(3) BNSS (old 156(3) CrPC)."
        ]
        limitation_text = "Prompt filing is essential to preserve banking freeze logs before funds are withdrawn or siphoned."

    elif is_matrimonial:
        domain = "matrimonial"
        statute_heading = "Sections 85 & 86 BNS 2023, PWDVA 2005 & Section 144 BNSS 2023"
        next_steps = [
            "**Explore Pre-Litigation Mediation**: Family disputes are compulsorily referred to mediation by the Family Court or DLSA counseling clinics.",
            "**File for Interim Maintenance**: Apply under Section 144 BNSS (old 125 CrPC) or Section 24 Hindu Marriage Act for financial support.",
            "**Protection and Residence Orders**: If facing domestic violence or dispossession, file an urgent application under Sections 18 & 19 of the Domestic Violence Act (PWDVA 2005).",
            "**Affidavit of Assets and Liabilities**: Prepare complete disclosure of income, assets, and liabilities as mandated by the Supreme Court in *Rajnesh v. Neha (2020)*."
        ]
        limitation_text = "Maintenance claims under Section 144 BNSS are ongoing; prompt filing ensures interim maintenance from the date of application."

    elif is_employment:
        domain = "employment"
        statute_heading = "Industrial Disputes Act 1947 & Payment of Wages / Gratuity Acts"
        next_steps = [
            "**Collate Employment Records**: Gather appointment letter, salary slips, bank statements, appraisal emails, and termination notice.",
            "**Send Formal Legal Notice to Employer**: Demand payment of unpaid wages, severance, and relieving letter within 15 days.",
            "**File Complaint before Labor Commissioner**: Initiate conciliation proceedings before the jurisdictional Labor Officer / Conciliation Officer.",
            "**Gratuity & PF Recovery**: For gratuity withheld after 5 years service, file an application before the Controlling Authority under the Payment of Gratuity Act 1972."
        ]
        limitation_text = "Recovery of unpaid salary or wages under the Payment of Wages Act / Limitation Act is strictly **3 years** from when wages became payable."

    elif is_property:
        domain = "property tenancy"
        statute_heading = "Transfer of Property Act 1882 (Section 106) & State Rent Control"
        next_steps = [
            "**Review the Lease Agreement**: Check the notice period, lock-in clauses, and dispute resolution mechanism.",
            "**Issue 15-Day Notice of Termination**: Under Section 106 of the Transfer of Property Act, terminating a month-to-month tenancy requires 15 days written notice.",
            "**Civil Suit for Ejectment and Mesne Profits**: If the tenant refuses to vacate, file an eviction suit before the competent City Civil Court / Small Causes Court.",
            "**Avoid Self-Help Measures**: Never disconnect water, electricity, or lock premises without court sanction; this violates Section 115 BNS (old 341 IPC wrongful restraint)."
        ]
        limitation_text = "Recovery of arrears of rent is limited to **3 years** under Article 52 of the Limitation Act, 1963."

    else:
        domain = "civil dispute"
        statute_heading = "Code of Civil Procedure (CPC 1908) & Indian Contract Act 1872"
        next_steps = [
            "**Collate Documentary Evidence**: Gather all agreements, invoices, statements of account, and email exchanges.",
            "**Issue Formal Legal Notice**: Provide a clear 15 or 30 day cure period before initiating court litigation.",
            "**Mandatory Pre-Institution Mediation**: If commercial dispute under Commercial Courts Act 2015, mediation under Section 12A is mandatory before filing suit.",
            "**Civil Suit for Recovery**: File a summary suit under Order XXXVII CPC or ordinary money suit before the competent District Court."
        ]
        limitation_text = "Suits for breach of contract or recovery of money must be filed within **3 years** from the date the debt became due (Limitation Act 1963)."

    # Fetch live or curated citation data
    scrape_data = scrape_legal_source(user_text)
    lawyers = find_lawyers(city=meta["detected_city"] or "Delhi", domain_query=domain)
    lawyer_cards = format_lawyer_cards(lawyers)

    response_parts = []
    if is_emergency_criminal:
        response_parts.append("### Emergency Criminal Defense Advisory & Constitutional Protections\n\n")
        response_parts.append(f"Based on your statement in **{city}**, this matter involves serious cognizable offenses under the Bharatiya Nyaya Sanhita 2023 (BNS) and Bharatiya Nagarik Suraksha Sanhita 2023 (BNSS). Here is your statutory framework, critical constitutional protections, immediate surrender/remand protocol, and verified criminal defense counsel.\n")
    else:
        response_parts.append("### Legal Diagnostic & Step-by-Step Action Plan\n\n")
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
