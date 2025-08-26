// src/components/types.ts
export interface Variant {
  longueur: string;
  couleur: string;
  prix: number;
  ancien_prix?: number;
  stock: number;
  promo_active?: boolean;
}

export interface Promotion {
  active: boolean;
  badge_texte?: string;
  couleur_badge?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug?: string;
  images: string[];
  price?: number;
  currency?: string;
  description?: string;
  details?: string[];
  variants?: Variant[];
  note?: { moyenne: number; nombre: number };
  nouveau?: boolean;
  promotion?: Promotion;  // ✅ ajouté
  en_stock: boolean;      // ✅ ajouté
}

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock?: number;
}
