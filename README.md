# 🚀 Render Keep Alive - Chrome Extension

A powerful Chrome extension that automatically pings your Render backend to prevent cold starts. Keep your deployed applications always responsive!

![Status](https://img.shields.io/badge/status-active-success) ![Version](https://img.shields.io/badge/version-1.0-blue) ![Manifest](https://img.shields.io/badge/manifest-v3-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation Guide](#-installation-guide)
- [How to Use](#-how-to-use)
- [Project Architecture](#-project-architecture)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)

---

## ✨ Features

🌐 **Easy URL Management**
- Save and manage multiple Render backend URLs
- Real-time URL validation
- One-click updates

⏱️ **Customizable Ping Intervals**
- Set ping intervals from 1 to 1440 minutes (24 hours)
- Change intervals anytime without reinstalling
- Instant alarm updates

🔄 **Automatic Background Pinging**
- Runs silently in the background
- Survives browser restarts
- No performance impact

📊 **Real-time Status Monitoring**
- View last ping status with timestamp
- HTTP status code display
- Error tracking and logging
- Visual indicators (success/failed)

✅ **Manifest V3 Compliant**
- Modern Chrome extension standards
- Service Worker architecture
- Enhanced security & privacy

🛡️ **Smart Error Handling**
- 10-second fetch timeout protection
- Graceful error recovery
- Detailed console logging

---

## 🚀 Quick Start

### Option 1: Download as ZIP (Recommended for Beginners)

1. **Download the Extension**
   - Go to: [GitHub Repository](https://github.com/CHIRABRATA/render-keepalive-extension)
   - Click the green **Code** button
   - Select **Download ZIP**
   - Save the file to your computer

2. **Extract the ZIP**
   - Right-click the downloaded `.zip` file
   - Select **Extract All** (Windows) or **Open** (Mac)
   - Remember the folder location

3. **Load into Chrome** (See detailed steps below)

### Option 2: Clone with Git

```bash
git clone https://github.com/CHIRABRATA/render-keepalive-extension.git
cd render-keepalive-extension
```

---

## 📥 Installation Guide

### Step-by-Step Installation

#### **Step 1: Locate the Extension Folder**

After downloading and extracting the ZIP file, you should have a folder containing:
```
render-keepalive-extension/
├── background.js          # Service Worker - handles pinging
├── popup.html             # Popup UI
├── popup.js               # Popup logic
├── icon.svg               # Extension icon
├── manifest.json          # Configuration file
├── README.md              # This file
├── LICENSE                # License info
└── TEST_REPORT.md         # Test documentation
```

#### **Step 2: Open Chrome Extension Manager**

1. Open **Google Chrome**
2. Click the **Menu** button (⋮) in the top-right corner
3. Go to **More Tools** → **Extensions**
   - Or type: `chrome://extensions/` in the address bar

#### **Step 3: Enable Developer Mode**

1. Look for the **Developer mode** toggle in the top-right corner
2. Click it to enable it (toggle should turn blue)

#### **Step 4: Load Unpacked Extension**

1. Click the **Load unpacked** button (appears after enabling Developer mode)
2. Navigate to your `render-keepalive-extension` folder
3. Click **Select Folder** to load the extension

#### **Step 5: Verify Installation**

✅ You should see:
- Extension card on the extensions page
- Cloud icon with heartbeat logo in your toolbar
- Extension title: "Render Keep Alive"

---

## 🎯 How to Use

### First Time Setup

1. **Click the Extension Icon**
   - Look for the cloud icon with heartbeat in your Chrome toolbar
   - Click it to open the popup

2. **Enter Your Render URL**
   - Example: `https://your-app.onrender.com/health`
   - Use a health check endpoint if available
   - Tip: Make sure the URL is publicly accessible

3. **Set Ping Interval** (Optional)
   - Default: 5 minutes
   - Range: 1-1440 minutes
   - Lower values = more frequent pings (uses more data)
   - Higher values = less frequent (may allow more cold starts)

4. **Click "Save Settings"**
   - Green button at the bottom
   - You'll see a confirmation message ✅

5. **Done!**
   - The extension starts pinging automatically
   - Works even when the popup is closed
   - Continues after browser restarts

### Managing Your Settings

**To Update Settings:**
1. Click the extension icon anytime
2. Modify the URL or interval
3. Click "Save Settings"
4. Changes take effect immediately

**To View Last Ping:**
- Open the popup
- Scroll down to see "Last Ping" status
- Shows timestamp and HTTP status code

**To Remove the Extension:**
1. Go to `chrome://extensions/`
2. Click **Remove** on the Render Keep Alive card
3. Confirm removal

---

## 🏗️ Project Architecture

### How It's Built

This extension uses **Manifest V3** - the modern Chrome extension standard.

#### **Three Main Components:**

```
📱 POPUP (User Interface)
   ├── popup.html  → Beautiful UI with gradient design
   ├── popup.js    → Handles user input and validation
   └── Displays status and last ping info

🔧 SERVICE WORKER (Background Process)
   └── background.js → Runs pings automatically
       ├── Listens for alarms
       ├── Fetches your URL
       ├── Stores status in storage
       └── Works even with popup closed

💾 DATA STORAGE
   └── chrome.storage.local
       ├── renderUrl → Your URL
       ├── pingInterval → Interval in minutes
       └── lastPing → Last ping result
```

#### **Data Flow Diagram:**

```
┌─────────────────────────────────────────────────────┐
│                                                       │
│  1. User opens popup                                 │
│  2. Loads saved URL and interval                     │
│  3. User enters URL and interval                     │
│  4. Clicks "Save Settings"                           │
│       ↓                                              │
│  5. Data saved to chrome.storage.local               │
│  6. Message sent to background worker                │
│       ↓                                              │
│  7. Background worker:                               │
│     - Clears old alarm                               │
│     - Creates new alarm with interval                │
│       ↓                                              │
│  8. Alarm triggers every N minutes                   │
│  9. Service Worker fetches the URL                   │
│  10. Status (success/error) stored                   │
│  11. User sees status in popup                       │
│                                                       │
└─────────────────────────────────────────────────────┘
```

#### **File Descriptions:**

| File | Purpose | Details |
|------|---------|---------|
| **manifest.json** | Configuration | Declares permissions, icons, UI, service worker |
| **background.js** | Main Logic | Handles alarms, fetching, error handling, status tracking |
| **popup.html** | User Interface | Beautiful gradient UI with form inputs |
| **popup.js** | UI Logic | Validation, storage, messaging, status display |
| **icon.svg** | Branding | Custom cloud + heartbeat logo (scalable) |

---

## ⚙️ Configuration

### Default Settings

| Setting | Default | Min | Max | Notes |
|---------|---------|-----|-----|-------|
| Ping Interval | 5 min | 1 min | 1440 min | Change anytime |
| Fetch Timeout | 10 sec | - | - | Auto-abort hung requests |
| URL Validation | On | - | - | Prevents invalid URLs |

### Optimization Tips

**For Render's Free Tier:**
- Set interval to 5-10 minutes
- Balances uptime vs data usage
- Prevents cold starts (30 min idle)

**For Paid Tiers:**
- Can use longer intervals (10-20 min)
- Less frequent data usage

**For Staging/Testing:**
- Use shorter intervals (2-3 min)
- Monitor more frequently

---

## 🔍 Troubleshooting

### Problem: Extension doesn't appear in toolbar

**Solution:**
1. Go to `chrome://extensions/`
2. Find "Render Keep Alive"
3. Make sure it's toggled ON
4. Click the pin icon to lock it to toolbar

### Problem: Pinging not working

**Checklist:**
- [ ] URL is correct and publicly accessible
- [ ] Interval is set and saved
- [ ] Service Worker is running (see Step 3)
- [ ] Browser didn't crash

**How to Check Service Worker:**
1. Go to `chrome://extensions/`
2. Find "Render Keep Alive"
3. Click **Service Worker** link
4. Check DevTools console for errors

### Problem: "Invalid URL format" error

**Make sure your URL:**
- Starts with `https://` or `http://`
- Has a valid domain name
- Is publicly accessible (not localhost)
- Is a working endpoint

**Examples of valid URLs:**
```
✅ https://myapp.onrender.com/health
✅ https://myapp.onrender.com/api/ping
✅ https://myapp.onrender.com/
❌ myapp.onrender.com (missing https://)
❌ http://localhost:3000 (not publicly accessible)
```

### Problem: Last Ping shows "Error"

**Possible Causes:**
- URL is down or unreachable
- Server returned error (500, 503, etc.)
- Network timeout (10 seconds exceeded)
- CORS issues (if testing with API)

**To Debug:**
1. Click the Service Worker link
2. Open DevTools Console (F12)
3. Manually test URL in browser
4. Check Render dashboard for errors

---

## 📚 FAQ

**Q: Will this keep my Render app awake forever?**
A: No. It only pings regularly. Render may still idle if traffic is low. This extension helps but doesn't guarantee 100% uptime.

**Q: Does this use a lot of data?**
A: No. Each ping is just a GET request (~1KB). 5-minute interval = ~288 pings/day = ~288KB/day.

**Q: Can I set custom intervals like "every 25 minutes"?**
A: Yes! The interval input accepts any number from 1-1440.

**Q: What if I close the browser?**
A: Pinging stops. But when you reopen Chrome, the extension automatically restarts pinging (thanks to `onStartup` listener).

**Q: Can I ping multiple URLs?**
A: Currently, the extension pings one URL. For multiple apps, install the extension multiple times or use a relay service.

**Q: Will this work offline?**
A: No. Network is required to ping. When offline, the extension will fail gracefully with an error message.

**Q: How do I update to a newer version?**
A: Download the latest zip from GitHub and repeat installation steps (or use git pull if you cloned).

**Q: Is my data safe?**
A: Yes. All data is stored locally on your computer using `chrome.storage.local`. Nothing sent to external servers.

**Q: What permissions does it need?**
A: Only 3 permissions:
- `storage` - Save your settings
- `alarms` - Schedule pings
- `<all_urls>` - Fetch any URL you specify

---

## 🤝 Contributing

Found a bug? Have an idea? 
- Open an issue on GitHub
- Submit a pull request
- Contact the maintainer

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 📞 Support

For issues and support:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Check the [FAQ](#-faq) section
3. Open a GitHub issue
4. Review console logs via Service Worker

---

## 🎓 Learning Resources

### Understanding This Extension

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Chrome Alarms API](https://developer.chrome.com/docs/extensions/reference/alarms/)

### Render Platform

- [Render Documentation](https://render.com/docs)
- [Render Health Check Guide](https://render.com/docs/deploy-web-services)

---

## 🚀 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jun 1, 2026 | Initial release with all features |
| - | - | Manifest V3 compliant |
| - | - | Beautiful UI with custom logo |
| - | - | Status monitoring |
| - | - | Smart error handling |

---

**Made with ❤️ for keeping Render apps alive!**

Questions? Check the troubleshooting section or open an issue on GitHub.
