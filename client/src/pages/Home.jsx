import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import laptop from "../assets/laptop.jpg";
import phone from "../assets/phone.jpg";
import watch from "../assets/watch.jpg";
import ipad from "../assets/ipad.jpg";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartItem";

function Home() {

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(

    JSON.parse(
      localStorage.getItem("cartItems")
    ) || []

  );

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart)
    );

  }, [cart]);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "https://ecommerce-app-3c91.onrender.com/api/products"
      );

      const updatedProducts = response.data.map((product) => {

        let localImage;

        if (product.image === "laptop.jpg") {
          localImage = laptop;
        }

        else if (product.image === "phone.jpg") {
          localImage = phone;
        }

        else if (product.image === "watch.jpg") {
          localImage = watch;
        }

        else if (product.image === "ipad.jpg") {
          localImage = ipad;
        }

        return {
          ...product,
          image: localImage,
        };
      });

      setProducts(updatedProducts);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category
        .toLowerCase() ===
      category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {

    toast.success(
      `${product.name} added to cart`
    );

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        { ...product, quantity: 1 }
      ]);

    }
  };

  const increaseQuantity = (_id) => {

    const updatedCart = cart.map((item) =>
      item._id === _id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (_id) => {

    const updatedCart = cart
      .map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar cartCount={cart.length} />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        setCategory={setCategory}
      />

      <div className="p-6">

        <h2 className="text-3xl font-bold mb-6">
          Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />

          ))}

        </div>

      </div>

      <div className="p-6">

        <h2 className="text-3xl font-bold mb-6">
          Cart Items
        </h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (

            <CartItem
              key={item._id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />

          ))
        )}

      </div>

      <div className="p-6">

        <h2 className="text-3xl font-bold">
          Total: ₹ {totalPrice}
        </h2>

      </div>

    </div>
  );
}

export default Home;