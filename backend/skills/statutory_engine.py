"""
NyAI Hermes Agent Skill: Statutory Engine & BNS-IPC Concordance Matrix
Provides exact concordance and transitional rules between legacy Indian codes and new 2023 criminal statutes.
"""

from typing import Dict, Optional

CONCORDANCE_MAP = {
    "420": {
        "old_act": "Indian Penal Code (IPC)",
        "old_section": "Section 420",
        "title": "Cheating and dishonestly inducing delivery of property",
        "new_act": "Bharatiya Nyaya Sanhita (BNS 2023)",
        "new_section": "Section 318(4)",
        "punishment": "Imprisonment up to 7 years and fine",
        "key_change": "Re-indexed under Chapter XVII (Offences Against Property). Sub-section (4) specifically retains the classical ingredients of erstwhile Section 420."
    },
    "302": {
        "old_act": "Indian Penal Code (IPC)",
        "old_section": "Section 302",
        "title": "Punishment for Murder",
        "new_act": "Bharatiya Nyaya Sanhita (BNS 2023)",
        "new_section": "Section 103(1)",
        "punishment": "Death or imprisonment for life, and fine",
        "key_change": "Murder re-indexed under Section 103. Section 103(2) introduces a specific offense for mob lynching / murder on grounds of race, caste, or community."
    },
    "376": {
        "old_act": "Indian Penal Code (IPC)",
        "old_section": "Section 376",
        "title": "Punishment for Rape",
        "new_act": "Bharatiya Nyaya Sanhita (BNS 2023)",
        "new_section": "Section 64",
        "punishment": "Rigorous imprisonment not less than 10 years, extending to life, and fine",
        "key_change": "Re-indexed under Chapter V (Offences Against Women and Children). Section 69 additionally criminalizes sexual intercourse by deceitful means/false promise to marry."
    },
    "498a": {
        "old_act": "Indian Penal Code (IPC)",
        "old_section": "Section 498A",
        "title": "Cruelty by husband or relatives of husband",
        "new_act": "Bharatiya Nyaya Sanhita (BNS 2023)",
        "new_section": "Section 85 & 86",
        "punishment": "Imprisonment up to 3 years and fine",
        "key_change": "Separated into substantive definition (Section 86) and penal consequence (Section 85)."
    },
    "482": {
        "old_act": "Code of Criminal Procedure (CrPC 1973)",
        "old_section": "Section 482",
        "title": "Inherent powers of High Court (FIR quashing / stay of proceedings)",
        "new_act": "Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)",
        "new_section": "Section 528",
        "punishment": "Procedural Inherent Jurisdiction",
        "key_change": "Inherent powers of High Courts to prevent abuse of the process of any court preserved word-for-word under Section 528 BNSS."
    },
    "438": {
        "old_act": "Code of Criminal Procedure (CrPC 1973)",
        "old_section": "Section 438",
        "title": "Direction for grant of bail to person apprehending arrest (Anticipatory Bail)",
        "new_act": "Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)",
        "new_section": "Section 482",
        "punishment": "Anticipatory Protection",
        "key_change": "Anticipatory bail re-indexed from CrPC 438 to BNSS 482."
    },
    "154": {
        "old_act": "Code of Criminal Procedure (CrPC 1973)",
        "old_section": "Section 154",
        "title": "Information in cognizable cases (First Information Report / FIR)",
        "new_act": "Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)",
        "new_section": "Section 173",
        "punishment": "Registration of FIR",
        "key_change": "Section 173 BNSS explicitly recognizes Zero FIR (registerable at any police station regardless of jurisdiction) and electronic FIR (e-FIR) to be signed within 3 days."
    },
    "65b": {
        "old_act": "Indian Evidence Act (IEA 1872)",
        "old_section": "Section 65B",
        "title": "Admissibility of electronic records and certificate requirement",
        "new_act": "Bharatiya Sakshya Adhiniyam (BSA 2023)",
        "new_section": "Section 63",
        "punishment": "Evidentiary Admissibility",
        "key_change": "Electronic records recognized as primary evidence. Certificate format standardized under Schedule to BSA 2023."
    }
}

def lookup_section(sec_str: str) -> Optional[Dict]:
    """
    Looks up section concordance for any IPC or CrPC section.
    """
    clean = re.sub(r'[^a-zA-Z0-9]', '', sec_str.lower())
    return CONCORDANCE_MAP.get(clean)
