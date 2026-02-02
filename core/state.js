/**
 * ===============================
 * FOODXPRESS — APP STATE
 * ===============================
 * Single source of truth for session
 */

const STORAGE_KEY = "FOODXPRESS_STATE";

const AppState = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        token: null,
        role: null,
        userId: null
      };
    } catch (e) {
      return {
        token: null,
        role: null,
        userId: null
      };
    }
  },

  set(state) {
    const safeState = {
      token: state.token || null,
      role: state.role || null,
      userId: state.userId || null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeState));
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
