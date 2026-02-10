console.log("Popup loaded");

let currentUrl = "";

// Get active tab URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs && tabs.length > 0) {
    currentUrl = (tabs[0].pendingUrl || tabs[0].url || "").toLowerCase();
    document.getElementById("url").innerText = currentUrl;
  } else {
    document.getElementById("url").innerText = "Unable to detect URL";
  }
});

// Check Risk button logic
document.getElementById("check").addEventListener("click", () => {
  const resultBox = document.getElementById("result");
  resultBox.style.display = "block";

  let riskLevel = "Safe";
  resultBox.className = "result safe";

  // High risk patterns
  if (
    currentUrl.includes("bit.ly") ||
    currentUrl.includes("tinyurl") ||
    currentUrl.includes("shorturl") ||
    currentUrl.includes("pay") ||
    currentUrl.includes("fee")
  ) {
    riskLevel = "Highly Risky";
    resultBox.className = "result risky";
  }
  // Caution patterns
  else if (
    currentUrl.includes("drive.google.com/file") ||
    currentUrl.includes("docs.google.com") ||
    currentUrl.includes("dropbox.com") ||
    currentUrl.includes("internship") ||
    currentUrl.includes("offer") ||
    currentUrl.includes("apply")
  ) {
    riskLevel = "Caution";
    resultBox.className = "result caution";
  }

  resultBox.innerText = "Risk Level: " + riskLevel;
});
