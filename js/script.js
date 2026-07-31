// Function untuk update jam dan tanggal
function updateTime() {
    const now = new Date();
    
    // Format Jam
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
    }
    
    // Format Tanggal
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

// Function untuk greeting (salam)
function updateGreeting() {
    const now = new Date();
    const hrs = now.getHours();
    let greet = "Selamat Pagi";
    if (hrs >= 12 && hrs < 15) greet = "Selamat Siang";
    else if (hrs >= 15 && hrs < 18) greet = "Selamat Sore";
    else if (hrs >= 18) greet = "Selamat Malam";
    
    const name = localStorage.getItem('userName') || 'Pengguna';
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        greetingEl.textContent = `${greet}, ${name}!`;
    }
}

// Jalankan saat halaman di-load
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    updateGreeting();
    setInterval(updateTime, 1000); // Jam jalan tiap 1 detik
});