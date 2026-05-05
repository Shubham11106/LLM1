from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Groq Client Configuration
def get_client():
    api_key = os.getenv("GROQ_API_KEY")
    return OpenAI(
        api_key=api_key,
        base_url="https://api.groq.com/openai/v1",
    )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])

        if not messages:
            return jsonify({"error": "Invalid messages format"}), 400

        client = get_client()
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
        )

        return jsonify({
            "message": completion.choices[0].message.content,
            "role": "assistant"
        })
    except Exception as e:
        error_msg = str(e)
        print(f"DeepSeek API Error: {error_msg}")
        return jsonify({
            "error": "Failed to fetch response from DeepSeek",
            "details": error_msg 
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
