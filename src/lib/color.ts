/** `#rgb` or `#rrggbb` (as read from a CSS variable) → `rgba(...)` with the given alpha. */
export function rgba(hex: string, a: number) {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const v = parseInt(h, 16) || 0;
  return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
}
