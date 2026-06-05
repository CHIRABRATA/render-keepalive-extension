# 🚀 Render Keep Alive Chrome Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Version](https://img.shields.io/badge/Version-1.0-blue.svg)](manifest.json)

## ✨ Overview

**Render Keep Alive** is your trusty companion for preventing those annoying "cold starts" on your [Render.com](https://render.com/) backend services. This sleek Chrome extension ensures your applications stay awake and responsive by sending automatic, periodic pings to your specified service URL. Say goodbye to delays and hello to instant access! 👋

## 💡 Features that Shine

-   **⏰ Automatic Periodic Pings:** Set it and forget it! Our extension configures an alarm to gracefully send HTTP GET requests to your Render backend at custom intervals.
-   **⚙️ Configurable URL & Interval:** Easily tailor the experience! Define your Render service URL and the desired ping interval (in minutes) directly from a user-friendly popup.
-   **📊 Status Monitoring:** Keep an eye on things! View the real-time status of your last ping attempt, including the timestamp, status (✅ success, ❌ failed, or ⚠️ error), and the HTTP status code or a descriptive error message.
-   **👻 Background Operation:** Once configured, this extension becomes your silent guardian. It runs discreetly in the background, ensuring your service remains active even when the popup is closed.
-   **🛡️ Robust Error Handling:** We've got you covered! Enjoy solid error handling for network hiccups and timeouts during pings, keeping you informed.
-   **✅ Smart URL Validation:** No more typos! The extension includes basic yet intelligent validation for your entered URL to ensure it's always in the correct format.

## 🤔 Why Choose Render Keep Alive?

Render.com offers a fantastic platform, but free-tier services often enter an idle state after inactivity to conserve resources. While eco-friendly, this results in frustrating **"cold starts"** – where your users face delays when accessing your application for the first time after a nap.

**Render Keep Alive** is your simple, *set-and-forget* solution to conquer cold starts! Keep your Render backend continuously active and deliver a seamless experience to your users.

## 🚀 Quick Installation Guide

Getting started is a breeze! Follow these steps to install the extension:

1.  **📥 Download the Extension:**
    *   **Option A (Git Clone):** Clone this repository:
        ```bash
        git clone https://github.com/yourusername/render-keepalive-extension.git
        ```
        *(Remember to replace `yourusername` with the actual GitHub username/organization if you're hosting this!)*
    *   **Option B (ZIP Download):** Alternatively, [download the ZIP file](https://github.com/yourusername/render-keepalive-extension/archive/main.zip) and extract its contents to a folder on your computer.

2.  **🌐 Open Chrome Extensions Page:**
    *   Launch your Chrome browser.
    *   Type `chrome://extensions` in the address bar and hit `Enter`.

3.  **👩‍💻 Enable Developer Mode:**
    *   Locate the "**Developer mode**" toggle switch in the top right corner of the extensions page.
    *   Click it to turn **ON** developer mode.

4.  **📦 Load Unpacked Extension:**
    *   A new button, "**Load unpacked**," will appear. Click it.
    *   Browse to the directory where you cloned/extracted the `render-keepalive-extension` folder and select it.

5.  **📌 Pin the Extension (Highly Recommended!):**
    *   Click on the **puzzle piece icon** (Extensions icon) in your Chrome toolbar.
    *   Find "**Render Keep Alive**" in the list and click the **pin icon** next to it. This will make the extension icon visible in your toolbar for quick access.

## 🎮 How to Use It

Once installed, using Render Keep Alive is intuitive:

1.  **👆 Click the Extension Icon:** Simply click on the "Render Keep Alive" icon in your Chrome toolbar to bring up the extension popup.

2.  **📝 Enter Your Render URL:** In the "🌐 Render URL" field, paste the *full URL* of your Render backend service that you wish to keep awake.
    *   **⭐ Important Tip:** Always ensure the URL begins with `http://` or `https://` (e.g., `https://my-awesome-app.onrender.com/health`). Using a dedicated health check endpoint from your service is highly recommended for optimal performance.

3.  **⏱️ Set Your Ping Interval:** In the "⏱️ Ping Interval (minutes)" field, enter your preferred interval (in minutes) for the pings.
    *   The default ping interval is **5 minutes**.
    *   The interval must be a value between 1 and 1440 minutes (which is 24 hours).

4.  **💾 Save Your Settings:** Click the prominent "💾 Save Settings" button to apply your configurations.

5.  **👀 Monitor Last Ping Status:** The "Last Ping" section within the popup will dynamically update with information about the most recent ping attempt, giving you immediate feedback.

And that's all there is to it! Your extension is now actively working in the background, consistently pinging your Render service at your chosen interval.

## 👨‍💻 Development Insights

### 🛠️ Technologies Under the Hood

-   **HTML:** Crafts the interactive and stylish user interface for the extension's popup.
-   **CSS:** Styles every visual element, ensuring a clean and modern look and feel.
-   **JavaScript:** Powers all the magic – from background alarms and periodic pings to dynamic popup functionality and seamless Chrome API interactions.

### 📂 Project Architecture

-   `manifest.json`: The core manifest file, defining the extension's identity, required permissions, and crucial background scripts.
-   `background.js`: The brain of the operation! This service worker script meticulously manages alarms, orchestrates periodic pings, and facilitates smooth communication with the popup interface.
-   `popup.html`: The visual blueprint for the extension's popup, presenting all user controls and status displays.
-   `popup.js`: The interactive logic for the popup, handling user inputs, saving settings to Chrome storage, validating URLs, and dynamically displaying the ping status.
-   `icon.svg`: The crisp, scalable vector icon for the extension, ensuring a polished look across all resolutions.
-   `icons/`: A dedicated directory containing various sized icons, including a generated image for potential future use (`Gemini_Generated_Image_7ocj0s7ocj0s7ocj.png`).
-   `LICENSE`: The legal document outlining the licensing terms for this project.

## 🤝 Contributing

(If this were an open-source project, this section would detail how fellow developers could contribute, e.g., forking, creating branches, and submitting pull requests. Your contributions are welcome!)

## 📜 License

This project is proudly licensed under the **[MIT License](LICENSE)**. For comprehensive details, please refer to the `LICENSE` file within this repository.

## 🙏 Acknowledgements

-   Deeply inspired by the ongoing need to keep Render.com services vibrant and responsive.

---

**⚠️ Important Note:** This extension is crafted for personal use and is specifically designed to alleviate cold starts on free-tier services. **Always ensure that your usage aligns with Render.com's official terms of service.**
