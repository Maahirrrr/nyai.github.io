---
name: web-scrape-legal
description: Scrapes and queries open Indian legal resources, statutes, court judgment summaries, and Bar Council registries. Use when real-time statutory verification, cause list tracking, or legal web citations are needed.
license: CC-BY-4.0
---

# Legal Web Scraping Skill

Leverages BeautifulSoup and requests to query open legal search indexes (Indian Kanoon, India Code, e-Courts).

## Methods
- `scrape_legal_source(query: str, max_results: int = 3)`: Extracts live citations, section numbers, and case law snippets.
- Fallback to curated, authoritative BNS / BNSS / BSA / NI Act concordance when offline or network sandboxed.
