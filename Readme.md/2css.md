CSS Variables System (Theme Switching)
:root {
    /* Light Theme Variables */
    --primary-color: #6c63ff;
    --bg-color: #f0f2f5;
    --card-bg: #ffffff;
    --text-color: #333333;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    --neon-glow: 0 0 15px rgba(108, 99, 255, 0.3);
}

[data-theme="dark"] {
    /* Dark Theme Variables */
    --primary-color: #7b73ff;
    --bg-color: #1a1d28;
    --card-bg: #242735;
    --text-color: #ffffff;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    --neon-glow: 0 0 20px rgba(123, 115, 255, 0.5);
}
Keuntungan CSS Variables:

Centralized Control: Semua warna di satu tempat

Easy Theme Switching: Hanya ganti atribut data-theme

Performance: Tidak perlu reload CSS


Grid System untuk Layout
/* Main Layout Grid */
.main-content {
    display: grid;
    grid-template-columns: 1fr 350px; /* Sidebar fixed width */
    gap: 30px;
}

/* Calculator Internal Grid */
.buttons-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* 6 kolom */
    gap: 12px;
}

/* Responsive Grid */
@media (max-width: 1200px) {
    .buttons-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

Button Styling System
.btn {
    /* Base Style untuk semua tombol */
    border: none;
    border-radius: 15px;
    padding: 15px 5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

/* Ripple Effect */
.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn:active::before {
    width: 300px;
    height: 300px;
}

/* Button Variants dengan Gradients */
.number {
    background: var(--bg-color);
    color: var(--text-color);
}

.operator {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
}

.equals {
    background: linear-gradient(135deg, var(--secondary-color), #ff4d6d);
    color: white;
    grid-column: span 2; /* Memenuhi 2 kolom */
}


Animation System
/* Pulse Animation untuk Logo */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.logo i {
    animation: pulse 2s infinite;
}

/* Blink Animation untuk Indicator */
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.mode-dot.scientific {
    animation: blink 3s infinite;
}


Scrollbar Customization
.history-list::-webkit-scrollbar {
    width: 6px;
}

.history-list::-webkit-scrollbar-track {
    background: var(--bg-color);
    border-radius: 10px;
}

.history-list::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
}