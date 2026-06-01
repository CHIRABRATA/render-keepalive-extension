# Render Keep Alive - Chrome Extension

A Chrome extension that periodically pings your Render backend URL to prevent cold starts.

## Features

✨ **Key Features:**
- 🌐 Save and manage Render backend URLs
- ⏱️ Custom ping intervals (1-1440 minutes)
- 🔄 Automatic background pinging via Service Worker
- 📊 Last ping status display with timestamps
- ✅ Manifest V3 compliant
- 🛡️ URL validation
- ⏰ Fetch timeout protection (10 seconds)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/CHIRABRATA/render-keepalive-extension.git
   cd render-keepalive-extension
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked** and select the extension folder

## Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Enter your Render URL** (e.g., `https://your-app.onrender.com/health`)
3. **Set ping interval** (default: 5 minutes)
4. **Click "Save Settings"**
5. The extension will start pinging automatically

## How It Works

- **Background Service Worker** listens for alarms and triggers pings
- **Automatic pinging** runs in the background without user interaction
- **Storage** saves your URL and interval settings
- **Status tracking** records the last ping result and timestamp

## Configuration

| Setting | Default | Range |
|---------|---------|-------|
| Ping Interval | 5 minutes | 1-1440 minutes |
| Fetch Timeout | 10 seconds | Fixed |
| Health Check URL | - | Any valid HTTPS/HTTP URL |

## Permissions

- `storage` - Saves user settings and ping status
- `alarms` - Schedules periodic ping tasks
- `<all_urls>` - Allows pinging any URL

## Manifest V3 Compliance

✅ Uses Service Worker instead of background scripts
✅ Proper permission declarations
✅ Message-based communication for updates
✅ Async/await for fetch operations

## Troubleshooting

**Extension not pinging?**
- Check if URL is valid and accessible
- Verify the ping interval is set
- Check Chrome DevTools → Service Workers for errors

**Want to see detailed logs?**
- Go to `chrome://extensions`
- Click "Service Worker" under the extension
- Check the console output

## License

MIT License - See LICENSE file for details
