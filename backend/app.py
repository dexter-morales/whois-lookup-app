from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import fetch_whois_data
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
WHOIS_API_KEY = os.getenv("WHOIS_API_KEY")

@app.route('/api/whois', methods=['POST'])
def whois_lookup():
    data = request.json
    domain = data.get('domain')
    info_type = data.get('type')  # 'domain' or 'contact'

    if not domain or not info_type:
        return jsonify({'error': 'Missing domain or type'}), 400

    try:
        result = fetch_whois_data(domain, info_type, WHOIS_API_KEY)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
