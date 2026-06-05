# Render Keep Alive Chrome Extension

## Overview

Render Keep Alive is a lightweight and efficient Chrome extension designed to prevent your Render.com backend services from going idle. By sending periodic "keep-alive" pings to your specified Render service URL, this extension ensures that your applications remain responsive and readily available without cold starts.

## Features

- **Automatic Periodic Pings:** Configures an alarm to automatically send HTTP GET requests to your Render backend at a customizable interval.
- **Configurable URL & Interval:** Easily set the URL of your Render service and the ping interval (in minutes) directly from the extension's popup.
- **Status Monitoring:** View the status of the last ping attempt, including the timestamp, status (success, failed, or error), and HTTP status code or error message.
- **Background Operation:** Once configured, the extension runs silently in the background, ensuring your service stays awake even when the popup is closed.
- **Error Handling:** Robust error handling for network issues and timeouts during pings.
- **URL Validation:** Basic validation for the entered URL to ensure correct format.

## Why Use This Extension?

Render.com is a fantastic platform for deploying web services, but free-tier services often go idle after a period of inactivity to conserve resources. While this is great for cost-efficiency, it can lead to frustrating "cold starts" where users experience a delay when accessing your application for the first time after a period of idleness.

This extension provides a simple, set-and-forget solution to mitigate cold starts by continuously keeping your Render backend active.

## Installation

1.  **Download the Extension:**
    *   Clone this repository: `git clone https://github.com/yourusername/render-keepalive-extension.git` (Replace `yourusername` with the actual GitHub username/organization if this is hosted).
    *   Or download the ZIP file and extract it.

2.  **Open Chrome Extensions Page:**
    *   Open your Chrome browser.
    *   Type `chrome://extensions` in the address bar and press Enter.

3.  **Enable Developer Mode:**
    *   Toggle on the "Developer mode" switch in the top right corner.

4.  **Load Unpacked Extension:**
    *   Click on the "Load unpacked" button that appears.
    *   Navigate to the directory where you cloned/extracted the extension (e.g., `render-keepalive-extension`) and select that folder.

5.  **Pin the Extension (Optional but Recommended):**
    *   Click on the puzzle piece icon (Extensions icon) in your Chrome toolbar.
    *   Find "Render Keep Alive" and click the pin icon next to it to make it visible in your toolbar.

## Usage

1.  **Click the Extension Icon:** Click on the "Render Keep Alive" icon in your Chrome toolbar to open the popup.

2.  **Enter Render URL:** In the "🌐 Render URL" field, enter the full URL of your Render backend service that you want to keep alive.
    *   **Important:** Ensure the URL starts with `http://` or `https://` (e.g., `https://my-awesome-app.onrender.com/health`). It's recommended to use a health check endpoint if your service provides one.

3.  **Set Ping Interval:** In the "⏱️ Ping Interval (minutes)" field, enter the desired interval (in minutes) for the pings.
    *   The default is 5 minutes.
    *   The interval must be between 1 and 1440 minutes (24 hours).

4.  **Save Settings:** Click the "💾 Save Settings" button.

5.  **Monitor Status:** The "Last Ping" section will update with information about the most recent ping attempt.

That's it! The extension will now automatically ping your Render service in the background at your specified interval.

## Development

### Technologies Used

-   **HTML:** For the popup user interface.
-   **CSS:** For styling the popup.
-   **JavaScript:** For background logic, popup functionality, and Chrome API interactions.

### Project Structure

-   `manifest.json`: Defines the extension's properties, permissions, and background scripts.
-   `background.js`: The service worker script that handles alarms, periodic pings, and communication with the popup.
-   `popup.html`: The HTML structure for the extension's popup interface.
-   `popup.js`: The JavaScript logic for the popup, including saving settings, URL validation, and displaying ping status.
-   `icon.svg`: The icon for the extension.
-   `icons/`: Directory for various sized icons (e.g., `Gemini_Generated_Image_7ocj0s7ocj0s7ocj.png`).
-   `LICENSE`: The license file for the project.

## Contributing

(If this were an open-source project, instructions on how to contribute would go here, e.g., fork the repo, create a branch, submit a PR.)

## License

This project is licensed under the [LICENSE Name, e.g., MIT License]. See the `LICENSE` file for details.

## Acknowledgements

-   Inspired by the need to keep Render.com services alive.

---
**Note:** This extension is designed for personal use and to mitigate cold starts on free-tier services. Ensure you comply with Render.com's terms of service.
