---
name: case-intake-diagnostic
description: Conducts multi-turn legal diagnostic triage for users presenting Indian legal disputes. Inquires what happened, where it happened, dispute stage, and evidence held, then formulates immediate next steps, limitation deadlines, and lawyer referrals. Use when a user asks what to do about a legal issue, received a notice, suffered fraud, or has a dispute.
license: CC-BY-4.0
---

# Case Intake & Diagnostic Triage Skill

Interactively guides individuals and business counsel through Indian legal disputes.

## Diagnostic Flow
When a user presents a legal situation with missing critical parameters, systematically inquire:
1. **Facts & Incident**: What happened? What were the key dates and monetary sums involved?
2. **Jurisdiction & Location**: In which city and state did the agreement or transaction take place?
3. **Current Stage**: Has a formal notice, police complaint (FIR), or court summons already been issued?
4. **Documentary Evidence**: What written agreements, payment receipts, or digital messages exist?

## Output Structure
Once facts are gathered, synthesize:
1. **Statutory Provisions**: BNS 2023, BNSS 2023, BSA 2023, NI Act 138, Consumer Protection Act 2019, or CPC.
2. **Immediate Action Steps ("What to do now")**: Concrete, numbered procedural actions.
3. **Limitation Warning**: Critical deadlines under the Limitation Act 1963 or special acts.
4. **Counsel Referral**: Local verified advocate profiles with chambers contacts.
