/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentEnchantments, selectCurrentMaterials, selectCurrentEffects } from '../documentationSlice';
import ImageForm from '../../../component/imageForm';
import { useGetImage } from '../../image/getImage';
import { selectCurrentToken } from '../../auth/authSlice';
import { useDeleteImageMutation } from '../../image/imageApiSlice';
import { useGetEnchantmentMutation } from '../enchantments/enchantmentApiSlice';

function ItemUpdateForm(prop) {
  const {
    hide, update, newDoc, errors,
  } = prop;
  let { item } = prop;
  const enchantsList = useSelector(selectCurrentEnchantments);
  const effectsList = useSelector(selectCurrentEffects);
  let materialsList = useSelector(selectCurrentMaterials);
  materialsList = Array.isArray(materialsList) ? materialsList : materialsList.data;
  const [enchantmentsList, setEnchantmentsList] = useState('');
  const [enchantDetails] = useGetEnchantmentMutation();

  item = item.item ? item.item : item;

  const token = useSelector(selectCurrentToken);
  const [name, setName] = useState(item.name);
  const [rarity, setRarity] = useState(item.rarity);
  const [level, setLevel] = useState(item.level);
  const [material, setMaterial] = useState(item.material);
  const [subStats, setSubStats] = useState(item.subStats);
  const [cost, setCost] = useState(item.cost);
  const [type, setType] = useState(item.type);
  const [maxDurability, setMaxDurability] = useState(item.baseStats.maxDurability);
  const [durability, setDurability] = useState(item.baseStats.durability);
  const [defense, setDefense] = useState(item.baseStats.defense);
  const [damage, setDamage] = useState(item.baseStats.damage);
  const [weight, setWeight] = useState(item.baseStats.weight);
  const [enchantments, setEnchantments] = useState([]);
  const [background, setBackground] = useState(item.background);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [url, setUrl] = useState(item.url);

  const [deleteImage] = useDeleteImageMutation();

  const getEnchantment = (enchant) => {
    if (enchant.skill) {
      return enchant.skill;
    }
    if (enchant.spell) {
      return enchant.spell;
    }
    return enchant.antiTalent;
  };

  const getEnchants = () => {
    if (!Array.isArray(enchantmentsList)) return;
    const list = enchantmentsList
      .filter((enchant) => (!!item.enchantments.find((id) => id === enchant.enchantment._id)));
    setEnchantments(list.map((enchant) => ({
      id: enchant.enchantment._id,
      enchantmentName: getEnchantment(enchant.enchantment).name,
      amount: enchant.enchantment.amount,
    })));
  };
  const changeName = (e) => setName(e.target.value);
  const changeRarity = (e) => setRarity(e.target.value);
  const changeLevel = (e) => setLevel(e.target.value);
  const changeMaterial = (e) => setMaterial(e.target.value);
  const changeSubStats = (e) => setSubStats(e.target.value);
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
    const newEnchantments = enchantments.map((enchantment) => enchantment.id);

    newDoc.id = item._id;
    newDoc.name = name;
    newDoc.rarity = rarity;
    newDoc.level = level;
    newDoc.material = material;
    newDoc.subStats = subStats;
    newDoc.cost = cost;
    newDoc.type = type;
    newDoc.baseStats = {};
    newDoc.baseStats.maxDurability = maxDurability;
    newDoc.baseStats.durability = durability;
    newDoc.baseStats.defense = defense;
    newDoc.baseStats.damage = damage;
    newDoc.baseStats.weight = weight;
    newDoc.enchantments = newEnchantments;
    newDoc.description = description;
    newDoc.background = background;
    newDoc.url = url;
    newDoc.image = image;
    update();
  };

  const removeEnchantment = (e) => {
    const newEnchantments = enchantments.map((info) => info);
    newEnchantments.splice(e.target.value, 1);
    setEnchantments(newEnchantments);
  };

  const populateEnchants = async () => {
    try {
      const tempEnchantments = enchantsList[Object.keys(enchantsList)[0]]
        .map((enchant) => enchantDetails(enchant._id).unwrap());
      const resolvedEnchants = await Promise.all(tempEnchantments);
      setEnchantmentsList(resolvedEnchants);
    } catch (err) {
      console.log(err);
    }
  };

  const setUp = () => {
    document.getElementById('material').value = item.material;
    document.getElementById('rarity').value = item.rarity;
    document.getElementById('subStats').value = item.subStats;
    document.getElementById('type').value = item.type;
  };

  useEffect(() => {
    populateEnchants();
    setUp();
  }, []);

  useEffect(() => {
    getEnchants();
  }, [enchantmentsList]);

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
    if (image !== '' && image !== undefined) {
      getImage();
    }
  }, [image]);

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <ImageForm hideForm="None" setImageId={setImage} prevImageId={image} />
        {(url !== '' && url !== undefined)
          ? (
            <div>
              <img className="object-scale-down h-36 w-36" src={url} alt={name} />
              <button type="button" onClick={handleDeleteImage}>Delete</button>
            </div>
          ) : ''}
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="name">
                Name:
                <input type="text" id="name" onChange={changeName} value={name} required />
              </label>
            </div>
            <div>
              <label htmlFor="level">
                Level:
                <input type="number" id="level" min={1} max={15} onChange={changeLevel} value={level} required />
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
                <select id="subStats" name="subStats" onClick={changeSubStats}>
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
                :
                {enchantment.amount}
                <button value={i} type="button" onClick={removeEnchantment}>X</button>
              </div>
            )) }
            <div>
              <label htmlFor="cost">
                Cost:
                <input type="number" min="0" id="cost" onChange={changeCost} value={cost} />
              </label>
            </div>
          </div>
          <div>
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
              <label htmlFor="description">
                Description:
                <textarea value={description} onChange={changeDescription} name="description" id="description" required />
              </label>
            </div>
            <div>
              <label htmlFor="background">
                Background:
                <textarea value={background} onChange={changeBackground} name="background" id="background" required />
              </label>
            </div>
          </div>
          {errors !== undefined && errors.length > 0 ? errors.map((err) => (
            <div className="red bg-red-500 text-white text-bold" key={err.msg}>
              *
              {err.msg}
            </div>
          )) : ''}
          <button type="submit">update</button>
        </form>
      </div>
    </div>
  );
}

export default ItemUpdateForm;
