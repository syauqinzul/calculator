1. Minification & Bundling
# Contoh build process
npm run build
# Output: dist/ folder dengan:
# - index.html (minified)
# - style.min.css (compressed)
# - script.min.js (bundled & minified)

2. Service Worker untuk Offline Support
// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(err => console.log('SW registration failed:', err));
}

3. Performance Monitoring
// Track usage metrics
window.addEventListener('load', () => {
    const perfData = performance.timing;
    console.log('Page loaded in:', 
        perfData.loadEventEnd - perfData.navigationStart, 'ms');
});