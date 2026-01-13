// ==============================================
// KALKULATOR SEDERHANA - JavaScript untuk Pemula
// ==============================================

// 1. VARIABEL DAN SELEKTOR DOM
// -----------------------------
// Mendapatkan elemen-elemen HTML yang akan di manipulasi
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('.btn.number');
const operationButtons = document.querySelectorAll('.btn.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const percentageButton = document.querySelector('[data-action="percentage"]');

// Variabel untuk menyimpan data kalkulator
let previousOperand = '';
let currentOperand = '0';
let operation = undefined;

// 2. FUNGSI UNTUK MEMPERBARUI TAMPILAN
// -------------------------------------
function updateDisplay() {
    // Menampilkan operasi sebelumnya (jika ada)
    if (operation != null) {
        previousOperandElement.innerText = `${previousOperand} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandElement.innerText = '';
    }
    
    // Menampilkan operasi saat ini
    currentOperandElement.innerText = currentOperand;
}

// 3. FUNGSI UNTUK MENAMBAH ANGKA
// -------------------------------
function appendNumber(number) {
    // Jika angka adalah titik desimal dan sudah ada titik, maka tidak dilakukan apa-apa
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Jika angka saat ini adalah '0', ganti dengan angka baru
    // Jika bukan '0', tambahkan angka baru di belakang
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
}

// 4. FUNGSI UNTUK MEMILIH OPERASI
// --------------------------------
function chooseOperation(selectedOperation) {
    // Jika tidak ada angka saat ini, tidak dilakukan apa-apa
    if (currentOperand === '') return;
    
    // Jika sudah ada angka sebelumnya, hitung dulu
    if (previousOperand !== '') {
        compute();
    }
    
    // Simpan operasi yang dipilih
    operation = selectedOperation;
    
    // Pindahkan angka saat ini ke angka sebelumnya
    previousOperand = currentOperand;
    
    // Reset angka saat ini
    currentOperand = '';
}

// 5. FUNGSI UNTUK MELAKUKAN PERHITUNGAN
// --------------------------------------
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Jika prev atau current bukan angka, tidak dilakukan apa-apa
    if (isNaN(prev) || isNaN(current)) return;
    
    // Lakukan perhitungan berdasarkan operasi yang dipilih
    switch (operation) {
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
            // Cegah pembagian dengan 0
            if (current === 0) {
                alert("Tidak bisa membagi dengan nol!");
                clear();
                return;
            }
            computation = prev / current;
            break;
        case 'percentage':
            computation = prev * (current / 100);
            break;
        default:
            return;
    }
    
    // Simpan hasil komputasi sebagai angka saat ini
    currentOperand = computation.toString();
    
    // Reset operasi dan angka sebelumnya
    operation = undefined;
    previousOperand = '';
}

// 6. FUNGSI UNTUK MENGHAPUS SEMUA DATA
// -------------------------------------
function clear() {
    previousOperand = '';
    currentOperand = '0';
    operation = undefined;
}

// 7. FUNGSI UNTUK MENGHAPUS ANGKA TERAKHIR
// -----------------------------------------
function deleteNumber() {
    // Hapus karakter terakhir dari currentOperand
    currentOperand = currentOperand.slice(0, -1);
    
    // Jika setelah dihapus menjadi kosong, set ke '0'
    if (currentOperand === '') {
        currentOperand = '0';
    }
}

// 8. FUNGSI UNTUK MENGUBAH SIMBOL OPERASI
// ----------------------------------------
function getOperationSymbol(op) {
    switch (op) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        case 'percentage': return '%';
        default: return '';
    }
}

// 16. FUNGSI UNTUK MENGKUADRATKAN ANGKA
// --------------------------------------
function squareNumber() {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;
    currentOperand = (current * current).toString();
}
// 17. FUNGSI UNTUK MENGUBAH TANDA ANGKA
// -------------------------------------

//


// Tambahkan fungsi baru
function toggleSign() {
    if (currentOperand !== '0') {
        if (currentOperand.startsWith('-')) {
            currentOperand = currentOperand.slice(1);
        } else {
            currentOperand = '-' + currentOperand;
        }
    }
}

// Tambahkan variabel memory
let memory = 0;

// Tambahkan fungsi memory
function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    currentOperand = memory.toString();
}

function memoryAdd() {
    const current = parseFloat(currentOperand);
    if (!isNaN(current)) {
        memory += current;
    }
}

function memorySubtract() {
    const current = parseFloat(currentOperand);
    if (!isNaN(current)) {
        memory -= current;
    }
}

//function toggleSign() {
//    if (currentOperand !== '0') {
//        if (currentOperand.startsWith('-')) {
//            currentOperand = currentOperand.slice(1);
//        } else {
//            currentOperand = '-' + currentOperand;
//        }
//    }

// 18. EVENT LISTENERS UNTUK TOMBOL MEMORY
// ---------------------------------------
const memoryButtons = document.querySelectorAll('.btn.memory');
memoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        switch (action) {
            case 'memoryClear':
                memoryClear();
                break;
            case 'memoryRecall':
                memoryRecall();
                break;
            case 'memoryAdd':
                memoryAdd();
                break;
            case 'memorySubtract':
                memorySubtract();
                break;
        }
        updateDisplay();
    });
});


// 9. FUNGSI UNTUK MENGHITUNG PERSENTASE
// --------------------------------------
function calculatePercentage() {
    const current = parseFloat(currentOperand);
    
    // Jika current bukan angka, tidak dilakukan apa-apa
    if (isNaN(current)) return;
    
    // Hitung persentase
    currentOperand = (current / 100).toString();
}

// 10. EVENT LISTENERS UNTUK TOMBOL ANGKA
// ---------------------------------------
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Dapatkan angka dari atribut data-number
        const number = button.getAttribute('data-number');
        
        // Tambahkan angka ke tampilan
        appendNumber(number);
        
        // Perbarui tampilan
        updateDisplay();
    });
});

// 11. EVENT LISTENERS UNTUK TOMBOL OPERASI
// -----------------------------------------
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        
        // Tangani aksi khusus (clear, delete, percentage)
        if (action === 'clear') {
            clear();
        } else if (action === 'delete') {
            deleteNumber();
        } else if (action === 'percentage' && previousOperand === '') {
            // Jika tidak ada operasi sebelumnya, hitung persentase dari angka saat ini
            calculatePercentage();
        } else {
            // Jika aksi adalah operasi matematika biasa
            chooseOperation(action);
        }
        
        // Perbarui tampilan
        updateDisplay();
    });
});

// 12. EVENT LISTENER UNTUK TOMBOL SAMA DENGAN
// --------------------------------------------
equalsButton.addEventListener('click', () => {
    // Lakukan perhitungan
    compute();
    
    // Perbarui tampilan
    updateDisplay();
});

// 13. EVENT LISTENER UNTUK KEYBOARD SUPPORT
// ------------------------------------------
document.addEventListener('keydown', (event) => {
    // Cegah perilaku default untuk tombol yang kita tangani
    if (
        (event.key >= '0' && event.key <= '9') || 
        event.key === '.' || 
        ['+', '-', '*', '/', '%', 'Enter', 'Escape', 'Backspace'].includes(event.key)
    ) {
        event.preventDefault();
    }
    
    // Tangani input dari keyboard
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (event.key === '+') {
        chooseOperation('add');
    } else if (event.key === '-') {
        chooseOperation('subtract');
    } else if (event.key === '*') {
        chooseOperation('multiply');
    } else if (event.key === '/') {
        chooseOperation('divide');
    } else if (event.key === '%') {
        if (previousOperand === '') {
            calculatePercentage();
        } else {
            chooseOperation('percentage');
        }
    } else if (event.key === 'Enter' || event.key === '=') {
        compute();
    } else if (event.key === 'Escape') {
        clear();
    } else if (event.key === 'Backspace') {
        deleteNumber();
    }
    
    // Perbarui tampilan
    updateDisplay();
});

// 14. INISIALISASI AWAL
// ----------------------
// Tampilkan kalkulator dengan nilai default
updateDisplay();

// 15. FUNGSI UNTUK MENAMPILKAN PESAN SELAMAT DATANG
// --------------------------------------------------
console.log(`
=======================================
KALKULATOR SEDERHANA - JavaScript
=======================================
Fitur:
1. Operasi dasar: +, -, ×, ÷
2. Tombol persentase (%)
3. Dukungan keyboard
4. Tampilan responsif

Cara penggunaan:
- Klik tombol angka untuk input
- Klik tombol operasi untuk memilih operasi
- Klik '=' untuk melihat hasil
- Klik 'C' untuk menghapus semua
- Klik 'DEL' untuk menghapus angka terakhir
=======================================
`);