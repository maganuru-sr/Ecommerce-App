import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">

      <Link to={`/product/${product._id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-contain rounded bg-white"
        />

        <h2 className="text-xl font-bold mt-4">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {product.category}
        </p>

        <p className="text-2xl font-bold mt-3">
          ₹ {product.price}
        </p>

      </Link>

      <button
        onClick={() => addToCart(product)}
        className="bg-black text-white px-4 py-2 rounded mt-4 w-full"
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;