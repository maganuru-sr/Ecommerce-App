import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

function Admin() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] = useState("");

  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "https://ecommerce-app-3c91.onrender.com/api/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://ecommerce-app-3c91.onrender.com/api/products",
        {
          name,
          price,
          description,
          image,
          category,
          stock,
        }
      );

      toast.success("Product Added");

      fetchProducts();

      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setStock("");

    } catch (error) {

      console.log(error);
    }
  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `https://ecommerce-app-3c91.onrender.com/api/products/${id}`
      );

      toast.success("Product Deleted");

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <form
        onSubmit={addProduct}
        className="bg-white p-6 rounded-lg shadow-lg mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">
          Add Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="p-3 border rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="p-3 border rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="p-3 border rounded"
          />

          <input
            type="text"
            placeholder="Image Name"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="p-3 border rounded"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="p-3 border rounded"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="p-3 border rounded"
          />

        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >
          Add Product
        </button>

      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg"
          >

            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="mt-2">
              ₹ {product.price}
            </p>

            <p className="mt-2">
              {product.category}
            </p>

            <button
              onClick={() =>
                deleteProduct(product._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Admin;