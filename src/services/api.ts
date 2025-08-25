// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Erreur lors du chargement des catégories");
  return res.json();
}

export async function fetchNewArrivals() {
  const res = await fetch(`${API_URL}/products/new-arrivals`);
  if (!res.ok) throw new Error("Erreur lors du chargement des nouveautés");
  return res.json();
}

export async function fetchBestSellers() {
  const res = await fetch(`${API_URL}/products/best-sellers`);
  if (!res.ok) throw new Error("Erreur lors du chargement des best-sellers");
  return res.json();
}
