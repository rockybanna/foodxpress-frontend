// ===============================
// FOODXPRESS — GLOBAL STATE
// ===============================
// In-memory + persisted auth state (read-only)

(function () {
  const STORAGE_KEY = "foodxpress_auth";

  const state = {
    token: null,
    role: null,
    userId: null
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state.token = saved.token || null;
      state.role = saved.role || null;
      state.userId = saved.userId || null;
    } catch (e) {
      clear();
    }
  }

  function save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: state.token,
        role: state.role,
        userId: state.userId
      })
    );
  }

  function clear() {
    state.token = null;
    state.role = null;
    state.userId = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  function setSession({ token, role, userId }) {
    state.token = token;
    state.role = role;
    state.userId = userId;
    save();
  }

  load();

  window.AppState = {
    get: () => ({ ...state }),
    setSession,
    clear
  };
})();
