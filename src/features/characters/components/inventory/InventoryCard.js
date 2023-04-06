/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import DetailedCard from '../../../documentation/DetailedCard';

function InventoryCard(prop) {
  const {
    dataList, count, addItem, listOf,
  } = prop;

  const [details, showDetails] = useState(false);
  const [hasDetails, setHasDetails] = useState(false);

  const changeDetails = () => showDetails(!details);
  const ignoredKeys = ['_id', '__v', 'material', 'image', 'enchantments', 'subStats', 'name'];

  const itemId = () => {
    if (dataList._id) return dataList._id;
    if (dataList.item) return dataList.item._id;
    return count;
  };

  return (
    <div className={count === 1 ? 'border-2 border-black' : ''} key={itemId()}>
      {dataList.name}
      {Object.entries(dataList).map(([key, value]) => {
        if (key >= 0 || value.length < 1 || ignoredKeys.find((ignore) => ignore === key)) {
          return '';
        }
        if (key === 'url' || key === 'item') {
          if (key === 'url') {
            return value ? <img key={key} className="object-cover" src={value} alt="Item" /> : '';
          }
          return <InventoryCard key={key} dataList={value} count={count + 1} />;
        }
        if (typeof value === 'object') {
          if (!hasDetails) {
            setHasDetails(true);
          }
          return <InventoryCard key={key} dataList={value} count={count + 1} />;
        }
        return (
          <div key={key}>
            {key === 'name' ? '' : `${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
            {value}
          </div>
        );
      })}
      {count === 1 && hasDetails ? <button className="active:bg-yellow-400" type="button" onClick={changeDetails}>Details</button> : ''}
      {count === 1 ? <button type="button" value={itemId()} onClick={addItem}>+</button> : ''}
      {count === 1 && details
        ? (
          <DetailedCard
            id={dataList._id ? dataList._id : dataList.item._id}
            count={0}
            listOf={listOf}
          />
        ) : ''}
    </div>
  );
}

export default InventoryCard;
