// ===============================
// FOODXPRESS — JSONP API WRAPPER
// ===============================

function apiGet(action, params = {}) {
  return new Promise((resolve, reject) => {
    const baseUrl = window.CONFIG && window.CONFIG.BACKEND_URL;
    if (!baseUrl) {
      reject(new Error("Backend URL not configured"));
      return;
    }

    const callbackName =
      "fx_cb_" + Date.now() + "_" + Math.floor(Math.random() * 10000);

    params.action = action;
    params.callback = callbackName;

    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const script = document.createElement("script");
    script.src = baseUrl + "?" + query;
    script.async = true;

    window[callbackName] = function (data) {
      delete window[callbackName];
      script.remove();

      if (data && data.error) {
        reject(new Error(data.error));
      } else {
        resolve(data);
      }
    };

    script.onerror = function () {
      delete window[callbackName];
      script.remove();
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);
  });
}

window.apiGet = apiGet;
