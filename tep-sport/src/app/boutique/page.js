'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import { ShoppingBag, Star, Tag, ShoppingCart, ShieldAlert } from 'lucide-react';

export default function Boutique() {
  const { boutiqueProducts } = useData();
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', 'Vêtements', 'Accessoires'];

  const filteredProducts = filter === 'Tous' 
    ? boutiqueProducts 
    : boutiqueProducts.filter(p => p.category === filter);

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Équipements</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            La <span className="gradient-text-animated">Boutique</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Affichez les couleurs de votre club avec nos vêtements techniques et accessoires officiels TEP Sport.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto" />
        </div>
      </section>

      {/* Filter & Catalog Section */}
      <section className="py-12 px-6 bg-black/30 flex-1">
        <div className="container mx-auto max-w-6xl">
          {/* Filters */}
          <div className="flex justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all ${
                  filter === cat
                    ? 'bg-cyan-500 border-cyan-500 text-black shadow-lg shadow-cyan-500/10'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-card overflow-hidden group flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
                {/* Product Image */}
                <div className="relative h-64 w-full bg-white/5 border-b border-white/5 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
                      <span className="bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-wider">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xl font-black text-cyan-400 shrink-0">
                      {product.price}€
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 flex items-center gap-1">
                      <Tag size={12} /> {product.category}
                    </span>
                    <span className={product.inStock ? 'text-emerald-400' : 'text-white/30'}>
                      {product.inStock ? '✓ En stock' : 'Rupture temporaire'}
                    </span>
                  </div>
                </div>

                {/* Purchase Info */}
                <div className="p-6 pt-0">
                  <button 
                    disabled={!product.inStock}
                    className={`w-full py-2.5 text-sm font-semibold rounded-full flex items-center justify-center gap-2 border transition-all ${
                      product.inStock
                        ? 'bg-white/5 hover:bg-cyan-500 hover:text-black border-white/10 hover:border-cyan-500 cursor-pointer'
                        : 'bg-white/5 border-transparent text-white/20 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} /> Acheter à l'accueil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Alert information */}
          <div className="max-w-2xl mx-auto mt-16 p-4 rounded-xl border border-white/5 bg-white/2 flex items-center gap-3 text-center sm:text-left">
            <ShieldAlert size={24} className="text-cyan-500 shrink-0" />
            <p className="text-xs text-white/50 leading-relaxed">
              Pour des raisons logistiques, les produits de notre boutique ne sont pas expédiés. Vous pouvez passer commande en ligne et retirer vos articles directement à l'accueil du centre.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
