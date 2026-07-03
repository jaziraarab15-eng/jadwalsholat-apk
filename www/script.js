let jadwal = null;
let adzanAktif = false;

function aktifkanAdzan() {
    adzanAktif = true;
    alert("🔔 Adzan diaktifkan!");
}

function playAdzan() {
    if (adzanAktif) {
        document.getElementById("adzanSound").play();
    }
}

function cekWaktu(sholat, nama) {
    const now = new Date();
    const jam = now.getHours().toString().padStart(2, '0');
    const menit = now.getMinutes().toString().padStart(2, '0');
    const waktu = `${jam}:${menit}`;

    if (waktu === sholat) {
        alert("🔔 WAKTU SHOLAT " + nama);
        playAdzan();
    }
}

function mulaiCek() {
    setInterval(() => {
        if (!jadwal) return;

        cekWaktu(jadwal.Fajr, "SUBUH");
        cekWaktu(jadwal.Dhuhr, "DZUHUR");
        cekWaktu(jadwal.Asr, "ASHAR");
        cekWaktu(jadwal.Maghrib, "MAGHRIB");
        cekWaktu(jadwal.Isha, "ISYA");

    }, 60000);
}

async function ambilJadwal() {

    const status = document.getElementById("status");

    navigator.geolocation.getCurrentPosition(async (pos) => {

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=20`;

        const res = await fetch(url);
        const data = await res.json();

        jadwal = data.data.timings;

        document.getElementById("jadwal").innerHTML = `
            <p>🌅 Subuh : ${jadwal.Fajr}</p>
            <p>☀️ Dzuhur : ${jadwal.Dhuhr}</p>
            <p>🌤 Ashar : ${jadwal.Asr}</p>
            <p>🌇 Maghrib : ${jadwal.Maghrib}</p>
            <p>🌙 Isya : ${jadwal.Isha}</p>
        `;

        status.innerHTML = "🕌 Jadwal aktif + adzan jalan";

        mulaiCek();

    });
}

ambilJadwal();
