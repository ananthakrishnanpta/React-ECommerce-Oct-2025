import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";

const img_server_path = "/images/products/";

const ProductDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { convertPrice, getSymbol, loading } = useCurrency();

  // Try to read from state (from Home)
  const product = state?.product;
  
  // Handle direct access (no state)
  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h3>Product not found</h3>
        <p className="text-muted">Try visiting this page from the home screen.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }
  document.title = `${product.title}`;

  const convertedPrice = convertPrice(product.price);

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={`${img_server_path}${product.img_src}`}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description || "A great product you'll love."}</p>

          {loading ? (
            <p>Loading currency...</p>
          ) : (
            <h4 className="fw-bold">
              {getSymbol()} {convertedPrice}
            </h4>
          )}

          <p className="text-secondary small">(Base: ${product.price} USD)</p>

          <button className="btn btn-success me-3">Add to Cart</button>
          <Link to="/" className="btn btn-outline-secondary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
