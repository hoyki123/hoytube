export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

/**
 * Runs before first paint so a saved dark theme doesn't flash light.
 * Light is the default when nothing is saved.
 */
export const themeInitScript = `try{if(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;
