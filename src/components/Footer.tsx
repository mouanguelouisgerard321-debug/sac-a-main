import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl tracking-[0.2em] mb-3">MAISON LUXE</p>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              L&apos;élégance à son expression la plus pure. Sacs à main de luxe sélectionnés avec soin.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4">Collections</h4>
            <ul className="space-y-2">
              {['Tote Bags', 'Clutches', 'Shoulder Bags', 'Mini Bags', 'Nouveautés'].map((item) => (
                <li key={item}>
                  <Link href="/collection" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4">Service Client</h4>
            <ul className="space-y-2">
              {['Livraison & Retours', 'Authenticité', 'Entretien', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4 font-light">Recevez nos nouvelles collections et offres exclusives.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-white/10 text-white text-sm px-4 py-2.5 border border-white/20 focus:outline-none focus:border-[#C9A96E] placeholder:text-gray-500"
              />
              <button className="bg-[#C9A96E] px-4 py-2.5 text-white text-xs tracking-widest hover:bg-[#b8935e] transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Maison Luxe. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Mentions légales', 'Confidentialité', 'CGV'].map((item) => (
              <Link key={item} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
