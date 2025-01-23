document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();
    console.log('Popup initialized');
});

function initializeEventListeners() {
    const xssDetectionCard = document.getElementById('xssDetectionCard');
    if (xssDetectionCard) {
        xssDetectionCard.addEventListener('click', () => {
            document.getElementById('xssDetection').classList.remove('hidden');
            console.log('XSS Detection card clicked');
        });
    }

    const analyzeXSSButton = document.getElementById('analyzeXSSButton');
    if (analyzeXSSButton) {
        analyzeXSSButton.addEventListener('click', analyzeXSS);
        console.log('XSS button listener added');
    }
}

async function analyzeXSS() {
    const urlInput = document.getElementById('urlInput');
    const resultsDiv = document.getElementById('results');
    const resultContent = document.getElementById('resultContent');
    const loading = document.getElementById('loading');

    if (!urlInput || !urlInput.value) {
        alert('Please enter a URL');
        return;
    }

    try {
        console.log('Analyzing XSS:', urlInput.value);
        loading.classList.remove('hidden');
        resultsDiv.classList.add('hidden');

        const response = await fetch('http://localhost:5000/api/xss-detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput.value })
        });

        const data = await response.json();
        if (response.ok) {
            const xssResultHtml =
                `<div class="space-y-3">
                    <div class="flex items-center ${data.is_xss ? 'text-red-600' : 'text-green-600'}">
                        <i class="fas ${data.is_xss ? 'fa-exclamation-triangle' : 'fa-check-circle'} text-xl mr-2"></i>
                        <span class="font-semibold text-sm">
                            ${data.is_xss ? 'Potential XSS Attack Detected' : 'No XSS Attack Detected'}
                        </span>
                    </div>
                    <div class="bg-gray-100 p-3 rounded text-sm">
                        <p class="text-gray-700 truncate"><strong>URL:</strong> ${data.url}</p>
                    </div>
                    <p class="text-xs text-gray-600">
                        ${data.is_xss
                            ? 'Warning: This URL contains potential XSS attack patterns.'
                            : 'No known XSS patterns detected in this URL.'}
                    </p>
                </div>`;
            resultContent.innerHTML = xssResultHtml;
            resultsDiv.classList.remove('hidden');
        } else {
            throw new Error(data.error || 'XSS detection failed');
        }
    } catch (error) {
        resultContent.innerHTML =
            `<div class="text-red-600 text-sm">
                <i class="fas fa-exclamation-circle mr-2"></i>
                Error: ${error.message}
            </div>`;
        resultsDiv.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}
