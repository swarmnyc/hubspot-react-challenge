/**
 * Color utility functions for manipulating hex colors
 */

/**
 * Creates a lighter shade of a hex color
 * @param hex - Hex color string (e.g., '#2563eb')
 * @param percent - How light to make it (0-100, higher = lighter)
 * @returns RGB color string
 */
export function getLighterShade(hex: string, percent: number = 90): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * (percent / 100)));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * (percent / 100)));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * (percent / 100)));
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Creates a darker shade of a hex color
 * @param hex - Hex color string (e.g., '#2563eb')
 * @param percent - How dark to make it (0-100, higher = darker)
 * @returns RGB color string
 */
export function getDarkerShade(hex: string, percent: number = 15): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - percent / 100)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * (1 - percent / 100)));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - percent / 100)));
  return `rgb(${r}, ${g}, ${b})`;
}
