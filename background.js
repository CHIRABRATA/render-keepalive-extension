// Default interval: 5 minutes
const DEFAULT_INTERVAL = 5;
const FETCH_TIMEOUT = 10000; // 10 seconds

// Initialize alarm on install
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get("pingInterval");
  const interval = data.pingInterval || DEFAULT_INTERVAL;
  
  chrome.alarms.create("keepAlive", {
    periodInMinutes: interval
  });
});

// Recreate alarm on browser startup
chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.local.get("pingInterval");
  const interval = data.pingInterval || DEFAULT_INTERVAL;

  chrome.alarms.create("keepAlive", {
    periodInMinutes: interval
  });
});

// Listen for alarm triggers
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== "keepAlive") return;
  await pingRender();
});

// Main ping function
async function pingRender() {
  const data = await chrome.storage.local.get(["renderUrl", "lastPing"]);

  // Validate URL to prevent fetch errors if the user forgot http:// or https://
  if (!data.renderUrl || !data.renderUrl.startsWith('http')) {
    console.log("No valid Render URL configured");
    return;
  }

  try {
    // Fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    // Standard GET request (fixes the 405 error) with cache: "no-store" to guarantee a real network ping
    const response = await fetch(data.renderUrl, {
      cache: "no-store",
      signal: controller.signal
    });

    clearTimeout(timeout);

    const timestamp = new Date().toISOString();
    const status = response.ok ? "success" : "failed";

    // Store ping status
    await chrome.storage.local.set({
      lastPing: {
        timestamp: timestamp,
        status: status,
        statusCode: response.status
      }
    });

    console.log(
      `Ping ${status} at ${timestamp} - Status: ${response.status}`
    );
  } catch (err) {
    const timestamp = new Date().toISOString();
    
    // Store error status
    await chrome.storage.local.set({
      lastPing: {
        timestamp: timestamp,
        status: "error",
        error: err.name === "AbortError" ? "Timeout" : err.message
      }
    });

    console.error(`Ping failed at ${timestamp}:`, err.message);
  }
}

// Listen for interval changes from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateInterval") {
    chrome.alarms.clear("keepAlive", () => {
      chrome.alarms.create("keepAlive", {
        periodInMinutes: request.interval
      });
      // Send response after the alarm is successfully recreated
      sendResponse({ success: true });
    });
    
    // Explicitly return true to keep the message channel open for the async callback
    return true;
  }
});