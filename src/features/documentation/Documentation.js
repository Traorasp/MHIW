// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DocNav from './DocNav';
import DocListPanel from './DocListPanel';
import AoeForm from './aoes/AoeForm';
import EffectForm from './effects/EffectForm';
import SkillForm from './skills/SkillForm';
import SpellForm from './spells/SpellForm';
import TalentForm from './talents/TalentForm';
import TitleForm from './titles/TitleForm';
import MagicForm from './magics/MagicForm';
import MaterialForm from './materials/MaterialForm';
import EnchantmentForm from './enchantments/EnchantmentForm';
import RaceForm from './races/RaceForm';
import ItemForm from './items/ItemForm';
import ClassesForm from './classes/ClassesForm';

function Documentation() {
  const [selection, setSelection] = useState('AOEs');
  const [showForm, setShowForm] = useState(false);

  const select = (e) => {
    setSelection(e.target.textContent);
  };

  const displayForm = () => {
    setShowForm(!showForm);
  };

  const selectForm = () => {
    switch (selection) {
      case 'AOEs':
        return <AoeForm hide={displayForm} />;
      case 'Effects':
        return <EffectForm hide={displayForm} />;
      case 'Enchantments':
        return <EnchantmentForm hide={displayForm} />;
      case 'Items':
        return <ItemForm hide={displayForm} />;
      case 'Magics':
        return <MagicForm hide={displayForm} />;
      case 'Materials':
        return <MaterialForm hide={displayForm} />;
      case 'Races':
        return <RaceForm hide={displayForm} />;
      case 'Spells':
        return <SpellForm hide={displayForm} />;
      case 'Skills':
        return <SkillForm hide={displayForm} />;
      case 'Talents':
        return <TalentForm hide={displayForm} />;
      case 'Titles':
        return <TitleForm hide={displayForm} />;
      case 'Classes':
        return <ClassesForm hide={displayForm} />;
      default:
        return '';
    }
  };

  useEffect(() => {

  }, [selection]);

  return (
    <div>
      {showForm ? selectForm() : ''}
      <h1>{selection}</h1>
      <DocNav select={select} />
      <button type="button" onClick={displayForm} className="bg-green-400 p-5 border-black border-2 text-2xl active:bg-green-500">+</button>
      <DocListPanel listOf={selection} />
    </div>
  );
}

export default Documentation;
