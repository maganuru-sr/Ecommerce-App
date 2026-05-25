import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount }) {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold"
      >
        Ecommerce Store
      </Link>

      <div className="flex items-center gap-4">

        <button className="bg-white text-black px-4 py-2 rounded">
          Cart ({cartCount})
        </button>

        {userInfo ? (

          <>

            <p>
              {userInfo.name}
            </p>

            <button
              onClick={logoutHandler}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>

          </>

        ) : (

          <Link
            to="/login"
            className="bg-white text-black px-4 py-2 rounded"
          >
            Login
          </Link>

        )}

      </div>

    </nav>
  );
}

export default Navbar;