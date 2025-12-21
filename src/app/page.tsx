export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Bisara Sistem</h1>
        <p className="text-xl">Bisnis Nusantara Go Digital</p>
      </header>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Tentang Bisara Sistem</h2>
        <p className="text-lg mb-8">
          Bisara Sistem adalah penyedia sistem kerja digital yang fungsional, sederhana, dan sesuai kesiapan bisnis Indonesia. Kami menaungi produk-produk yang fokus pada masalah operasional nyata UMKM.
        </p>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Produk Turunan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Bisara Laundry</h3>
            <p>Sistem untuk laundry swalayan. Entry product: sekali bayar, cepat deploy, self-host.</p>
            <p className="mt-2">Prospek: Kelola mesin cuci tanpa staf penuh, offline-first, UX sederhana.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Bisara Booking</h3>
            <p>Sistem booking untuk layanan. Segera hadir.</p>
            <p className="mt-2">Prospek: Mudahkan pemesanan, kurangi kesalahan manual.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Bisara Workshop</h3>
            <p>Sistem untuk bengkel. Segera hadir.</p>
            <p className="mt-2">Prospek: Kelola antrian dan servis, tingkatkan efisiensi.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Bisara Property</h3>
            <p>Sistem untuk properti. Segera hadir.</p>
            <p className="mt-2">Prospek: Kelola penyewaan dan pemeliharaan.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Bisara Klinik</h3>
            <p>Sistem untuk klinik. Masa depan, berbasis langganan.</p>
            <p className="mt-2">Prospek: Kelola pasien dan jadwal, data historis.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Model Bisnis</h2>
        <p className="text-lg mb-4"><strong>Entry Product:</strong> Sekali bayar, tanpa langganan, cocok UMKM sederhana.</p>
        <p className="text-lg"><strong>Platform:</strong> Berbasis langganan, untuk bisnis yang berkembang.</p>
      </section>
      <footer className="bg-blue-600 text-white text-center py-4">
        <p>&copy; 2023 Bisara Sistem. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}
