"""Temporarily serve one verified build bundle on the deployment host loopback."""
import argparse
import hashlib
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import time

parser = argparse.ArgumentParser()
parser.add_argument('bundle', type=Path)
args = parser.parse_args()
payload = args.bundle.read_bytes()
digest = hashlib.sha256(payload).hexdigest()

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != '/' + digest + '.tar.gz':
            self.send_error(404)
            return
        self.send_response(200)
        self.send_header('Content-Type', 'application/gzip')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *args):
        pass

server = HTTPServer(('127.0.0.1', 18765), Handler)
server.timeout = 1
print('Build source ready on loopback, SHA256 ' + digest, flush=True)
deadline = time.monotonic() + 1200
try:
    while time.monotonic() < deadline:
        server.handle_request()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
