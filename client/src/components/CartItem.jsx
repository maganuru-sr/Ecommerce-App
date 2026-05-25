function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
}) {

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between"
    >

      <div className="flex items-center gap-4">

        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 object-contain rounded bg-white"
        />

        <div>

          <h3 className="text-xl font-bold">
            {item.name}
          </h3>

          <p>₹ {item.price}</p>

          <div className="flex items-center gap-3 mt-2">

            <button
              onClick={() => decreaseQuantity(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              -
            </button>

            <span className="text-xl font-bold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item._id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              +
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartItem;