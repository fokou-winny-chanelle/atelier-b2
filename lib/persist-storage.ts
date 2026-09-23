import { createJSONStorage, type StateStorage } from "zustand/middleware";

function debouncedLocalStorage(delay = 250): StateStorage {
  let timer = 0;
  let pending: { name: string; value: string } | null = null;
  const flush = () => {
    if (!pending || typeof localStorage === "undefined") return;
    localStorage.setItem(pending.name, pending.value);
    pending = null;
  };
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
  }
  return {
    getItem: (name) => localStorage.getItem(name),
    setItem: (name, value) => {
      pending = { name, value };
      window.clearTimeout(timer);
      timer = window.setTimeout(flush, delay);
    },
    removeItem: (name) => {
      if (pending?.name === name) pending = null;
      localStorage.removeItem(name);
    },
  };
}

export function browserStorage() {
  return createJSONStorage(() => debouncedLocalStorage());
}
