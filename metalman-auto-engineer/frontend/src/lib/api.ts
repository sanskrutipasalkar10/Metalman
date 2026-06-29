/**
 * Central API configuration.
 * In production (Vercel), VITE_API_URL is set to the Render backend URL.
 * In development, it falls back to localhost:8000.
 */
export const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
