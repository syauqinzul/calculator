Penjelasan HTML:
Struktur Dasar: Dokumen HTML standar dengan deklarasi DOCTYPE, head, dan body.

Head: Berisi metadata, judul, dan link ke stylesheet.

Body:

Container utama untuk layout

Header dengan judul proyek

Kalkulator dengan layar dan tombol

Bagian penjelasan kode

Footer dengan informasi

Tombol Kalkulator: Setiap tombol memiliki atribut data untuk mengidentifikasi fungsinya.




Penjelasan CSS:
Reset dan Global: Menghapus margin/padding default dan mengatur box-sizing.

Body dan Container: Mengatur layout, background gradient, dan styling container utama.

Kalkulator: Styling untuk tampilan kalkulator termasuk layar dan tombol.

Tombol: Styling untuk berbagai jenis tombol (angka, operator, equals) dengan efek hover.

Responsif: Media query untuk tampilan mobile.




Penjelasan Detail Kode JavaScript:
1. Selektor DOM
Menggunakan document.getElementById() dan document.querySelectorAll() untuk mendapatkan elemen HTML yang akan dimanipulasi.

2. Variabel State
Menyimpan data kalkulator: previousOperand, currentOperand, dan operation.

3. Fungsi updateDisplay()
Memperbarui tampilan kalkulator berdasarkan state saat ini.

4. Fungsi appendNumber(number)
Menambahkan angka ke currentOperand dengan pengecualian untuk titik desimal ganda.

5. Fungsi chooseOperation(selectedOperation)
Menyimpan operasi matematika yang dipilih dan mempersiapkan untuk perhitungan.

6. Fungsi compute()
Melakukan perhitungan matematika berdasarkan operasi yang dipilih.

7. Fungsi clear()
Mengembalikan kalkulator ke state awal.

8. Fungsi deleteNumber()
Menghapus digit terakhir dari currentOperand.

9. Event Listeners
Menangani klik tombol dan input keyboard.

10. Inisialisasi
Memanggil updateDisplay() untuk menampilkan kalkulator dengan nilai default.