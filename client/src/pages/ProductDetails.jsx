import { useEffect, useState } from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import axios from "axios";

import laptop from "../assets/laptop.jpg";
import phone from "../assets/phone.jpg";
import watch from "../assets/watch.jpg";
import ipad from "../assets/ipad.jpg";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      const foundProduct = response.data.find(
        (item) => item._id === id
      );

      if (!foundProduct) {

        setLoading(false);

        return;
      }

      let localImage;

      if (foundProduct.image === "laptop.jpg") {
        localImage = laptop;
      }

      else if (foundProduct.image === "phone.jpg") {
        localImage = phone;
      }

      else if (foundProduct.image === "watch.jpg") {
        localImage = watch;
      }

      else if (foundProduct.image === "ipad.jpg") {
        localImage = ipad;
      }

      setProduct({
        ...foundProduct,
        image: localImage,
      });

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen text-4xl font-bold">

        Loading...

      </div>
    );
  }

  if (!product) {

    return (
      <h1 className="text-3xl p-10">
        Product Not Found
      </h1>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <Link
        to="/"
        className="bg-black text-white px-5 py-2 rounded"
      >
        ← Back to Home
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-6">

        <img
          src={product.image}
          alt={product.name}
          className="h-96 w-full object-contain rounded"
        />

        <h1 className="text-4xl font-bold mt-6">
          {product.name}
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          {product.description}
        </p>

        <p className="text-xl text-gray-500 mt-2">
          Category: {product.category}
        </p>

        <p className="text-xl text-gray-500 mt-2">
          Stock: {product.stock}
        </p>

        <p className="text-3xl font-bold mt-6">
          ₹ {product.price}
        </p>

        <button
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;