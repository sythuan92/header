document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({ action: "getRecordedRequests" }, (response) => {
      const requestList = document.getElementById("requestList");
      if (response && response.length) {
        logdata = "";
        response.forEach((request) => {
          logdata += `URL: ${request.url} - ` + `Type: ${request.type} - ` + `Auth: ${request.authorization}` + "<br /";
          authdata = `${request.authorization}`;
          console.log(logdata);
        //   const requestItem = document.createElement("div");
        //   requestItem.className = "request";
        //   requestItem.textContent = `URL: ${request.url}, Method: ${request.method}, Authorization: ${request.authorization}`;
        //   requestList.appendChild(requestItem);
        });
        requestList.innerHTML = authdata;
      } else {
        requestList.innerHTML = "No authorization / token headers recorded.";
      }
    });
  });
  