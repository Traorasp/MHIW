/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListDisplay from './ListDisplay';
import { selectCurrentItems } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import DetailsBtn from './DetailsBtn';

function CharacterInventory(prop) {
  const { character, update } = prop;

  const categories = ['Name', 'Rarity', 'Level', 'Cost', 'Type'];
  let itemList = useSelector(selectCurrentItems);
  itemList = itemList.data ? itemList.data : itemList;

  const [equipError, setEquipError] = useState(false);
  const [items, setItems] = useState([...character.inventory]);
  const [equiped, setEquiped] = useState([...character.equiped]);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [showForm, setShowForm] = useState(false);
  const [itemsShown, setItemsShows] = useState([...items, ...equiped]);
  const [searchTypes, setSearchTypes] = useState([]);

  const isEquiped = (itemId) => equiped.some((piece) => piece === itemId || piece._id === itemId);

  const selectSearchedItems = () => {
    const searchBar = document.getElementById('searchBar');
    const allItems = [...equiped, ...items];
    if (searchBar.value === '') {
      setItemsShows(allItems);
      return;
    }
    const expression = new RegExp(`${searchBar.value.toLowerCase()}`);
    const newList = allItems.filter((item, i) => {
      if (equiped.length > i && searchTypes.find((type) => type !== 'Equiped')) {
        return item;
      }
      if (item.name.toLowerCase().search(expression) !== -1) {
        if (searchTypes.find((type) => type !== item.type)) {
          return item;
        }
      }
      return '';
    });
    setItemsShows(newList);
  };

  const changeSearchType = (e) => {
    if (e.target.value === '' || searchTypes.find((type) => type === e.target.value)) return;
    setSearchTypes([...searchTypes, e.target.value]);
    selectSearchedItems();
  };

  const removeSearchType = (e) => {
    const newTypes = searchTypes.map((info) => info);
    newTypes.splice(e.target.value, 1);
    setSearchTypes(newTypes);
  };

  const equipedItem = async (newEquipment, newItems) => {
    try {
      if (isLoading) return;
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => {
        newChar[key] = value;
      });

      newChar.equiped = newEquipment.length > 0
        ? newEquipment.map((item) => item._id) : [];

      newChar.inventory = newItems.length > 0
        ? newItems.map((item) => item._id) : [];

      await updateCharacter(newChar).unwrap();
      await update();
    } catch (err) {
      console.log(err);
    }
  };

  const hideEquipError = () => {
    setTimeout(() => {
      setEquipError(false);
    }, 5000);
  };

  const changeEquipment = (e) => {
    if (isLoading) return;
    const index = e.target.value;
    const id = itemsShown[index]._id || itemsShown[index];
    let ind;
    switch (e.target.textContent) {
      case 'Unequip': {
        const newEquipment = [...equiped];
        ind = newEquipment.findIndex((item) => item._id === id);
        newEquipment.splice(ind, 1);
        setEquiped(newEquipment);
        const newItems = [...items, itemsShown[index]];
        setItems(newItems);
        equipedItem(newEquipment, newItems);
        return; }
      case 'Equip': {
        if (equiped.length >= 5) {
          setEquipError(true);
          hideEquipError();
          return;
        }

        const newItems = [...items];
        ind = newItems.findIndex((item) => item._id === id);
        newItems.splice(ind, 1);
        setItems(newItems);
        const newEquipment = [...equiped, itemsShown[index]];
        setEquiped(newEquipment);

        equipedItem(newEquipment, newItems);
        break; }
      default:
    }
  };

  const handleShowForm = () => setShowForm(!showForm);

  useEffect(() => {
    setItems([...character.inventory]);
    setEquiped([...character.equiped]);
  }, [character]);

  useEffect(() => {
    selectSearchedItems();
  }, [items, equiped]);

  const removeItem = async (e) => {
    try {
      if (isLoading) return;
      const index = +e.target.value;
      const id = itemsShown[index]._id || itemsShown[index];
      let target;
      if (searchTypes.find((type) => type !== 'Equiped')) {
        target = 'equiped';
      } else {
        if (index >= equiped.length) {
          target = 'inventory';
        }
        let count = equiped.filter((item) => item === id || item._id === id).length;
        let i = 0;
        while (target === undefined) {
          const currItem = itemsShown[i];
          if (currItem === id || currItem._id === id) {
            count -= 1;
            if (count >= 0 && index === i) {
              target = 'equiped';
            } else if (count < 0) {
              target = 'inventory';
            }
          }
          i += 1;
        }
      }
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          newChar[key] = [...value];
        } else {
          newChar[key] = value;
        }
      });
      let ind;
      switch (target) {
        case 'inventory':
          ind = newChar.inventory.findIndex((item) => item === id || item._id === id);
          newChar.inventory.splice(ind, 1);
          setItems(newChar.inventory);
          break;
        case 'equiped':
          ind = newChar.equiped.findIndex((item) => item === id || item._id === id);
          newChar.equiped.splice(ind, 1);
          setEquiped(newChar.equiped);
          break;
        default:
          return;
      }
      await updateCharacter(newChar).unwrap();
      await update();
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (e) => {
    try {
      const id = e.target.value;
      if (isLoading) return;
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => {
        newChar[key] = value;
      });

      newChar.inventory.map((item) => (item._id ? item._id : item));
      newChar.inventory = [...newChar.inventory, id];

      await updateCharacter(newChar).unwrap();
      setShowForm(false);
      await update();
    } catch (err) {
      console.log(err);
    }
  };

  const inventory = () => {
    const tempEquipment = [...equiped];
    return itemsShown.map((item, i) => {
      let check = isEquiped(item._id);
      if (check) {
        const ind = tempEquipment.findIndex(
          (equip) => equip === item._id || equip._id === item._id,
        );
        if (ind >= 0) {
          tempEquipment.splice(ind, 1);
        } else {
          check = false;
        }
      }
      return (
        <div className="border-2 border-black" key={item._id + i}>
          {`${item.name} ${item.type}   LV ${item.level}`}
          <button type="button" value={i} onClick={removeItem}>Remove</button>
          <button value={i} type="button" onClick={changeEquipment}>{check ? 'Unequip' : 'Equip'}</button>
          <DetailsBtn
            id={item._id}
            data={item}
            listOf="items"
          />
        </div>
      );
    });
  };

  return (

    <div>
      <div>
        <input type="text" id="searchBar" onChange={selectSearchedItems} />
        <select onChange={changeSearchType}>
          <option value="">None</option>
          <option value="equiped">Equiped</option>
          <option value="Item">Item</option>
          <option value="Armor">Armor</option>
          <option value="Knife">Knife</option>
          <option value="Sword">Sword</option>
          <option value="Axe">Axe</option>
          <option value="Polearm">Polearm</option>
          <option value="Hammer">Hammer</option>
          <option value="Gauntlet">Gauntlet</option>
          <option value="Chained">Chained</option>
          <option value="Shield">Shield</option>
          <option value="Bow">Bow</option>
        </select>
        <button type="button" onClick={handleShowForm}>+</button>
        {searchTypes.length < 1 ? '' : searchTypes.map((type, i) => (
          <div key={type}>
            {type}
            <button value={i} type="button" onClick={removeSearchType}>X</button>
          </div>
        )) }
      </div>
      {showForm ? <ListDisplay categories={categories} listOf="items" hide={handleShowForm} data={itemList} addItem={addItem} /> : ''}
      {inventory()}
      {equipError ? (
        <div className="absolue left-2 bottom-2 bg-red-600 text-white">
          Max number of equiped items reached
        </div>
      ) : ''}
    </div>
  );
}

export default CharacterInventory;
