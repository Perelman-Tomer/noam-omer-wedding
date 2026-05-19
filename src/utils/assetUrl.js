/** Public asset path with Vite base (e.g. GitHub Pages subpath). */
export function assetUrl(path) {
  const normalized = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
