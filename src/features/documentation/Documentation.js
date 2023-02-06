// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DocNav from './DocNav';
import DocListPanel from './DocListPanel';
import AoeForm from './aoes/AoeForm';

function Documentation() {
  const [selection, setSelection] = useState('AOE');
  const [showForm, setShowForm] = useState(false);

  const select = (e) => {
    setSelection(e.target.textContent);
    setShowForm(selection);
  };

  const displayForm = () => {
    setShowForm(!showForm);
  };

  const selectForm = () => {
    switch (selection) {
      case 'AOE':
        return <AoeForm hide={displayForm} />;
      case 'Effects':
        return <AoeForm />;
      case 'Enchants':
        return <AoeForm />;
      case 'Items':
        return <AoeForm />;
      case 'Magics':
        return <AoeForm />;
      case 'Races':
        return <AoeForm />;
      case 'Spells':
        return <AoeForm />;
      case 'Skills':
        return <AoeForm />;
      case 'Talents':
        return <AoeForm />;
      case 'Titles':
        return <AoeForm />;
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
