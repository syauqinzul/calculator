// ==============================================
// NEON CALCULATOR - Kalkulator Modern
// ==============================================

class AdvancedCalculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.memory = 0;
        this.history = [];
        this.isSecondFunction = false;
        this.isRadians = false;
        
        // Initialize DOM elements
        this.initializeElements();
        // Set up event listeners
        this.setupEventListeners();
        // Load saved data
        this.loadFromLocalStorage();
        // Update display
        this.updateDisplay();
        
        console.log('%c🚀 NeonCalc berhasil diinisialisasi!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
        console.log('%cTekan F12 untuk melihat log kalkulator', 'color: #ff6584;');
    }
    
    initializeElements() {
        // Display elements
        this.currentOperationElement = document.getElementById('current-operation');
        this.previousOperationElement = document.getElementById('previous-operation');
        this.resultDisplayElement = document.getElementById('result-display');
        this.memoryDisplayElement = document.getElementById('memory-display');
        
        // History elements
        this.historyListElement = document.getElementById('history-list');
        this.historyCountElement = document.getElementById('history-count');
        
        // Buttons
        this.numberButtons = document.querySelectorAll('.btn.number');
        this.operatorButtons = document.querySelectorAll('.btn.operator, .btn.func, .btn.scientific, .btn.memory');
        this.equalsButton = document.querySelector('.equals');
        this.clearButton = document.querySelector('[data-action="clear"]');
        this.deleteButton = document.querySelector('[data-action="delete"]');
        this.secondButton = document.getElementById('second-btn');
        
        // Theme toggle
        this.themeToggleButton = document.getElementById('theme-toggle');
        this.clearHistoryButton = document.getElementById('clear-history');
        this.exportHistoryButton = document.getElementById('export-history');
        
        // Toast notification
        this.toastElement = document.getElementById('toast');
        
        // Set initial theme
        this.setTheme(localStorage.getItem('theme') || 'light');
    }
    
    setupEventListeners() {
        // Number buttons
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                const number = button.getAttribute('data-number');
                this.appendNumber(number);
                this.updateDisplay();
            });
        });
        
        // Operation buttons
        this.operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                this.handleOperation(action);
            });
        });
        
        // Equals button
        this.equalsButton.addEventListener('click', () => {
            this.compute();
            this.updateDisplay();
        });
        
        // Second function toggle
        this.secondButton.addEventListener('click', () => {
            this.toggleSecondFunction();
        });
        
        // Theme toggle
        this.themeToggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Clear history
        this.clearHistoryButton.addEventListener('click', () => {
            this.clearHistory();
        });
        
        // Export history
        this.exportHistoryButton.addEventListener('click', () => {
            this.exportHistory();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });
    }
    
    // ========== CORE CALCULATOR FUNCTIONS ==========
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }
    
    handleOperation(action) {
        switch (action) {
            // Basic operations
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.chooseOperation(action);
                break;
                
            // Scientific operations
            case 'sin':
            case 'cos':
            case 'tan':
                this.scientificOperation(action);
                break;
                
            case 'sqrt':
                this.squareRoot();
                break;
                
            case 'square':
                this.square();
                break;
                
            case 'power':
                this.power();
                break;
                
            case 'log':
                this.logarithm();
                break;
                
            case 'ln':
                this.naturalLog();
                break;
                
            case 'factorial':
                this.factorial();
                break;
                
            case 'inverse':
                this.inverse();
                break;
                
            case 'percent':
                this.percentage();
                break;
                
            case 'toggle-sign':
                this.toggleSign();
                break;
                
            case 'pi':
                this.appendNumber(Math.PI.toFixed(10));
                break;
                
            case 'e':
                this.appendNumber(Math.E.toFixed(10));
                break;
                
            // Memory operations
            case 'mc':
                this.memoryClear();
                break;
                
            case 'mr':
                this.memoryRecall();
                break;
                
            case 'm-plus':
                this.memoryAdd();
                break;
                
            case 'm-minus':
                this.memorySubtract();
                break;
                
            // Utility operations
            case 'clear':
                this.clear();
                break;
                
            case 'delete':
                this.delete();
                break;
                
            case 'second':
                this.toggleSecondFunction();
                break;
        }
        
        this.updateDisplay();
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.showToast("Tidak bisa membagi dengan nol!", 'error');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Add to history
        this.addToHistory(prev, current, this.operation, computation);
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.resultDisplayElement.textContent = `= ${computation}`;
        
        // Save to localStorage
        this.saveToLocalStorage();
        
        this.showToast("Perhitungan berhasil!", 'success');
    }
    
    // ========== SCIENTIFIC FUNCTIONS ==========
    
    scientificOperation(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        let result;
        const angle = this.isRadians ? current : current * (Math.PI / 180);
        
        if (this.isSecondFunction) {
            switch (func) {
                case 'sin': result = Math.asin(current); break;
                case 'cos': result = Math.acos(current); break;
                case 'tan': result = Math.atan(current); break;
            }
            result = this.isRadians ? result : result * (180 / Math.PI);
        } else {
            switch (func) {
                case 'sin': result = Math.sin(angle); break;
                case 'cos': result = Math.cos(angle); break;
                case 'tan': result = Math.tan(angle); break;
            }
        }
        
        this.addToHistory(current, null, `${this.isSecondFunction ? 'arc' : ''}${func}`, result);
        this.currentOperand = result.toString();
    }
    
    squareRoot() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current < 0) {
            this.showToast("Akar kuadrat hanya untuk bilangan positif!", 'error');
            return;
        }
        
        const result = Math.sqrt(current);
        this.addToHistory(current, null, '√', result);
        this.currentOperand = result.toString();
    }
    
    square() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        const result = current * current;
        this.addToHistory(current, null, 'x²', result);
        this.currentOperand = result.toString();
    }
    
    power() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.previousOperand = this.currentOperand;
        this.operation = 'power';
        this.currentOperand = '';
    }
    
    logarithm() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            this.showToast("Logaritma hanya untuk bilangan positif!", 'error');
            return;
        }
        
        const result = Math.log10(current);
        this.addToHistory(current, null, 'log', result);
        this.currentOperand = result.toString();
    }
    
    naturalLog() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            this.showToast("Logaritma natural hanya untuk bilangan positif!", 'error');
            return;
        }
        
        const result = Math.log(current);
        this.addToHistory(current, null, 'ln', result);
        this.currentOperand = result.toString();
    }
    
    factorial() {
        const current = parseInt(this.currentOperand);
        if (isNaN(current) || current < 0) {
            this.showToast("Faktorial hanya untuk bilangan bulat positif!", 'error');
            return;
        }
        
        if (current > 170) {
            this.showToast("Angka terlalu besar untuk faktorial!", 'warning');
            return;
        }
        
        let result = 1;
        for (let i = 2; i <= current; i++) {
            result *= i;
        }
        
        this.addToHistory(current, null, 'x!', result);
        this.currentOperand = result.toString();
    }
    
    inverse() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current === 0) {
            this.showToast("Tidak bisa mencari invers dari nol!", 'error');
            return;
        }
        
        const result = 1 / current;
        this.addToHistory(current, null, '¹/x', result);
        this.currentOperand = result.toString();
    }
    
    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        const result = current / 100;
        this.addToHistory(current, null, '%', result);
        this.currentOperand = result.toString();
    }
    
    toggleSign() {
        if (this.currentOperand === '0') return;
        
        if (this.currentOperand.startsWith('-')) {
            this.currentOperand = this.currentOperand.slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
    }
    
    // ========== MEMORY FUNCTIONS ==========
    
    memoryClear() {
        this.memory = 0;
        this.updateMemoryDisplay();
        this.showToast("Memory cleared!", 'success');
    }
    
    memoryRecall() {
        this.currentOperand = this.memory.toString();
    }
    
    memoryAdd() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory += current;
            this.updateMemoryDisplay();
            this.showToast(`Ditambahkan ke memory: ${current}`, 'info');
        }
    }
    
    memorySubtract() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory -= current;
            this.updateMemoryDisplay();
            this.showToast(`Dikurangi dari memory: ${current}`, 'info');
        }
    }
    
    updateMemoryDisplay() {
        this.memoryDisplayElement.textContent = `M: ${this.memory}`;
        this.saveToLocalStorage();
    }
    
    // ========== UTILITY FUNCTIONS ==========
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.resultDisplayElement.textContent = '';
    }
    
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }
    
    toggleSecondFunction() {
        this.isSecondFunction = !this.isSecondFunction;
        this.secondButton.classList.toggle('active', this.isSecondFunction);
        
        // Update button labels
        const scientificButtons = document.querySelectorAll('.btn.scientific, .btn.func');
        scientificButtons.forEach(button => {
            const action = button.getAttribute('data-action');
            if (this.secondFunctionMap[action]) {
                button.textContent = this.isSecondFunction ? 
                    this.secondFunctionMap[action] : 
                    button.getAttribute('data-original-text') || button.textContent;
                
                if (!button.hasAttribute('data-original-text')) {
                    button.setAttribute('data-original-text', button.textContent);
                }
            }
        });
        
        this.showToast(
            this.isSecondFunction ? 
            "Mode Second Function diaktifkan" : 
            "Mode Second Function dinonaktifkan",
            'info'
        );
    }
    
    secondFunctionMap = {
        'sin': 'sin⁻¹',
        'cos': 'cos⁻¹',
        'tan': 'tan⁻¹',
        'log': '10ˣ',
        'ln': 'eˣ',
        'sqrt': 'x²',
        'square': '√x'
    };
    
    // ========== HISTORY FUNCTIONS ==========
    
    addToHistory(a, b, operation, result) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            equation: this.formatHistoryEquation(a, b, operation),
            result: result,
            fullEquation: b !== null ? 
                `${a} ${this.getOperationSymbol(operation)} ${b} = ${result}` :
                `${operation}(${a}) = ${result}`
        };
        
        this.history.unshift(historyItem);
        if (this.history.length > 50) {
            this.history.pop();
        }
        
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
    }
    
    formatHistoryEquation(a, b, operation) {
        if (b !== null) {
            return `${a} ${this.getOperationSymbol(operation)} ${b}`;
        } else {
            return `${operation}(${a})`;
        }
    }
    
    updateHistoryDisplay() {
        this.historyListElement.innerHTML = '';
        
        if (this.history.length === 0) {
            this.historyListElement.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-clock"></i>
                    <p>Riwayat perhitungan akan muncul di sini</p>
                </div>
            `;
        } else {
            this.history.forEach(item => {
                const historyElement = document.createElement('div');
                historyElement.className = 'history-item';
                historyElement.innerHTML = `
                    <div class="history-equation">${item.equation}</div>
                    <div class="history-result">= ${item.result}</div>
                    <div class="history-time">${item.timestamp}</div>
                `;
                
                historyElement.addEventListener('click', () => {
                    this.currentOperand = item.result.toString();
                    this.updateDisplay();
                    this.showToast("Hasil dipindahkan ke kalkulator", 'info');
                });
                
                this.historyListElement.appendChild(historyElement);
            });
        }
        
        this.historyCountElement.textContent = `${this.history.length} items`;
    }
    
    clearHistory() {
        if (this.history.length === 0) return;
        
        if (confirm("Apakah Anda yakin ingin menghapus semua riwayat?")) {
            this.history = [];
            this.updateHistoryDisplay();
            localStorage.removeItem('calculatorHistory');
            this.showToast("Riwayat berhasil dihapus!", 'success');
        }
    }
    
    exportHistory() {
        if (this.history.length === 0) {
            this.showToast("Tidak ada riwayat untuk diekspor!", 'warning');
            return;
        }
        
        const historyText = this.history.map(item => 
            `${item.timestamp}: ${item.fullEquation}`
        ).join('\n');
        
        const blob = new Blob([historyText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `neoncalc-history-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast("Riwayat berhasil diekspor!", 'success');
    }
    
    // ========== THEME FUNCTIONS ==========
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = this.themeToggleButton.querySelector('i');
        const text = this.themeToggleButton.querySelector('span');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Mode Terang';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Mode Gelap';
        }
        
        this.showToast(`Mode ${theme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`, 'info');
    }
    
    // ========== DISPLAY FUNCTIONS ==========
    
    updateDisplay() {
        this.currentOperationElement.textContent = this.currentOperand;
        
        if (this.operation != null) {
            this.previousOperationElement.textContent = 
                `${this.previousOperand} ${this.getOperationSymbol(this.operation)}`;
        } else {
            this.previousOperationElement.textContent = this.previousOperand;
        }
    }
    
    getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷',
            'power': '^'
        };
        return symbols[operation] || operation;
    }
    
    // ========== KEYBOARD SUPPORT ==========
    
    handleKeyboardInput(event) {
        // Prevent default behavior for calculator keys
        if (this.isCalculatorKey(event.key)) {
            event.preventDefault();
        }
        
        switch (event.key) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
            case '.':
                this.appendNumber(event.key);
                break;
                
            case '+':
                this.chooseOperation('add');
                break;
                
            case '-':
                this.chooseOperation('subtract');
                break;
                
            case '*':
                this.chooseOperation('multiply');
                break;
                
            case '/':
                this.chooseOperation('divide');
                break;
                
            case '^':
                this.power();
                break;
                
            case '%':
                this.percentage();
                break;
                
            case 'Enter':
            case '=':
                this.compute();
                break;
                
            case 'Escape':
                this.clear();
                break;
                
            case 'Backspace':
                this.delete();
                break;
                
            case 'm':
            case 'M':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.memoryAdd();
                }
                break;
                
            case 'r':
            case 'R':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.memoryRecall();
                }
                break;
        }
        
        this.updateDisplay();
    }
    
    isCalculatorKey(key) {
        const calculatorKeys = [
            '0','1','2','3','4','5','6','7','8','9','.',
            '+','-','*','/','^','%',
            'Enter','=','Escape','Backspace'
        ];
        return calculatorKeys.includes(key);
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    
    showToast(message, type = 'info') {
        const toast = this.toastElement;
        const icon = toast.querySelector('i');
        const messageElement = toast.querySelector('.toast-message');
        
        // Set icon based on type
        switch (type) {
            case 'success':
                icon.className = 'fas fa-check-circle';
                toast.style.borderLeftColor = '#00ff88';
                break;
            case 'error':
                icon.className = 'fas fa-exclamation-circle';
                toast.style.borderLeftColor = '#ff4444';
                break;
            case 'warning':
                icon.className = 'fas fa-exclamation-triangle';
                toast.style.borderLeftColor = '#ffaa00';
                break;
            default:
                icon.className = 'fas fa-info-circle';
                toast.style.borderLeftColor = '#6c63ff';
        }
        
        messageElement.textContent = message;
        toast.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // ========== LOCAL STORAGE ==========
    
    saveToLocalStorage() {
        const data = {
            memory: this.memory,
            history: this.history,
            theme: document.documentElement.getAttribute('data-theme')
        };
        localStorage.setItem('neonCalcData', JSON.stringify(data));
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('neonCalcData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.memory = data.memory || 0;
                this.history = data.history || [];
                this.updateMemoryDisplay();
                this.updateHistoryDisplay();
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }
    
    // ========== DEBUG & LOGGING ==========
    
    logState() {
        console.group('Calculator State');
        console.log('Current:', this.currentOperand);
        console.log('Previous:', this.previousOperand);
        console.log('Operation:', this.operation);
        console.log('Memory:', this.memory);
        console.log('History Items:', this.history.length);
        console.log('Second Function:', this.isSecondFunction);
        console.groupEnd();
    }
}

// ========== INITIALIZE CALCULATOR ==========

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create calculator instance
    window.calculator = new AdvancedCalculator();
    
    // Log welcome message
    console.log(`
    ╔═══════════════════════════════════════════════════╗
    ║            🚀 NEON CALCULATOR v2.0               ║
    ║           Kalkulator Modern untuk Pemula         ║
    ║                                                   ║
    ║  Fitur Utama:                                    ║
    ║  • Operasi dasar & scientific                    ║
    ║  • Sistem memory & riwayat                       ║
    ║  • Mode gelap/terang                             ║
    ║  • Animasi & efek visual modern                  ║
    ║  • Dukungan keyboard lengkap                     ║
    ║                                                   ║
    ║  Gunakan:                                        ║
    ║  • Klik tombol atau gunakan keyboard             ║
    ║  • Ctrl+M untuk menambah memory                  ║
    ║  • Ctrl+R untuk memanggil memory                 ║
    ║  • F12 untuk melihat log ini                     ║
    ╚═══════════════════════════════════════════════════╝
    `);
    
    // Add some sample history for demo
    if (window.calculator.history.length === 0) {
        setTimeout(() => {
            window.calculator.addToHistory(2, 2, 'add', 4);
            window.calculator.addToHistory(10, null, 'square', 100);
            window.calculator.addToHistory(45, null, 'sin', 0.7071);
            window.calculator.showToast("Selamat datang di NeonCalc! 🎉", 'success');
        }, 1000);
    }
});

// ========== EXPORT FOR DEBUGGING ==========
// Make calculator available in console for debugging
window.debugCalculator = () => {
    console.group('🔧 Debug Calculator');
    console.log('Instance:', window.calculator);
    console.log('Theme:', document.documentElement.getAttribute('data-theme'));
    console.log('Local Storage:', localStorage.getItem('neonCalcData'));
    console.groupEnd();
    return window.calculator;
};

// ==============================================   
// END OF FILE
// ==============================================


