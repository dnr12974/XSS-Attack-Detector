# 🔐 Security Analysis Tools - Malicious URL Detection for XSS Attack 🚨
Welcome to the Security Analysis Tools project! This project uses a comprehensive XSS detection mechanism to analyze and classify URLs as safe or potentially harmful. This tool helps detect malicious links, especially those attempting **Cross-Site Scripting (XSS) attacks**.

---------------------------

## 🌟 Features
- **XSS Detection:** Scans URLs for potential XSS attack patterns using an enhanced detection function. 🚫
- **Real-Time Analysis:** The tool gives instant feedback on whether a URL is safe or potentially harmful. ⏱️
- **Chrome Extension:** Directly interact with the tool from your browser for fast and easy URL analysis. 🌐
- **API Integration:** The backend Flask API ensures flexible interaction with different interfaces. 🔌
- **User-Friendly Interface:** Built with TailwindCSS for an elegant and responsive user experience. 🖥️
--------------------
## ⚙️ Technology Stack
**1)Backend:**
- **Flask-** Lightweight Python framework to serve the API.
- **TensorFlow-** ML model for enhanced prediction capabilities.
- **Regex-** For pattern matching and XSS detection.
  
**2)Frontend:**
- **HTML/CSS-** For creating a sleek and modern UI.
- **JavaScript-** Interactivity for the Chrome Extension and URL processing.
- **TailwindCSS-** Styling the user interface for a clean, modern look.
- **FontAwesome-** Icons for a polished interface design.

## 🛠 How It Works
**1️⃣ API - XSS URL Detection**
The Flask API detects potential XSS patterns in a given URL. Users send the URL in a POST request, and the API returns whether the URL contains harmful scripts or patterns that could compromise security.

**2️⃣ Chrome Extension - Instant URL Scanning**
The Chrome extension lets users quickly analyze URLs from their browser. When you input a URL, it sends the data to the Flask API and shows the results in real-time:

- **Safe URL:** Green check icon ✅
- **Malicious URL:** Red warning icon ⚠️
  
- **Detection Patterns:**
    - Script tags (<script>)
    - Inline JavaScript (javascript:)
    - Event Handlers (onload=, onclick=, etc.)
    - Iframes and Images with malicious content
    - CSS expressions, SVG events, and more

------------------------

## 🚀 Getting Started
1️⃣ Clone the Repository
Clone this repo to your local machine:
```bash
git clone https://github.com/yourusername/malicious-url-detection.git
```
2️⃣ Install Dependencies
Navigate to the project directory and install the necessary Python packages:
```bash
cd malicious-url-detection
pip install -r requirements.tx
```
3️⃣ Run the Flask API
To start the Flask API, run:
```bash
python app.py
```
The API will be running on http://localhost:5000.

4️⃣ Set Up the Chrome Extension
- Go to chrome://extensions/.
- Enable Developer Mode.
- Click Load unpacked and select the extension/ folder inside the project directory.
- Now, you can analyze URLs directly from the extension!
----------------
# 📦 requirements.txt :
```bash
Flask==2.2.3
Flask-CORS==3.1.1
requests==2.28.2
```
No additional requirements are required for frontend.You just need google chrome browser to load the extension!


-------------------
## 🧑‍💻 Usage
1. XSS Detection via API
You can test the API by sending a POST request to /api/xss-detect with a JSON body:
```bash
{
  "url": "https://example.com"
}
```
Response:
```bash
{
  "url": "https://example.com",
  "is_xss": true
}
```
If is_xss is true, the URL has been flagged as a potential XSS threat. If false, it's safe to use.

------------------------

## 📂 File Structure

```bash
├── app.py                   # Flask backend
├── requirements.txt         # Python dependencies(This is to be added to install the requirements)
├── extensions               # Chrome extension folder
│   ├── popup.html           # Extension UI
│   ├── popup.js             # Extension logic
│   ├── manifest.json        # Extension configuration
│   └── images               # folder with Extension icons
└── README.md                # Documentation
```
-------------------
**Developed by-Dheer N Raijada**
