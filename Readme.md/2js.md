Class-based Design Pattern
class AdvancedCalculator {
    constructor() {
        // State Management
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.memory = 0;
        this.history = [];
        this.isSecondFunction = false;
        
        // Initialization Sequence
        this.initializeElements();
        this.setupEventListeners();
        this.loadFromLocalStorage();
        this.updateDisplay();
    }
}


State Management System
// Kalkulator State
{
    currentOperand: "123",      // Input saat ini
    previousOperand: "456",     // Input sebelumnya
    operation: "add",          // Operasi yang dipilih
    memory: 42,               // Nilai memory
    history: [/* array of calculations */],
    isSecondFunction: false,  // Mode 2nd function
    isRadians: false          // Mode radians/degrees
}


Event Handling Strategy
setupEventListeners() {
    // Delegation Pattern untuk tombol angka
    this.numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-number');
            this.appendNumber(number);
            this.updateDisplay();
        });
    });
    
    // Single Handler untuk semua operasi
    this.operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            this.handleOperation(action);
        });
    });
    
    // Keyboard Support
    document.addEventListener('keydown', (event) => {
        this.handleKeyboardInput(event);
    });
}


Core Calculation Engine
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
    
    // Add to history system
    this.addToHistory(prev, current, this.operation, computation);
    
    // Update state
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    
    // Save to persistent storage
    this.saveToLocalStorage();
}


Scientific Functions dengan Mode Handling
scientificOperation(func) {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    
    let result;
    const angle = this.isRadians ? current : current * (Math.PI / 180);
    
    // Handle Second Function Mode
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
    
    // Log to history
    this.addToHistory(current, null, 
        `${this.isSecondFunction ? 'arc' : ''}${func}`, 
        result
    );
    
    this.currentOperand = result.toString();
}


Memory System Implementation
// Memory Operations
memoryClear() {
    this.memory = 0;
    this.updateMemoryDisplay();
    this.showToast("Memory cleared!", 'success');
}

memoryAdd() {
    const current = parseFloat(this.currentOperand);
    if (!isNaN(current)) {
        this.memory += current;
        this.updateMemoryDisplay();
        this.showToast(`Ditambahkan ke memory: ${current}`, 'info');
    }
}

memoryRecall() {
    this.currentOperand = this.memory.toString();
}

// Memory Display Update
updateMemoryDisplay() {
    this.memoryDisplayElement.textContent = `M: ${this.memory}`;
    this.saveToLocalStorage(); // Auto-save
}


History Management System
addToHistory(a, b, operation, result) {
    const historyItem = {
        id: Date.now(), // Unique timestamp ID
        timestamp: new Date().toLocaleTimeString(),
        equation: this.formatHistoryEquation(a, b, operation),
        result: result,
        fullEquation: b !== null ? 
            `${a} ${this.getOperationSymbol(operation)} ${b} = ${result}` :
            `${operation}(${a}) = ${result}`
    };
    
    // FIFO dengan limit 50 items
    this.history.unshift(historyItem);
    if (this.history.length > 50) {
        this.history.pop();
    }
    
    this.updateHistoryDisplay();
    this.saveToLocalStorage();
}

// History Display dengan Event Delegation
updateHistoryDisplay() {
    this.historyListElement.innerHTML = '';
    
    if (this.history.length === 0) {
        // Show empty state
        this.historyListElement.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-clock"></i>
                <p>Riwayat perhitungan akan muncul di sini</p>
            </div>
        `;
    } else {
        // Render each history item
        this.history.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-equation">${item.equation}</div>
                <div class="history-result">= ${item.result}</div>
                <div class="history-time">${item.timestamp}</div>
            `;
            
            // Click to recall result
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


Theme Management System
toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
}

setTheme(theme) {
    // Update HTML attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save preference
    localStorage.setItem('theme', theme);
    
    // Update toggle button UI
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


Keyboard Input Handler
handleKeyboardInput(event) {
    // Prevent default untuk tombol kalkulator
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
            
        // ... other keys
            
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
            
        // Keyboard shortcuts dengan modifier keys
        case 'm':
        case 'M':
            if (event.ctrlKey) {
                event.preventDefault();
                this.memoryAdd();
            }
            break;
    }
    
    this.updateDisplay();
}