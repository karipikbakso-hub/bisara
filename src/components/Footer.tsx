import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Bisara Sistem
            </h3>
            <p className="text-neutral-300 mb-4 leading-relaxed">
              Sistem kerja digital untuk usaha Indonesia yang ingin rapi tanpa ribet.
            </p>
            <p className="text-neutral-400 text-sm">
              Membantu UMKM Indonesia naik kelas dengan sistem digital yang simpel dan efektif.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Produk</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#produk" className="hover:text-white transition-colors">Bisara Laundry</a></li>
              <li><a href="#produk" className="hover:text-white transition-colors">Bisara Booking</a></li>
              <li><a href="#produk" className="hover:text-white transition-colors">Bisara Workshop</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#tentang" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#kontak" className="hover:text-white transition-colors">Kontak</a></li>
              <li><a href="#karir" className="hover:text-white transition-colors">Karir</a></li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © 2025 Bisara Studio. Dibuat untuk UMKM Indonesia.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
