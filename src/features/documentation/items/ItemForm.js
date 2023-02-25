/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateItemMutation } from './itemApiSlice';
import {
  addDoc, selectCurrentItems, selectCurrentEnchantments,
  selectCurrentMaterials, selectCurrentEffects,
} from '../documentationSlice';
import ImageForm from '../../../component/imageForm';
import { useGetImage } from '../../image/getImage';
import { selectCurrentToken } from '../../auth/authSlice';
import { useDeleteImageMutation } from '../../image/imageApiSlice';
import { useGetEnchantmentMutation } from '../enchantments/enchantmentApiSlice';

function ItemForm(prop) {
  const { hide } = prop;
  let enchantsList = useSelector(selectCurrentEnchantments);
  const effectsList = useSelector(selectCurrentEffects);
  let materialsList = useSelector(selectCurrentMaterials);
  materialsList = Array.isArray(materialsList) ? materialsList : materialsList.data;
  const [enchantmentsList, setEnchantmentsList] = useState('');
  const [enchantDetails] = useGetEnchantmentMutation();

  const populateEnchants = async () => {
    try {
      const enchantments = enchantsList[Object.keys(enchantsList)[0]]
        .map((enchant) => enchantDetails(enchant._id).unwrap());
      enchantsList = await Promise.all(enchantments);
      setEnchantmentsList(enchantsList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    populateEnchants();
  }, []);

  const items = useSelector(selectCurrentItems);
  const token = useSelector(selectCurrentToken);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [rarity, setRarity] = useState('Very Common');
  const [level, setLevel] = useState(1);
  const [material, setMaterial] = useState('');
  const [subStats, setSubStats] = useState(0);
  const [cost, setCost] = useState(0);
  const [type, setType] = useState('Item');
  const [maxDurability, setMaxDurability] = useState(0);
  const [durability, setDurability] = useState(0);
  const [defense, setDefense] = useState(0);
  const [damage, setDamage] = useState(0);
  const [weight, setWeight] = useState(0);
  const [enchantments, setEnchantments] = useState([]);
  const [background, setBackground] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const [deleteImage] = useDeleteImageMutation();

  const [createItem] = useCreateItemMutation();

  const changeName = (e) => setName(e.target.value);
  const changeRarity = (e) => setRarity(e.target.value);
  const changeLevel = (e) => setLevel(e.target.value);
  const changeMaterial = (e) => setMaterial(e.target.value);
  const changeSubStat = (e) => setSubStats(e.target.value);
  const changeCost = (e) => setCost(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeMaxDurability = (e) => setMaxDurability(e.target.value);
  const changeDurability = (e) => setDurability(e.target.value);
  const changeDefense = (e) => setDefense(e.target.value);
  const changeDamage = (e) => setDamage(e.target.value);
  const changeWeight = (e) => setWeight(e.target.value);
  const changeEnchantments = (e) => {
    if (enchantments.length > 0
        && enchantments.find((enchantment) => e.target.value === enchantment.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const enchantmentName = text.split(' :')[0];
    const amount = text.split(' :')[1];
    setEnchantments([...enchantments, { id: e.target.value, enchantmentName, amount }]);
  };

  const changeDescription = (e) => setDescription(e.target.value);
  const changeBackground = (e) => setBackground(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEnchantments = enchantments.map((enchantment) => enchantment.id);
      const { item } = await createItem({
        name,
        rarity,
        level,
        material,
        subStats,
        cost,
        type,
        baseStats: {
          maxDurability,
          durability,
          defense,
          damage,
          weight,
        },
        enchantments: newEnchantments,
        image,
        description,
        background,
      }).unwrap();

      const prevItems = !items.data ? items : items.data;
      dispatch(addDoc({ key: 'items', data: [...prevItems, { item, url }] }));
      hide();

      setName('');
      setRarity('Very Common');
      setLevel(1);
      setMaterial('None');
      setSubStats('None');
      setCost(0);
      setType('Item');
      setMaxDurability(0);
      setDurability(0);
      setDefense(0);
      setDamage(0);
      setWeight(0);
      setEnchantments([]);
      setImage('');
      setUrl('');
      setDescription('');
      setBackground('');
    } catch (err) {
      console.log(err);
    }
  };

  const removeEnchantment = (e) => {
    setEnchantments(enchantments.length === 1 ? [] : enchantments.splice(e.target.key, 1));
  };

  const getImage = () => {
    useGetImage(image, token)
      .then((res) => {
        const href = URL.createObjectURL(res.data);
        setUrl(href);
      }).catch(() => {
        console.log('Failed to load image');
      });
  };

  const handleDeleteImage = () => {
    try {
      deleteImage(image);
      setImage('');
      setUrl('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (image !== '') {
      getImage();
    }
  }, [image]);

  const getEnchantment = (enchant) => {
    if (enchant.skill) {
      return enchant.skill;
    }
    if (enchant.spell) {
      return enchant.spell;
    }
    return enchant.antiTalent;
  };

  return (
    <div className="fixed bg-black/60 h-full w-full">
      <div className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <ImageForm hideForm="None" setImageId={setImage} prevImageId={image} />
        {url !== ''
          ? (
            <div>
              <img className="object-scale-down h-36 w-36" src={url} alt="User profile" />
              <button type="button" onClick={handleDeleteImage}>Delete</button>
            </div>
          ) : ''}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name:
              <input type="text" id="name" onChange={changeName} value={name} required />
            </label>
          </div>
          <div>
            <label htmlFor="rarity">
              Rarity:
              <select id="rarity" name="rarity" onChange={changeRarity}>
                <option value="Very Common">Very Common</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Unique">Unique</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
                <option value="Mythical">Mythical</option>
                <option value="Quasi Artifact">Quasi Artifact</option>
                <option value="Artifact">Artifact</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="level">
              Level:
              <input type="number" id="level" min={1} max={15} onChange={changeLevel} value={level} required />
            </label>
          </div>
          <div>
            <label htmlFor="material">
              Material:
              <select id="material" name="material" onClick={changeMaterial}>
                <option value="">None</option>
                {materialsList.map((materialOpt) => (
                  <option key={materialOpt.material._id} value={materialOpt.material._id}>
                    {materialOpt.material.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="subStats">
              Sub Stat:
              <select id="subStats" name="subStats" onClick={changeSubStat}>
                <option value="">None</option>
                {effectsList[Object.keys(effectsList)[0]].map((effect) => {
                  if (effect.stat.length < 1) return '';
                  return (
                    <option key={effect._id} value={effect._id}>
                      {effect.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="cost">
              Cost:
              <input type="number" min="0" id="cost" onChange={changeCost} value={cost} />
            </label>
          </div>
          <div>
            <label htmlFor="type">
              Type:
              <select id="type" name="type" onChange={changeType}>
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
            </label>
          </div>
          <div>
            <label htmlFor="maxDurability">
              Max Durability:
              <input type="number" min="0" id="maxDurability" onChange={changeMaxDurability} value={maxDurability} />
            </label>
          </div>
          <div>
            <label htmlFor="durability">
              Durability:
              <input type="number" min="0" max={maxDurability} id="durability" onChange={changeDurability} value={durability} />
            </label>
          </div>
          <div>
            <label htmlFor="defense">
              Defense:
              <input type="number" min="0" id="defense" onChange={changeDefense} value={defense} />
            </label>
          </div>
          <div>
            <label htmlFor="damage">
              Damage:
              <input type="number" min="0" id="damage" onChange={changeDamage} value={damage} />
            </label>
          </div>
          <div>
            <label htmlFor="weight">
              Weight:
              <input type="number" min="0" id="weight" onChange={changeWeight} value={weight} />
            </label>
          </div>
          <div>
            <label htmlFor="enchantments">
              Enchantments:
              <select id="enchantments" name="enchantments" onClick={changeEnchantments}>
                {!enchantmentsList ? '' : enchantmentsList.map((key) => {
                  const enchant = getEnchantment(key.enchantment);
                  if (enchant.type === 'Unique' || enchant.type === 'Stance') return '';
                  return (
                    <option
                      key={key.enchantment._id}
                      value={key.enchantment._id}
                    >
                      {enchant.name}
                      :
                      {key.enchantment.amount}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          {enchantments.length < 1 ? '' : enchantments.map((enchantment, i) => (
            <div key={enchantment.id}>
              {enchantment.enchantmentName}
              <button key={i} type="button" onClick={removeEnchantment}>X</button>
            </div>
          )) }
          <div>
            <label htmlFor="description">
              Description:
              <textarea onChange={changeDescription} name="description" id="description" required />
            </label>
          </div>
          <div>
            <label htmlFor="background">
              Background:
              <textarea onChange={changeBackground} name="background" id="background" required />
            </label>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;
