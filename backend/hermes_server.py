#!/usr/bin/env python3
"""
NyAI Hermes Agent Unified Backend Server
========================================
Serves the full NyAI web application and provides OpenAI-compatible
`/v1/chat/completions`, native `/api/chat`, `/api/lawyers`, and `/health`.

Bridges to:
  1. Local Nous Hermes Agent Gateway on port 8080 (when available)
  2. Live Web Scraping & Citation Retrieval (BeautifulSoup + requests)
  3. City-aware Verified Lawyer Discovery with Bar Council Credentials
  4. Interactive Case Diagnostic Triage & Statutory Concordance (BNS/BNSS/BSA/CPC)
  5. Static Web Application Delivery on http://localhost:8000 (Zero Mixed Content)
"""

import sys
import os
import json
import time
import uuid
import re
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import urllib.parse
import urllib.request

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from skills.case_intake import generate_interactive_case_response, analyze_user_prompt
from skills.lawyer_discovery import find_lawyers, format_lawyer_cards, LAWYER_DIRECTORY
from skills.web_scrape_skill import scrape_legal_source
from skills.statutory_engine import lookup_section

PORT = int(os.environ.get("PORT", 8000))
HOST = os.environ.get("HOST", "0.0.0.0")
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NOUS_HERMES_URL = os.environ.get("NOUS_HERMES_URL", "http://127.0.0.1:8080/v1/chat/completions")
NOUS_HERMES_KEY = os.environ.get("NOUS_HERMES_KEY", "nyai-hermes-secret-key-2026-auth")

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

def check_nous_hermes_live() -> bool:
    """Verifies whether Nous Hermes Gateway on port 8080 is reachable."""
    try:
        req = urllib.request.Request(
            "http://127.0.0.1:8080/v1/models",
            headers={"Authorization": f"Bearer {NOUS_HERMES_KEY}"}
        )
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.status == 200
    except Exception:
        return False

def query_nous_hermes(messages: list, model: str = "hermes-3-llama-3.1-8b") -> str:
    """Queries local Nous Hermes Agent on port 8080."""
    try:
        payload = json.dumps({
            "model": model,
            "messages": messages,
            "temperature": 0.2
        }).encode("utf-8")
        req = urllib.request.Request(
            NOUS_HERMES_URL,
            data=payload,
            headers={
                "Authorization": f"Bearer {NOUS_HERMES_KEY}",
                "Content-Type": "application/json"
            }
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode("utf-8"))
                return data["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"[Hermes Gateway Bridge] Port 8080 error: {e}")
    return None

class HermesRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.send_header("Access-Control-Max-Age", "86400")

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query_params = urllib.parse.parse_qs(parsed.query)

        # 1. API: Health Check
        if path in ["/health", "/api/health"]:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            hermes_8080_live = check_nous_hermes_live()
            resp = {
                "status": "healthy",
                "service": "NyAI Hermes Agent Unified Gateway",
                "version": "2.5.0",
                "nous_hermes_8080_bridge": "online" if hermes_8080_live else "standby",
                "skills": [
                    "web_scrape_legal",
                    "lawyer_discovery",
                    "case_intake_diagnostic",
                    "bns_ipc_concordance",
                    "static_app_server"
                ],
                "lawyer_directory_count": len(LAWYER_DIRECTORY),
                "timestamp": int(time.time())
            }
            self.wfile.write(json.dumps(resp, indent=2).encode("utf-8"))
            return

        # 2. API: Model List
        if path in ["/v1/models"]:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            resp = {
                "object": "list",
                "data": [
                    {
                        "id": "hermes-3-llama-3.1-8b",
                        "object": "model",
                        "created": 1700000000,
                        "owned_by": "nousresearch"
                    },
                    {
                        "id": "hermes-3-llama-3.1-8b-legal",
                        "object": "model",
                        "created": 1700000000,
                        "owned_by": "nousresearch"
                    },
                    {
                        "id": "nyai-indian-law-v2",
                        "object": "model",
                        "created": 1700000000,
                        "owned_by": "nyai"
                    }
                ]
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        # 3. API: Lawyers Directory
        if path in ["/api/lawyers"]:
            city = query_params.get("city", [None])[0]
            domain = query_params.get("domain", [None])[0]
            lawyers = find_lawyers(city=city, domain_query=domain)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"city": city, "results": lawyers}, indent=2).encode("utf-8"))
            return

        # 4. Static Web Application Server (index.html, DESIGN.md, scripts, etc.)
        rel_path = path.lstrip("/")
        if not rel_path or rel_path in ["index", "index.html"]:
            file_path = os.path.join(REPO_ROOT, "index.html")
        else:
            file_path = os.path.join(REPO_ROOT, rel_path)

        # Normalize and prevent directory traversal
        norm_path = os.path.normpath(file_path)
        if norm_path.startswith(REPO_ROOT) and os.path.isfile(norm_path):
            ctype, _ = mimetypes.guess_type(norm_path)
            if not ctype:
                ctype = "application/octet-stream"
            if ctype.startswith("text/") or ctype in ["application/javascript", "application/json"]:
                ctype += "; charset=utf-8"

            try:
                with open(norm_path, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Length", str(len(content)))
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "text/plain")
                self.end_headers()
                self.wfile.write(f"500 Internal Error: {e}".encode("utf-8"))
                return

        # 404 for unknown endpoints
        self.send_response(404)
        self.send_header("Content-Type", "application/json")
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps({"error": f"Endpoint or file not found: {path}"}).encode("utf-8"))

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        
        try:
            body = json.loads(post_data)
        except Exception:
            body = {}

        if path in ["/v1/chat/completions", "/api/chat", "/webhook/82dfe55e-93cf-4dfe-ae95-54e68dda2153"]:
            # Standardize request format
            messages = body.get("messages", [])
            query = body.get("message") or body.get("query") or ""
            history = body.get("history", [])

            if not query and messages:
                for m in reversed(messages):
                    if m.get("role") == "user":
                        query = m.get("content", "")
                        break

            # 1. First generate specialized case diagnostic & statutory roadmap
            reply_content = generate_interactive_case_response(query, history)

            # 2. Check if this is an open-ended question that could benefit from Nous Hermes 8080
            meta = analyze_user_prompt(query, history)
            if not meta.get("has_specific_domain") and check_nous_hermes_live():
                # Formulate system messages for Hermes
                hermes_msgs = [
                    {
                        "role": "system",
                        "content": "You are NyAI, an authoritative Indian legal intelligence assistant. Cite BNS 2023, BNSS 2023, BSA 2023, and provide clear step-by-step guidance."
                    }
                ]
                if messages:
                    hermes_msgs.extend(messages[-5:])
                else:
                    hermes_msgs.append({"role": "user", "content": query})

                hermes_reply = query_nous_hermes(hermes_msgs)
                if hermes_reply:
                    # If Hermes replied and we have lawyer recommendations, append them
                    if meta.get("is_lawyer_request") or meta.get("detected_city"):
                        lawyers = find_lawyers(city=meta["detected_city"], domain_query=query)
                        if lawyers:
                            hermes_reply += "\n\n" + format_lawyer_cards(lawyers)
                    reply_content = hermes_reply

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()

            if path == "/v1/chat/completions":
                # Standard OpenAI format
                resp = {
                    "id": f"chatcmpl-{uuid.uuid4().hex[:12]}",
                    "object": "chat.completion",
                    "created": int(time.time()),
                    "model": body.get("model", "hermes-3-llama-3.1-8b-legal"),
                    "choices": [
                        {
                            "index": 0,
                            "message": {
                                "role": "assistant",
                                "content": reply_content
                            },
                            "finish_reason": "stop"
                        }
                    ],
                    "usage": {
                        "prompt_tokens": len(query.split()),
                        "completion_tokens": len(reply_content.split()),
                        "total_tokens": len(query.split()) + len(reply_content.split())
                    }
                }
            else:
                # Extended NyAI API format
                lawyers = find_lawyers(city=meta["detected_city"], domain_query=query)
                resp = {
                    "response": reply_content,
                    "reply": reply_content,
                    "text": reply_content,
                    "detected_city": meta["detected_city"],
                    "lawyer_recommendations": lawyers,
                    "status": "success"
                }

            self.wfile.write(json.dumps(resp).encode("utf-8"))

        else:
            self.send_response(404)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

def run():
    server_address = (HOST, PORT)
    httpd = ThreadedHTTPServer(server_address, HermesRequestHandler)
    hermes_live = check_nous_hermes_live()
    print("=" * 66)
    print(f" NyAI Hermes Agent Unified Gateway running at http://{HOST}:{PORT}")
    print(f" - Web Application:  http://localhost:{PORT}/")
    print(f" - Native API:       http://localhost:{PORT}/api/chat")
    print(f" - OpenAI Endpoint:  http://localhost:{PORT}/v1/chat/completions")
    print(f" - Lawyer Directory: http://localhost:{PORT}/api/lawyers")
    print(f" - Health Check:     http://localhost:{PORT}/health")
    print(f" - Nous Hermes 8080: {'CONNECTED (Online)' if hermes_live else 'STANDBY (Start CLI Gateway on 8080)'}")
    print(f" Active Skills:      Web Scraping, Lawyer Discovery, Case Intake")
    print("=" * 66)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Hermes server...")
        httpd.server_close()

if __name__ == "__main__":
    run()
