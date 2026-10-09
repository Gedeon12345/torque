const BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:4000/api").replace(/\/$/, "");
const TOKEN_KEY = "torque:token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Erreur réseau/API normalisée : .message (lisible) et .details (issues de validation, le cas échéant). */
export class ApiRequestError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Appelle l'API Torque. `query` est un objet de paramètres (les valeurs vides/undefined sont omises).
 * Renvoie directement `data` (le contenu utile), ou lève ApiRequestError.
 */
export async function apiFetch(path, { method = "GET", body, query, signal } = {}) {
  const url = new URL(BASE_URL + path);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  }

  const token = getToken();
  let response;
  try {
    response = await fetch(url, {
      method,
      signal,
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiRequestError("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }

  // 204 No Content (ex. suppression) : rien à lire.
  if (response.status === 204) return null;

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiRequestError(payload?.error?.message ?? "Une erreur est survenue", {
      status: response.status,
      details: payload?.error?.details,
    });
  }

  return payload.data;
}

export const api = {
  get: (path, query, signal) => apiFetch(path, { query, signal }),
  post: (path, body) => apiFetch(path, { method: "POST", body }),
  patch: (path, body) => apiFetch(path, { method: "PATCH", body }),
  delete: (path) => apiFetch(path, { method: "DELETE" }),
};

/** Les routes de liste renvoient { data, meta } ; apiFetch aplatit data+meta, sauf pour les tableaux. */
export async function apiList(path, query, signal) {
  const url = new URL(BASE_URL + path);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  }
  const token = getToken();
  let response;
  try {
    response = await fetch(url, { signal, headers: { ...(token && { Authorization: `Bearer ${token}` }) } });
  } catch {
    throw new ApiRequestError("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiRequestError(payload?.error?.message ?? "Une erreur est survenue", {
      status: response.status,
      details: payload?.error?.details,
    });
  }
  return { items: payload.data, meta: payload.meta };
}
