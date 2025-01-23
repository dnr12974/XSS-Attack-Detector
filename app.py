from flask import Flask, request, jsonify
from urllib.parse import urlparse
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# Enhanced XSS detection function
def detect_xss(url):
    """
    Detect potential XSS patterns in a given URL. The function uses a broader
    and more comprehensive set of patterns to identify malicious content.
    """
    xss_patterns = [
        r'<script.*?>.*?</script>',                  # Basic script tags
        r'javascript:',                              # Inline JavaScript
        r'on\w+=',                                   # JavaScript event handlers
        r'alert\(',                                  # Alert function
        r'document\.cookie',                         # Accessing cookies
        r'window\.location',                         # Redirects
        r'<iframe.*?>.*?</iframe>',                 # Malicious iframe
        r'<img.*?src=.*?>',                          # Images with embedded code
        r'vbscript:',                                # VBScript-based attacks
        r'<svg.*?on\w+=.*?>',                        # SVG elements with event handlers
        r'<a.*?href=["\']javascript:.*?>',           # Anchor tags with JavaScript
        r'<!--.*?-->',                               # HTML comments hiding malicious code
        r'<.*?style=.*?expression\(.*?\)>',          # CSS expressions
        r'eval\(.*?\)',                              # Eval function
        r'<input.*?on\w+=.*?>',                      # Input elements with event handlers
        r'<div.*?on\w+=.*?>',                        # Div elements with event handlers
        r'&#[xX]?[0-9a-fA-F]+;',                    # Encoded characters for obfuscation
        r'%[0-9a-fA-F]{2}',                         # URL-encoded payloads
        # XSS attacks in HTML5 <audio> or <video> tags
        r'<audio.*?src=["\']?javascript:.*?>',        
        r'<video.*?src=["\']?javascript:.*?>',        
    
    

    ]

    # Check for patterns in the provided URL
    for pattern in xss_patterns:
        if re.search(pattern, url, re.IGNORECASE):
            return True

    return False

@app.route('/api/xss-detect', methods=['POST'])
def xss_detect():
    """
    API endpoint for detecting potential XSS attacks in URLs.
    Accepts JSON input with the URL to analyze.
    """
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    # Check for XSS patterns in the URL
    is_xss = detect_xss(url)

    return jsonify({
        'url': url,
        'is_xss': is_xss
    })

if __name__ == '__main__':
    app.run(debug=True)
