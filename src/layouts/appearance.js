
function updateTheme(isDark) {
  globalThis.document.documentElement.classList.toggle('dark', isDark)
}

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
updateTheme(isDark)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => updateTheme(e.matches))
