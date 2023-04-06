/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import InventoryCard from './InventoryCard';
import AbilitiesSearchBar from '../abilities/AbilitiesSearchBar';

function ListDisplay(prop) {
  const {
    data, listOf, hide, addItem, categories,
  } = prop;

  const items = [...data];
  const clearedItems = () => items.map((item) => item.item);

  const [itemsShown, setItemsShows] = useState(items);

  const handleItemsShown = (newItems) => setItemsShows(newItems);

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

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white p-2 w-2/3 h-5/6 absolute top-[2rem] left-[15%] overflow-scroll">
        <button onClick={hide} type="button">X</button>
        <AbilitiesSearchBar
          categories={categories}
          abilities={listOf !== 'items' ? items : clearedItems()}
          setSelectedAbilities={handleItemsShown}
        />
        {showDisplayedItems()}
      </div>
    </div>
  );
}

export default ListDisplay;
