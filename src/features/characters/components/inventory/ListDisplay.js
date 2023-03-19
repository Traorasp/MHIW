/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import InventoryCard from './InventoryCard';

function ListDisplay(prop) {
  const {
    data, listOf, hide, addItem,
  } = prop;

  const items = [...data];

  const [search, setSearch] = useState('');
  const [itemsShown, setItemsShows] = useState(items);
  const [searchType, setSearchType] = useState('name');

  const selectSearchedItems = () => {
    const expression = new RegExp(`${search.toLowerCase()}`);
    const newList = items.filter((itemInfo) => {
      const item = itemInfo.item ? itemInfo.item : itemInfo;

      if (typeof item[searchType] === 'object') {
        console.log(item[searchType]);
        return '';
      }
      if (Array.isArray(searchType)) {
        if (item[searchType].find((type) => (type.toLowerCase().search(expression) !== -1))) {
          return item;
        }
      }

      if (`${item[searchType]}`.toLowerCase().search(expression) !== -1) {
        return item;
      }

      return '';
    });
    setItemsShows(newList);
  };

  const changeType = (e) => setSearchType(e.target.value);

  const selectionTypes = () => {
    switch (listOf) {
      case 'items':
        return (
          <select onChange={changeType}>
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
            <option value="level">Level</option>
            <option value="cost">Cost</option>
            <option value="type">Type</option>
          </select>
        );
      case 'skills':
        return (
          <select onChange={changeType}>
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="priority">Priority</option>
            <option value="cooldown">Cooldown</option>
            <option value="duration">Duration</option>
            <option value="stat">Stat</option>
            <option value="roll">Roll</option>
            <option value="range">Range</option>
          </select>
        );
      case 'spells':
        return (
          <select onChange={changeType}>
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="magics">Magics</option>
            <option value="damageType">Damage Type</option>
            <option value="damageRatio">Damage Ratio</option>
            <option value="knockbackRatio">Knockback Ratio</option>
            <option value="cost">Cost</option>
            <option value="range">Range</option>
            <option value="charge">Charge</option>
          </select>
        );
      default:
        console.log(listOf);
        return '';
    }
  };

  const itemId = (dataList) => {
    if (dataList._id) return dataList._id;
    return dataList.item._id;
  };

  const showDisplayedItems = () => itemsShown.map(
    (item) => (
      <InventoryCard
        key={itemId(item)}
        dataList={item}
        addItem={addItem}
        count={1}
        listOf={listOf}
      />
    ),
  );

  const changeSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    selectSearchedItems();
  }, [search]);

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white p-2 w-2/3 h-5/6 absolute top-[2rem] left-[15%] overflow-scroll">
        <button onClick={hide} type="button">X</button>
        <input id="searchBar" type="text" name="search" value={search} onChange={changeSearch} />
        {selectionTypes()}
        {showDisplayedItems()}
      </div>
    </div>
  );
}

export default ListDisplay;
