const saveBtn = document.getElementById("saveBtn");
const urlInput = document.getElementById("url");
const intervalInput = document.getElementById("interval");
const statusDiv = document.getElementById("status");
const lastPingDiv = document.getElementById("lastPingInfo");

// Load saved values on popup open
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["renderUrl", "pingInterval", "lastPing"], (data) => {
    if (data.renderUrl) {
      urlInput.value = data.renderUrl;
    }
    if (data.pingInterval) {
      intervalInput.value = data.pingInterval;
    }
    if (data.lastPing) {
      displayLastPing(data.lastPing);
    }
  });
});

// URL validation
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// Display last ping info
function displayLastPing(lastPing) {
  if (!lastPing) return;
  
  const date = new Date(lastPing.timestamp);
  const timeStr = date.toLocaleTimeString();
  const dateStr = date.toLocaleDateString();
  
  let statusText = lastPing.status;
  let statusClass = 'error';
  
  if (lastPing.status === 'success') {
    statusClass = 'success';
    statusText = `Success (${lastPing.statusCode || '200'})`;
  } else if (lastPing.status === 'failed') {
    statusClass = 'error';
    statusText = `Failed (${lastPing.statusCode || 'Unknown'})`;
  } else if (lastPing.status === 'error') {
    statusClass = 'error';
    statusText = `Error (${lastPing.error || 'Unknown'})`;
  }
  
  lastPingDiv.className = "show";
  lastPingDiv.innerHTML = `
    <div class="ping-status">
      <div class="status-indicator ${statusClass}"></div>
      <span class="ping-label">Last Ping:</span>
      <span class="ping-status-text">${statusText}</span>
    </div>
    <div class="ping-time">📅 ${dateStr} • 🕐 ${timeStr}</div>
  `;
}

// Save settings
saveBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  const interval = parseInt(intervalInput.value) || 5;

  // Validate URL
  if (!url) {
    showStatus("❌ Please enter a URL", "error");
    return;
  }

  if (!isValidUrl(url)) {
    showStatus("❌ Invalid URL format", "error");
    return;
  }

  if (interval < 1 || interval > 1440) {
    showStatus("❌ Interval must be between 1 and 1440 minutes", "error");
    return;
  }

  // Save to storage
  chrome.storage.local.set({
    renderUrl: url,
    pingInterval: interval
  });

  // Update alarm in background worker
  chrome.runtime.sendMessage(
    {
      action: "updateInterval",
      interval: interval
    },
    (response) => {
      if (response && response.success) {
        showStatus(
          `✅ Settings saved! Pinging every ${interval} minute(s)`,
          "success"
        );
      }
    }
  );
});

// Show status message
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = type;
  setTimeout(() => {
    statusDiv.className = "";
  }, 4000);
}