'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import { Tag, ShoppingCart, ShieldAlert } from 'lucide-react';
import styles from './Boutique.module.css'; // Importation du CSS Module

export default function Boutique() {
  const { boutiqueProducts } = useData();
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', 'Vêtements', 'Accessoires'];

  const filteredProducts = filter === 'Tous'
    ? boutiqueProducts
    : boutiqueProducts.filter(p => p.category === filter);

  return (
    <div className={styles.boutiquePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <span className={styles.heroEyebrow}>Équipements</span>
          <h1 className={styles.heroTitle}>
            La <span className="gradient-text-animated">Boutique</span>
          </h1>
          <p className={styles.heroDescription}>
            Affichez les couleurs de votre club avec nos vêtements techniques et accessoires officiels TEP Sport.
          </p>
          <div className={styles.heroDivider} />
        </div>
      </section>

      {/* Filter & Catalog Section */}
      <section className={styles.catalogSection}>
        <div className={styles.container}>
          {/* Filters */}
          <div className={styles.filterContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`${styles.filterButton} ${filter === cat ? styles.filterButtonActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                {/* Product Image */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {!product.inStock && (
                    <div className={styles.outOfStockOverlay}>
                      <span className={styles.outOfStockBadge}>
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className={styles.cardDetails}>
                  <div className={styles.titlePriceRow}>
                    <h3 className={styles.productName}>
                      {product.name}
                    </h3>
                    <span className={styles.productPrice}>
                      {product.price}€
                    </span>
                  </div>

                  <div className={styles.metaRow}>
                    <span className={styles.categoryTag}>
                      <Tag size={12} /> {product.category}
                    </span>
                    <span className={product.inStock ? styles.stockStatusIn : styles.stockStatusOut}>
                      {product.inStock ? '✓ En stock' : 'Rupture temporaire'}
                    </span>
                  </div>
                </div>

                {/* Purchase Info */}
                <div className={styles.cardAction}>
                  <button
                    disabled={!product.inStock}
                    className={`${styles.buyButton} ${product.inStock ? styles.buyButtonEnabled : styles.buyButtonDisabled
                      }`}
                  >
                    <ShoppingCart size={16} /> Acheter à l'accueil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Alert information */}
          <div className={styles.infoAlert}>
            <ShieldAlert size={24} className={styles.infoAlertIcon} />
            <p className={styles.infoAlertText}>
              Pour des raisons logistiques, les produits de notre boutique ne sont pas expédiés. Vous pouvez passer commande en ligne et retirer vos articles directement à l'accueil du centre.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}