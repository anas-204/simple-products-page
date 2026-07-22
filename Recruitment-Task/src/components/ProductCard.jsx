import { useCart } from "../hooks/useCart";

export function ProductCard({ product }) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="card h-100 shadow-sm border-light-subtle">
      <div className="position-relative bg-light">
        <span className="badge text-bg-secondary position-absolute top-0 start-0 m-2 text-capitalize z-1">
          {product.category.replace(/-/g, " ")}
        </span>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top object-fit-cover"
        />
      </div>

      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h5 className="card-title mb-0 fw-semibold" title={product.title}>
            {product.title}
          </h5>
          <small className="text-muted text-nowrap d-flex align-items-center gap-1">
            ⭐ {product.rating.toFixed(1)}
          </small>
        </div>

        <p
          className="card-text small text-muted mb-0"
          style={{
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        <p className="fw-bold fs-5 mt-auto pt-2 mb-0">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <div className="card-footer bg-transparent border-top-0 pt-0 pb-3">
        <div className="row g-2">
          <div className="col-6">
            <a
              href={`/products/${product.id}`}
              className="btn btn-outline-dark w-100 btn-sm d-flex align-items-center justify-content-center gap-1"
            >
              Details
            </a>
          </div>
          <div className="col-6">
            <button
              className="btn btn-primary w-100 btn-sm d-flex align-items-center justify-content-center gap-1"
              onClick={() => addToCart(product)}
            >
              🛒 Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
