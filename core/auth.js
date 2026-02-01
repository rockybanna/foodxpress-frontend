// ===============================
// FOODXPRESS — AUTH (READ-ONLY)
// ===============================
// No login, no logout yet

async function verifySession() {
  const { token } = window.AppState.get();
  if (!token) {
    return { valid: false };
  }

  try {
    // backend already supports session validation
    const res = await apiGet("verifySession", { token });
    return res;
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

function requireAuth(expectedRole) {
  const { token, role } = window.AppState.get();

  if (!token) {
    throw new Error("Not authenticated");
  }

  if (expectedRole && role !== expectedRole) {
    throw new Error("Forbidden");
  }
}

window.verifySession = verifySession;
window.requireAuth = requireAuth;
