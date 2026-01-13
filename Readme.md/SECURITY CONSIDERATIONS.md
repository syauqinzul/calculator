1. Input Sanitization
appendNumber(number) {
    // Hanya izinkan karakter angka dan titik
    if (!/^[0-9.]$/.test(number)) return;
    
    // Validasi titik desimal ganda
    if (number === '.' && this.currentOperand.includes('.')) return;
    
    // ... rest of logic
}

2. Math Operation Safety
divide(a, b) {
    if (b === 0) {
        this.showToast("Division by zero error", 'error');
        return NaN;
    }
    return a / b;
}

sqrt(x) {
    if (x < 0) {
        this.showToast("Cannot sqrt negative number", 'error');
        return NaN;
    }
    return Math.sqrt(x);
}

3. Local Storage Quotas
saveToLocalStorage() {
    try {
        localStorage.setItem('data', JSON.stringify(data));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            // Handle storage full
            this.history = this.history.slice(0, 25); // Keep only 25 items
            this.saveToLocalStorage();
        }
    }
}