export const loadFromStorage = <T>(key: string, fallback: T): T => {
  if (import.meta.server) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const saveToStorage = (key: string, value: unknown) =>{
    if(import.meta.server) return 
    localStorage.setItem(key, JSON.stringify(value))
}
