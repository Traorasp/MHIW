import { useState } from 'react';
import Skillsview from './SkillsView';

function Abilities(prop) {
  const { character, update } = prop;
  const [selection, setSelection] = useState('Skills');

  const changeSelection = (e) => setSelection(e.target.textContent);

  const selectedView = () => {
    switch (selection) {
      case 'Skills':
        return <Skillsview character={character} update={update} />;
      case 'Class':
        return '';
      case 'Titles':
        return '';
      case 'Race':
        return '';
      case 'Talents':
        return '';
      case 'Magics':
        return '';
      case 'Traits':
        return '';
      default:
        return '';
    }
  };

  return (
    <div>
      <nav>
        <button type="button" onClick={changeSelection}>Skills</button>
        <button type="button" onClick={changeSelection}>Class</button>
        <button type="button" onClick={changeSelection}>Titles</button>
        <button type="button" onClick={changeSelection}>Race</button>
        <button type="button" onClick={changeSelection}>Talents</button>
        <button type="button" onClick={changeSelection}>Magics</button>
        <button type="button" onClick={changeSelection}>Traits</button>
      </nav>
      {selectedView()}
    </div>
  );
}

export default Abilities;