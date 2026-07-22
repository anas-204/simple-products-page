import { useCart } from "../hooks/useCart";

function Navbar() {
  const count = useCart((state) => state.count);

  return (
    <nav className="navbar sticky-top bg-body-tertiary border-bottom py-3">
      <div className="container">
        <a
          href="/"
          className="navbar-brand fw-bold mb-0 h4 d-flex align-items-center gap-2"
        >
          🛍️ Shoply
        </a>

        <div className="d-flex align-items-center gap-2 bg-white border rounded-pill px-3 py-2 shadow-sm">
          <span className="fw-medium small">Cart</span>
          <span className="badge text-bg-primary rounded-pill">{count}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
