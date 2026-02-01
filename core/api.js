// ===============================
// Backend API wrapper (READ-ONLY)
// ===============================

async function apiGet(endpoint, params = {}) {
  const baseUrl = window.CONFIG.BACKEND_URL;

  if (!baseUrl || baseUrl.includes("PASTE_APPS_SCRIPT_URL")) {
    throw new Error("Backend URL not configured");
  }

  const url = new URL(baseUrl);
  url.searchParams.set("action", endpoint);

  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.set(key, params[key]);
    }
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Network error: " + res.status);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

// Expose globally
window.apiGet = apiGet;
