import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "https://ecommerce-app-3c91.onrender.com/api/auth/register",

        {
          name,
          email,
          password,
        }

      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      toast.success("Registration Successful");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response.data.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 border rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;