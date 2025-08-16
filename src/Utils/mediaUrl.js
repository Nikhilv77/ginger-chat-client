// Accept only absolute http(s) URLs (i.e., Supabase links).
export function isAbsoluteUrl(v = "") {
  return /^https?:\/\//i.test(v);
}

// Returns the image if it's a valid absolute URL, otherwise a placeholder (or empty).
export function safeImageUrl(img, placeholder = "") {
  return isAbsoluteUrl(img) ? img : placeholder;
}
