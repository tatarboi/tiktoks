document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('tiktokUrl');
    const downloadNoWatermarkButton = document.getElementById('downloadNoWatermark');
    const downloadWithWatermarkButton = document.getElementById('downloadWithWatermark');
    const progressIndicator = document.getElementById('progress-indicator');
    const errorMessageSection = document.getElementById('error-message');
    const errorMessageText = errorMessageSection ? errorMessageSection.querySelector('p') : null;

    const showProgress = () => {
        if (progressIndicator) progressIndicator.style.display = 'block';
        if (errorMessageSection) errorMessageSection.style.display = 'none';
    };

    const showError = (message) => {
        if (errorMessageText) errorMessageText.textContent = message;
        if (errorMessageSection) errorMessageSection.style.display = 'block';
        if (progressIndicator) progressIndicator.style.display = 'none';
    };

    const hideMessages = () => {
        if (progressIndicator) progressIndicator.style.display = 'none';
        if (errorMessageSection) errorMessageSection.style.display = 'none';
    };

    if (downloadNoWatermarkButton) {
        downloadNoWatermarkButton.addEventListener('click', () => {
            const url = urlInput ? urlInput.value.trim() : '';
            if (!url) {
                showError('Please paste a TikTok video URL first.');
                return;
            }
            hideMessages();
            console.log('Download without watermark clicked. URL:', url);
            // Placeholder for actual download logic
            showProgress();
            // Simulate API call
            setTimeout(() => {
                // On success (mock):
                // hideMessages();
                // alert('Simulated download without watermark for: ' + url);
                // On error (mock):
                showError('Simulated error: Could not download video without watermark.');
            }, 2000);
        });
    }

    if (downloadWithWatermarkButton) {
        downloadWithWatermarkButton.addEventListener('click', () => {
            const url = urlInput ? urlInput.value.trim() : '';
            if (!url) {
                showError('Please paste a TikTok video URL first.');
                return;
            }
            hideMessages();
            console.log('Download with watermark clicked. URL:', url);
            // Placeholder for actual download logic
            showProgress();
            // Simulate API call
            setTimeout(() => {
                // On success (mock):
                // hideMessages();
                // alert('Simulated download with watermark for: ' + url);
                // On error (mock):
                showError('Simulated error: Could not download video with watermark.');
            }, 2000);
        });
    }
});
