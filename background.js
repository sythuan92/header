const recordedRequests = [];

// URLs to listen to
const specificUrls = [
  "https://api0.herewallet.app/api/v1/user/hot/claim/status",
  "https://api.yescoin.gold/signIn/list",
  "https://api.hamsterkombat.io/clicker/tap"
];

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authorizationHeader = details.requestHeaders.find(header => header.name.toLowerCase() === 'authorization');
    const tokenHeader = details.requestHeaders.find(header => header.name.toLowerCase() === 'token');
    if (authorizationHeader || tokenHeader) {
      data = {
        url : details.url,
        method : details.method,
        authorization: authorizationHeader ? authorizationHeader.value : tokenHeader.value,
        type : authorizationHeader ? "authorization" : "token"
      }
      recordedRequests.push(data);
      chrome.storage.local.set({ recordedRequests });
      console.log("Recorded Authorization Header: ", data);
    }
  },
  { urls: specificUrls },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getRecordedRequests") {
    chrome.storage.local.get("recordedRequests", (data) => {
      sendResponse(data.recordedRequests);
    });
    return true; // Indicate that the response will be sent asynchronously
  }
});
