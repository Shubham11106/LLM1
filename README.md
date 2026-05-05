# DeepSeek Chatbot Web Application (Flask Version)

A premium, modern chatbot web interface powered by the DeepSeek API.

## Features
- **Modern UI**: Dark-themed glassmorphism design.
- **Markdown Support**: Renders bold text, lists, and links.
- **Syntax Highlighting**: Beautifully formatted code blocks.
- **Responsive**: Works on desktop and mobile.
- **Secure**: Backend implementation to protect your API key.

## Prerequisites
1. **Python**: Install from [python.org](https://www.python.org/).
2. **DeepSeek API Key**: Get it from [platform.deepseek.com](https://platform.deepseek.com/).

## Setup Instructions

1. **Install Dependencies**:
   Open your terminal in this folder and run:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API Key**:
   Open the `.env` file and replace `your_api_key_here` with your actual DeepSeek API key:
   ```env
   DEEPSEEK_API_KEY=sk-xxxx...
   ```

3. **Start the Server**:
   Run the following command:
   ```bash
   python app.py
   ```

4. **Open the App**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app.py`: Flask backend server.
- `templates/`: HTML templates.
- `static/`: CSS and Javascript files.
- `.env`: Secret configuration.
- `requirements.txt`: Python dependencies.
