const SearchBar = ({
  search,
  setSearch,
  suggestions,
  handleSearch,
  handleLocation,
  handleSuggestionClick,
}) => {
  return (
    <div className="searchContainer">
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

      {suggestions.length > 0 && (
        <div className="dropDown">
          <ul className="suggestionsList">
            {suggestions.map((suggestion) => (
              <li
                className="suggestion"
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <img
                  className="flag"
                  src={`https://flagcdn.com/w20/${suggestion.country_code.toLowerCase()}.png`}
                />
                {` ${suggestion.name}, ${suggestion.admin1}, ${suggestion.country}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
