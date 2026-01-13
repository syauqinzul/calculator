<!-- Font Awesome untuk icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<!-- Google Fonts untuk typography -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins&display=swap" rel="stylesheet">

<header class="header">
    <div class="logo">
        <i class="fas fa-calculator"></i>
        <h1>Neon<span>Calc</span></h1>
    </div>
    <div class="header-controls">
        <button id="theme-toggle" class="theme-btn">
            <i class="fas fa-moon"></i>
            <span>Mode Gelap</span>
        </button>
    </div>
</header>
Struktur:

Logo: Kombinasi icon + text dengan gradient

Theme Toggle: Button untuk switch dark/light mode

Data Attributes: Tidak ada di sini, tetapi akan digunakan JS

Bagian 3: Display Kalkulator
<div class="display-container">
    <div class="display-header">
        <div class="mode-indicator">
            <span class="mode-dot scientific"></span>
            <span class="mode-dot memory"></span>
            <span class="mode-dot angle">DEG</span>
        </div>
        <div class="memory-display" id="memory-display">
            M: 0
        </div>
    </div>
    <div class="display">
        <div class="previous-operation" id="previous-operation"></div>
        <div class="current-operation" id="current-operation">0</div>
        <div class="result-display" id="result-display"></div>
    </div>
</div>
Komponen Display:

Mode Indicator: LED dots untuk status

Scientific: Mode fungsi ilmiah aktif

Memory: Memory sedang digunakan

Angle: Derajat/Radians mode

Memory Display: Menunjukkan nilai memory

Three-line Display:

Previous: Operasi sebelumnya

Current: Input saat ini

Result: Hasil perhitungan


Bagian 4: Button Grid System
<div class="buttons-grid">
    <!-- 6 kolom layout -->
    <button class="btn func" data-action="second" id="second-btn">
        <i class="fas fa-exchange-alt"></i> 2nd
    </button>
    <!-- ... 35 tombol lainnya -->
</div>
Klasifikasi Tombol:
<!-- Berdasarkan class CSS -->
<button class="btn number" data-number="7">7</button>
<button class="btn operator" data-action="add">+</button>
<button class="btn scientific" data-action="sqrt">√</button>
<button class="btn memory" data-action="m-plus">M+</button>
<button class="btn equals" data-action="equals">=</button>
Data Attributes Strategy:

data-number: Untuk tombol angka (0-9, .)

data-action: Untuk semua operasi dan fungsi

id: Untuk elemen yang butuh referensi khusus


Bagian 5: History Sidebar
<div class="history-sidebar">
    <div class="sidebar-header">
        <h3><i class="fas fa-history"></i> Riwayat Perhitungan</h3>
        <div class="history-count" id="history-count">0 items</div>
    </div>
    <div class="history-list" id="history-list">
        <!-- Dynamic content dari JavaScript -->
    </div>
</div>
Fitur History:

Live Count: Jumlah item history

Dynamic List: Diisi oleh JavaScript

Export Function: Tombol export history