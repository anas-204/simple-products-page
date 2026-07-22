export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/category-list");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

