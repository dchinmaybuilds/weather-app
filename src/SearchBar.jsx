const SearchBar = ({
  search,
  setSearch,
  activeIndex,
  suggestions,
  handleSearch,
  handleLocation,
  handleSuggestionClick,
  handleKeyDown,
}) => {
  return (
    <div className="searchContainer">
      <form className="inputForm" onSubmit={(e) => e.preventDefault()}>
        <div className="inputWrapper">
          <input
            type="text"
            className="searchBar"
            placeholder="Enter city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {search && (
            <button className="clearbutton" onClick={() => setSearch("")}>
              x
            </button>
          )}
        </div>
        <div className="buttonWrapper">
          <button className="button searchbutton" onClick={handleSearch}>
            Search
          </button>
          <button className="button locationbutton" onClick={handleLocation}>
            Use my location
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <div className="dropDown">
          <ul className="suggestionsList">
            {suggestions.map((suggestion, index) => (
              <li
                className={index === activeIndex ? "Active" : ""}
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
