// ===============================
// Backend API wrapper (JSONP)
// ===============================

function apiGet(action, params = {}) {
  return new Promise((resolve, reject) => {
    const baseUrl = window.CONFIG.BACKEND_URL;

    if (!baseUrl) {
      reject(new Error("Backend URL not configured"));
      return;
    }

    const callbackName = "jsonp_cb_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

    params.action = action;
    params.callback = callbackName;

    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const script = document.createElement("script");
    script.src = baseUrl + "?" + query;

    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);

      if (data && data.error) {
        reject(new Error(data.error));
      } else {
        resolve(data);
      }
    };

    script.onerror = function () {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);
  });
}

// expose globally
window.apiGet = apiGet;
