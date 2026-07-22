import { useState, useEffect } from "react";
import { fetchProducts, fetchCategories } from "../api";
import { ProductCard } from "../components/ProductCard";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    if (search && !product.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (category && product.category !== category) return false;
    if (min && product.price < Number(min)) return false;
    if (max && product.price > Number(max)) return false;
    return true;
  });

  if (loading)
    return <div className="text-center p-5 fs-4 text-muted">Loading... ⏳</div>;
  if (error)
    return <div className="text-center p-5 text-danger">Error: {error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">All Products</h1>

      <div className="row g-2 mb-4 bg-white p-3 rounded shadow-sm border border-light-subtle">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <select
            className="form-select text-capitalize"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min $"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            min="0"
          />
        </div>
        <div className="col-6 col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max $"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            min="0"
          />
        </div>
        <div className="col-12 col-md-1">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setSearch("");
              setCategory("");
              setMin("");
              setMax("");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {!filteredProducts.length ? (
        <div className="text-center p-5 text-muted">
          No products found matching your filters.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((p) => (
            <div className="col" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
