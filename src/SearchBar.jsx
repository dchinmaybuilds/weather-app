const SearchBar = ({ search, setSearch, handleSearch, handleLocation }) => {
  return (
    <form className="inputForm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="searchBar"
        placeholder="Enter city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="button searchbutton" onClick={handleSearch}>
        Search
      </button>
      <button className="button locationbutton" onClick={handleLocation}>
        Use my location
      </button>
    </form>
  );
};

export default SearchBar;
