// Mock API Response Structure Definition
// --------------------------------------
//
// Successful Response:
// {
//   success: true,
//   videoUrlNoWatermark: "https://example.com/mock_video_no_watermark.mp4",
//   videoUrlWithWatermark: "https://example.com/mock_video_with_watermark.mp4",
//   message: "Video processed successfully." // Optional success message
// }
//
// Error Response:
// {
//   success: false,
//   error: "Invalid TikTok URL provided." // Or other error messages
// }
// --------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('tiktokUrl');
    const downloadNoWatermarkButton = document.getElementById('downloadNoWatermark');
    const downloadWithWatermarkButton = document.getElementById('downloadWithWatermark');
    const progressIndicator = document.getElementById('progress-indicator');
    const errorMessageSection = document.getElementById('error-message');
    const resultsSection = document.getElementById('results-section'); // Get the new results section
    const errorMessageText = errorMessageSection ? errorMessageSection.querySelector('p') : null;

    const showProgress = () => {
        if (progressIndicator) progressIndicator.style.display = 'block';
        if (errorMessageSection) errorMessageSection.style.display = 'none';
        if (resultsSection) {
            resultsSection.innerHTML = ''; // Clear previous results
            resultsSection.style.display = 'none'; // Hide results section
        }
    };

    const showError = (message) => {
        if (errorMessageText) errorMessageText.textContent = message;
        if (errorMessageSection) errorMessageSection.style.display = 'block';
        if (progressIndicator) progressIndicator.style.display = 'none';
        if (resultsSection) {
            resultsSection.innerHTML = '';
            resultsSection.style.display = 'none';
        }
    };

    const showResults = (response) => {
        if (!resultsSection) return;

        resultsSection.innerHTML = ''; // Clear previous results
        const title = document.createElement('h2');
        title.textContent = 'Results:';
        resultsSection.appendChild(title);

        if (response.message) {
            const messageP = document.createElement('p');
            messageP.textContent = response.message;
            resultsSection.appendChild(messageP);
        }

        if (response.videoUrlNoWatermark) {
            const link = document.createElement('a');
            link.href = response.videoUrlNoWatermark;
            link.textContent = "Download Video (No Watermark) - Mock Link";
            link.target = "_blank"; // Open in new tab
            resultsSection.appendChild(link);
        }

        if (response.videoUrlWithWatermark) {
            const link = document.createElement('a');
            link.href = response.videoUrlWithWatermark;
            link.textContent = "Download Video (With Watermark) - Mock Link";
            link.target = "_blank";
            resultsSection.appendChild(link);
        }

        resultsSection.style.display = 'block';
        if (progressIndicator) progressIndicator.style.display = 'none';
        if (errorMessageSection) errorMessageSection.style.display = 'none';
    };

    const hideMessagesAndResults = () => {
        if (progressIndicator) progressIndicator.style.display = 'none';
        if (errorMessageSection) errorMessageSection.style.display = 'none';
        if (resultsSection) {
            resultsSection.innerHTML = '';
            resultsSection.style.display = 'none';
        }
    };


    // New function to simulate API call
    const simulateApiCall = (url, downloadType) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!url || !url.includes('tiktok.com')) { // Basic validation
                    resolve({
                        success: false,
                        error: "Invalid TikTok URL. Please provide a valid TikTok video link."
                    });
                    return;
                }

                if (Math.random() < 0.1) { // 10% chance of random API error
                     resolve({
                        success: false,
                        error: "A simulated random API error occurred. Please try again."
                    });
                    return;
                }

                let response = {
                    success: true,
                    message: "Mock video processed. Click links below to 'download'."
                };

                if (downloadType === 'no-watermark') {
                    response.videoUrlNoWatermark = "https://example.com/mock_video_no_watermark.mp4?type=nowatermark&url=" + encodeURIComponent(url);
                    // response.videoUrlWithWatermark = null;
                } else if (downloadType === 'with-watermark') {
                    // response.videoUrlNoWatermark = null;
                    response.videoUrlWithWatermark = "https://example.com/mock_video_with_watermark.mp4?type=watermark&url=" + encodeURIComponent(url);
                }
                resolve(response);
            }, 1500); // Simulate 1.5 seconds delay
        });
    };

    const handleDownloadRequest = (downloadType) => {
        const url = urlInput ? urlInput.value.trim() : '';
        if (!url) {
            showError('Please paste a TikTok video URL first.');
            return;
        }

        showProgress();

        simulateApiCall(url, downloadType)
            .then(response => {
                // hideMessagesAndResults(); // Not needed here as showResults/showError handle it
                if (response.success) {
                    console.log('Mock API Success:', response);
                    showResults(response); // Display results
                } else {
                    showError(response.error || 'An unknown error occurred.');
                }
            })
            .catch(error => {
                // hideMessagesAndResults();
                console.error('Critical simulation error:', error);
                showError('A critical simulation error occurred.');
            });
    };

    if (downloadNoWatermarkButton) {
        downloadNoWatermarkButton.addEventListener('click', () => {
            console.log('Download without watermark clicked.');
            handleDownloadRequest('no-watermark');
        });
    }

    if (downloadWithWatermarkButton) {
        downloadWithWatermarkButton.addEventListener('click', () => {
            console.log('Download with watermark clicked.');
            handleDownloadRequest('with-watermark');
        });
    }
});
