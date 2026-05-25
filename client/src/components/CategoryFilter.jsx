function CategoryFilter({ setCategory }) {

  return (
    <div className="px-6 flex gap-4 flex-wrap">

      <button
        onClick={() => setCategory("All")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        All
      </button>

      <button
        onClick={() => setCategory("Electronics")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Electronics
      </button>

      <button
        onClick={() => setCategory("Laptop")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Laptops
      </button>

      <button
        onClick={() => setCategory("Watch")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Watches
      </button>

    </div>
  );
}

export default CategoryFilter;