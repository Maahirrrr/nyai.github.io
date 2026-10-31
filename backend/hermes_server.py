#!/usr/bin/env python3
"""
NyAI Hermes Agent Backend Server
================================
Provides standard OpenAI-compatible `/v1/chat/completions`, `/api/chat`, and `/api/lawyers`
equipped with specialized skills:
  1. Live Web Scraping & Citation Retrieval (BeautifulSoup + requests)
  2. City-aware Verified Lawyer Discovery with Contact Details
  3. Interactive Case Diagnostic Triage (What happened -> Jurisdiction -> Next Steps)
  4. BNS / BNSS / BSA / IPC Statutory Concordance
"""

import sys
import os
import json
import time
import uuid
import re
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import urllib.parse

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from skills.case_intake import generate_interactive_case_response, analyze_user_prompt
from skills.lawyer_discovery import find_lawyers, format_lawyer_cards, LAWYER_DIRECTORY
from skills.web_scrape_skill import scrape_legal_source
from skills.statutory_engine import lookup_section

PORT = int(os.environ.get("PORT", 8000))
HOST = os.environ.get("HOST", "0.0.0.0")

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class HermesRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.send_header("Access-Control-Max-Age", "86400")

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query_params = urllib.parse.parse_qs(parsed.query)

        if path in ["/", "/health", "/api/health"]:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            resp = {
                "status": "healthy",
                "service": "NyAI Hermes Agent Gateway",
                "version": "2.4.0",
                "skills": [
                    "web_scrape_legal",
                    "lawyer_discovery",
                    "case_intake_diagnostic",
                    "bns_ipc_concordance"
                ],
                "lawyer_directory_count": len(LAWYER_DIRECTORY),
                "timestamp": int(time.time())
            }
            self.wfile.write(json.dumps(resp, indent=2).encode("utf-8"))

        elif path in ["/v1/models"]:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            resp = {
                "object": "list",
                "data": [
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

        elif path in ["/api/lawyers"]:
            city = query_params.get("city", [None])[0]
            domain = query_params.get("domain", [None])[0]
            lawyers = find_lawyers(city=city, domain_query=domain)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"city": city, "results": lawyers}, indent=2).encode("utf-8"))

        else:
            self.send_response(404)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

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
                # Extract last user message
                for m in reversed(messages):
                    if m.get("role") == "user":
                        query = m.get("content", "")
                        break

            # Execute Hermes Agent reasoning loop with skills
            reply_content = generate_interactive_case_response(query, history)

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
                meta = analyze_user_prompt(query, history)
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
    print(f"================================================================")
    print(f" NyAI Hermes Agent Gateway running at http://{HOST}:{PORT}")
    print(f" - OpenAI Endpoint: http://localhost:{PORT}/v1/chat/completions")
    print(f" - Native API:      http://localhost:{PORT}/api/chat")
    print(f" - Lawyer API:      http://localhost:{PORT}/api/lawyers")
    print(f" - Health Check:    http://localhost:{PORT}/health")
    print(f" Active Skills:     Web Scraping, Lawyer Discovery, Case Intake")
    print(f"================================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Hermes server...")
        httpd.server_close()

if __name__ == "__main__":
    run()
