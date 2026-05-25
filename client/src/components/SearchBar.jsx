function SearchBar({ search, setSearch }) {

  return (
    <div className="p-6">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded border"
      />

    </div>
  );
}

export default SearchBar;