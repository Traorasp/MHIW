import { useEffect, useState } from 'react';

function AbilitiesSearchBar(prop) {
  const { abilities, categories, setSelectedAbilities } = prop;

  const [searchType, setSearchType] = useState('name');
  const [search, setSearch] = useState('');

  const handleSearchType = (e) => setSearchType(e.target.value.toLowerCase());
  const handleSearch = (e) => setSearch(e.target.value);

  const filterAbilities = () => {
    const expression = new RegExp(`${search.toLowerCase()}`);
    if (search === '') {
      setSelectedAbilities(abilities);
      return;
    }
    const selectedAbilities = abilities.filter((ability) => {
      switch (Array.isArray(ability[searchType])) {
        case true:
          if (ability[searchType].find((type) => (type.toLowerCase().search(expression) !== -1))) {
            return true;
          }
          break;
        case false:
          if (typeof ability[searchType] === 'number') {
            if (`${ability[searchType]}`.search(expression) !== -1) {
              return true;
            }
            return false;
          }
          if (ability[searchType].toLowerCase().search(expression) !== -1) {
            return true;
          }
          break;
        default:
          return false;
      }
      return false;
    });
    setSelectedAbilities(selectedAbilities);
  };

  useEffect(() => {
    filterAbilities();
  }, [searchType, search]);

  return (
    <div>
      <input onChange={handleSearch} type="text" id="search" name="search" />
      <select onChange={handleSearchType}>
        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
    </div>
  );
}

export default AbilitiesSearchBar;
