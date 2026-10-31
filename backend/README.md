# NyAI Hermes Agent Backend

High-performance, sovereign Indian Legal Intelligence Gateway with integrated skills.

## Features
- **OpenAI Compatible Endpoint**: `/v1/chat/completions`
- **Native NyAI API**: `/api/chat`
- **Lawyer Discovery API**: `/api/lawyers?city=Delhi&domain=criminal`
- **Skills Included**:
  - `web_scrape_legal`: Live scraping of Indian statutes and court records using BeautifulSoup.
  - `lawyer_discovery`: City/state-aware advocate directory with verified chamber contacts (Bar Council compliant).
  - `case_intake_diagnostic`: Interactive legal intake (asking what happened, jurisdiction, timeline, and next steps).
  - `bns_ipc_concordance`: Transition mapping between legacy laws (IPC, CrPC, IEA) and 2023 criminal codes.

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Hermes Server
```bash
python3 hermes_server.py
```
Server starts on `http://127.0.0.1:8000`.

### 3. Environment Variables (Optional)
- `PORT`: Custom port (default: `8000`)
- `HOST`: Bind host (default: `0.0.0.0`)
