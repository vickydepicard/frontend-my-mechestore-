// src/components/NewArrivals.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // ✅ ton CartContext
import { Product } from "./types"; // ✅ type centralisé

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const navigate = useNavigate(); // 🔥 utilisé pour redirection

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/new-arrivals`
        );
        if (!res.ok) throw new Error("Erreur lors du chargement des produits");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const price = product.variants?.[0]?.prix ?? 0;
    const image = product.images?.[0] ?? "/placeholder.jpg";

    addToCart({
      _id: product._id,
      name: product.name,
      price,
      image,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <p className="text-gray-600">Chargement des nouveaux produits...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <p className="text-red-500">❌ {error}</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Nouveaux Arrivages
        </h2>
        <p className="text-gray-600 mt-2">
          Découvrez nos derniers produits fraîchement ajoutés.
        </p>
      </div>

      {/* Grille produits */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {/* Image */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate(`/produit/${p._id}`)} // 🔥 redirection dynamique
            >
              <img
                src={p.images?.[0] ?? "/placeholder.jpg"}
                alt={p.name}
                className="object-contain max-h-48 w-full transition-transform duration-300 hover:scale-105"
              />
              {p.promotion?.active && (
                <span
                  className="absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded"
                  style={{
                    backgroundColor: p.promotion.couleur_badge ?? "#E91E63",
                    color: "#fff",
                  }}
                >
                  {p.promotion.badge_texte ?? "Promo"}
                </span>
              )}
            </div>

            {/* Infos */}
            <h3 className="text-lg font-semibold text-gray-800 mt-3">{p.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>

            {/* Prix */}
            <div className="mt-2">
              {p.variants?.[0] ? (
                <div>
                  <span className="text-pink-600 font-bold">
                    {p.variants[0].prix.toLocaleString()} FCFA
                  </span>
                  {p.variants[0].ancien_prix && (
                    <span className="text-gray-400 text-sm line-through ml-2">
                      {p.variants[0].ancien_prix.toLocaleString()} FCFA
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-gray-500">Prix indisponible</span>
              )}
            </div>

            {/* Boutons */}
            <div className="mt-auto flex gap-3 pt-4">
              <button
                onClick={() => navigate(`/produit/${p._id}`)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Voir
              </button>
              <button
                onClick={() => handleAddToCart(p)}
                disabled={!p.en_stock}
                className={`flex-1 py-2 rounded-lg transition ${
                  p.en_stock
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                {p.en_stock ? "Ajouter" : "Rupture"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
